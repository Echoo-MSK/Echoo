// import Navbar from "@/app/components/layout/navbar";
// import { currentUser as getClerkUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
import Friends from '@/app/(friends)/page';

// import { db } from '@/config/db';
// import { users } from '@/config/schema';
// import { eq } from 'drizzle-orm';
import Contests from "../components/contest";


export default async function DashboardPage() {
  // 1. Get the currently logged-in user from Clerk.
  // const clerkUser = await getClerkUser();

  // if (!clerkUser) {
  //   redirect('/');
  // }

  // const userInDb = await db.query.users.findFirst({
  //   where: eq(users.clerkId, clerkUser.id),
  // });

  // if (!userInDb) {
  //   redirect('/');
  // }

  return (
    <div>
      {/* <Navbar user={userInDb} /> */}
      {/* You can add the rest of your dashboard page content below */}
      <div className="p-8 flex gap-5">
        <Friends />
        <Contests />

        
      </div>
      
    </div>
  );
}