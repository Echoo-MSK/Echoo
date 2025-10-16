import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { servers, channels, members, users } from '@/config/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, imageUrl } = await req.json();
    if (!name || !imageUrl) {
      return new NextResponse('Missing name or imageUrl', { status: 400 });
    }

    
    let userInDb = await db.query.users.findFirst({
        where: eq(users.clerkId, user.id)
    });

    if (!userInDb) {
        [userInDb] = await db.insert(users).values({
            clerkId: user.id,
            username: user.username || `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
        }).returning();
    }


    const newServer = await db.transaction(async (tx) => {
      const [createdServer] = await tx
        .insert(servers)
        .values({
          ownerId: userInDb!.id, 
          name,
          imageUrl,
          inviteCode: crypto.randomUUID().substring(0, 8),
        })
        .returning();

      await tx.insert(channels).values({
        serverId: createdServer.id,
        name: 'general',
        type: 'TEXT',
      });

      await tx.insert(members).values({
        serverId: createdServer.id,
        userId: userInDb!.id, 
        role: 'ADMIN',
      });

      return createdServer;
    });

    return NextResponse.json(newServer);

  } catch (error) {
    console.error('[SERVERS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req:Request){

  try{
    const user = await currentUser();

    if(!user){
      return new NextResponse('Unauthorized', {status: 401})
    }

    const userInDb = await db.query.users.findFirst({
      where: eq(users.clerkId, user.id)
    })


    if(!userInDb){
      return new NextResponse('User not Found in Db', {status: 404})
    }

    const serverList = await db
    .select({server:servers})
    .from(members)
    .leftJoin(servers,eq(members.serverId,servers.id))
    .where(eq(members.userId, userInDb.id))

    return NextResponse.json(serverList.map(item => item.server))

  }catch(error){
    console.error(`[SERVERS_GET]`, error)
    return new NextResponse('Internal Server Error', { status: 500 });

  }

}