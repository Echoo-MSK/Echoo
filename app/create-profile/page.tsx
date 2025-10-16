import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { db } from "@/config/db"
import { users } from "@/config/schema"




const CreateProfilePage = async () => {
    const clerkUser = await currentUser()

    if(!clerkUser){
        redirect('/sign-in')
    }

    const userIndb = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkUser.id)
    })


    if(userIndb){
        redirect('/dashboard')
    }

    try {
        
        await db
        .insert(users)
        .values({
          clerkId: clerkUser.id,
          username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress || 'unknown',
          imageUrl: clerkUser.imageUrl || null,
        })
        .returning();
    } catch (error) {
        console.error("❌ Error creating user in database:", error);
    }
    redirect('/dashboard') 

    return null

}

export default CreateProfilePage