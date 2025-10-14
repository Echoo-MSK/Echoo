import Friends from './friends/page';
import Contests from "./contests/page";
import AiChatWindow from '../components/layout/AiDrawer';

export default function DashboardPage() {
  return (
    // 1. Removed justify-center and items-center
    // 2. Added a specific gap-6 for controlled spacing
    <div className="flex  p-4 gap-6">
      <div className="">
        <Friends />
      </div>
      <div className="">
        <Contests />
      </div>
      {/* <AiChatWindow /> */}
    </div>
  );
}