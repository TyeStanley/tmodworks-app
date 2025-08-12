import MainContent from '@/components/MainContent';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <MainContent />
    </div>
  );
}
