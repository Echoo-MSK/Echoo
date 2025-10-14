// "use client";
import Sidebar from "@/app/components/layout/sidebar";
import Navbar from "@/app/components/layout/navbar";
import { redirect } from 'next/navigation';
import { currentUser as getClerkUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { users } from '@/config/schema';
import { eq } from 'drizzle-orm';
// import { useState } from "react";
// type User = {
//   id: string;
//   clerkId: string;
//   username: string;
//   imageUrl: string | null;
//   createdAt: Date | null;
// };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false); 

  const clerkUser = await getClerkUser();

  // Step 1: Log the initial data received from Clerk to see if it's valid
  console.log("--- Dashboard Layout Execution ---");
  console.log("Clerk user object received:", clerkUser ? { id: clerkUser.id, username: clerkUser.username } : "null");

  if (!clerkUser) {
    redirect('/'); // Redirect if no user is logged in
  }

  // Find the user in your database
  let userInDb = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id),
  });

  // If the user is not found in your database, create them
  if (!userInDb) {
    try {
      console.log(`User with Clerk ID ${clerkUser.id} not found in DB. Attempting to create...`);

      // This logic generates a fallback username to avoid database errors
      const newUsername = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || `user_${clerkUser.id.slice(5, 12)}`;
      
      console.log(`Generated username for new user: "${newUsername}"`);

      // Perform the database insertion and get the created user back
      [userInDb] = await db
        .insert(users)
        .values({
          clerkId: clerkUser.id,
          username: newUsername,
          imageUrl: clerkUser.imageUrl,
        })
        .returning();

      console.log("✅ Successfully created and synced user in database:", userInDb);

    } catch (error) {
      // Step 2: If the database insert fails, this will catch the error
      console.error("❌ CRITICAL: FAILED TO CREATE USER IN DATABASE ❌");
      console.error("This is likely due to a UNIQUE constraint violation (e.g., duplicate username) or a database connection issue.");
      console.error("The error was:", error);
    }
  } else {
    console.log(`User found in DB:`, { id: userInDb.id, username: userInDb.username });
  }

  // Step 3: Final check. If user creation failed, userInDb will still be null.
  // We cannot proceed without user data, so redirect to an error page.
  if (!userInDb) {
    // You can create a simple /error page in your app directory
    redirect('/error?code=USER_SYNC_FAILED');
  }

  return (
    <div className="flex min-h-screen bg-[#0f111a] text-white">
      {/* Pass the fully synced user data to your components */}
      <Sidebar user={userInDb} />
      <div className="flex flex-col flex-1">
        <Navbar user={userInDb} />
        <main className="p-4 sm:p-6 lg:p-8"> {/* Added some padding for the content area */}
          {children}
        </main>
      </div>
    </div>
  );
}