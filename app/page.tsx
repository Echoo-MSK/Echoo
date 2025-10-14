import { redirect } from 'next/navigation';

export default function RootPage() {
  // This will automatically redirect any user who lands here to the dashboard.
  redirect('/dashboard');
}