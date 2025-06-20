//Ant Design
import { MenuOutlined } from "@ant-design/icons";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="w-full md:pl-32 h-12 bg-white border-b border-zinc-200 fixed left-0 top-0 z-10 flex justify-between items-center">
      <div className="flex items-center gap-4 md:hidden px-4">
        <MenuOutlined
          className="text-2xl cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
    </div>
  );
}
