import Sidebar  from "@/app/components/layout/sidebar"; // Cleaner import path
import Navbar from "@/app/components/layout/navbar";   // Cleaner import path
import { redirect } from 'next/navigation';
import { currentUser as getClerkUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { users } from '@/config/schema';
import { eq } from 'drizzle-orm'; // <-- Import 'eq' for the query

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = await getClerkUser();

  if (!clerkUser) {
    redirect('/'); // Redirect to landing page is better than a non-existent /login
  }

  // --- CORE LOGIC WITH CORRECTED QUERY ---

  // Option 1: The recommended "Relational Query" syntax (cleaner)
  let userInDb = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id),
  });




  if (!userInDb) {
    console.log(`User not found in DB. Creating profile for Clerk ID: ${clerkUser.id}`);
    [userInDb] = await db
      .insert(users)
      .values({
        clerkId: clerkUser.id,
        username: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || `user_${clerkUser.id.slice(0,5)}`,
        imageUrl: clerkUser.imageUrl,
      })
      .returning();
  }
  // --- END OF CORE LOGIC ---

  return (
    // I've merged your two wrapping divs into one for simplicity
    <div className="flex min-h-screen bg-[#0f111a] text-white">
      {/* Pass the user data to your components so they can display the user's name/image */}
      <Sidebar user ={userInDb} />
      <div className="flex flex-col flex-1">
        <Navbar user ={userInDb} />
        <div>
          {/* <Friends /> */}

          <main>
          {children}
          </main>
        </div>
      </div>
    </div>
  );
}