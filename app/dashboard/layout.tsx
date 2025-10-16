// "use client";
import Sidebar from "@/app/components/layout/sidebar";
import Navbar from "@/app/components/layout/navbar";
import { redirect } from 'next/navigation';
import { currentUser as getClerkUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { users } from '@/config/schema';
import { eq } from 'drizzle-orm';



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false); 

  const clerkUser = await getClerkUser();

  // Step 1: Log the initial data received from Clerk to see if it's valid
  // console.log("--- Dashboard Layout Execution ---");
  // console.log("Clerk user object received:", clerkUser ? { id: clerkUser.id, username: clerkUser.username } : "null");

  if (!clerkUser) {
    redirect('/sign-in'); // Redirect if no user is logged in
  }

  // Find the user in your database
  const userInDb = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id),
  });

  // If the user is not found in your database, create them
  if (!userInDb) {
    redirect('/create-profile');
  }
  

  return (
    <div className="flex h-screen bg-[#0f111a] text-white">
      {/* Pass the fully synced user data to your components */}
      <Sidebar user={userInDb} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar user={userInDb} />
        <main className="flex-1 overflow-y-auto p-1 "> {/* Added some padding for the content area */}
          {children}
        </main>
      </div>
    </div>
  );
}