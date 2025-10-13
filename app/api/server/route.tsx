// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { db } from '@/config/db';
// import { currentUser } from '@/lib/current-user'; // Our helper from Phase 1
// import { servers, channels, members } from '@/config/schema';

// const MEMBER_ROLES = {
//   OWNER: 'OWNER',
//   ADMIN: 'ADMIN',
//   GUEST: 'GUEST',
// } as const;

// export async function POST(req: Request) {
//   try {
//     const user = await currentUser();
//     if (!user) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     const { name, imageUrl } = await req.json();
//     if (!name || !imageUrl) {
//       return new NextResponse('Name or Image URL is missing', { status: 400 });
//     }

//     const newServer = await db.transaction(async (tx) => {
//       const [createdServer] = await tx
//         .insert(servers)
//         .values({
//           ownerId: user.id,
//           name: name,
//           imageUrl: imageUrl,
//           inviteCode: uuidv4().substring(0, 8),
//         })
//         .returning();

//       await tx.insert(channels).values({
//         serverId: createdServer.id,
//         name: 'general',
//       });

//       await tx.insert(members).values({
//         serverId: createdServer.id,
//         userId: user.id,
//         role: MEMBER_ROLES.OWNER,
//       });

//       return createdServer;
//     });

//     return NextResponse.json(newServer);

//   } catch (error) {
//     console.error('[SERVERS_POST]', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }