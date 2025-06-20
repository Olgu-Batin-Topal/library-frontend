// React Router
import { Link } from "react-router-dom";

// Ant Design Icons
import {
  BookOutlined,
  BookFilled,
  FolderOutlined,
  FolderFilled,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const MenuLink = ({ href, text, icon, activeIcon }) => (
    <Link
      to={href}
      className={`my-2 block flex items-center justify-start py-2 px-4 ${
        window.location.pathname == href
          ? "text-violet-500 border-r-2 border-violet-500 bg-violet-50"
          : "text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors duration-200"
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <span className="text-2xl">
        {window.location.pathname == href ? activeIcon ?? icon : icon}
      </span>

      <span className="text-base font-semibold ml-4 md:hidden group-hover:block">
        {text}
      </span>
    </Link>
  );

  return (
    <div
      className={`px-2 py-4 bg-white border-r border-zinc-200 fixed min-h-screen md:w-20 hover:w-auto h-full z-20 overflow-y-auto flex flex-col justify-between gap-12 group ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-0"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="absolute top-2 right-2 md:hidden">
        <CloseOutlined
          className="text-lg text-zinc-800 "
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="mt-14">
        <MenuLink
          href="/"
          text="Kitap Yönetimi"
          icon={<BookOutlined />}
          activeIcon={<BookFilled />}
        />

        <MenuLink
          href="/authors"
          text="Yazar Yönetimi"
          icon={<UserOutlined />}
          activeIcon={<UserOutlined />}
        />

        <MenuLink
          href="/categories"
          text="Kategori Yönetimi"
          icon={<FolderOutlined />}
          activeIcon={<FolderFilled />}
        />
      </div>
    </div>
  );
}
