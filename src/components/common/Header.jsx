//React Router
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white p-4 mb-4">
      <div className="container mx-auto flex justify-center items-center gap-4">
        <Link
          to="/"
          className="text-gray-800 hover:text-gray-950 transition-colors"
        >
          Kitap Yönetimi
        </Link>

        <Link
          to="/authors"
          className="text-gray-800 hover:text-gray-950 transition-colors"
        >
          Yazar Yönetimi
        </Link>

        <Link
          to="/categories"
          className="text-gray-800 hover:text-gray-950 transition-colors"
        >
          Kategori Yönetimi
        </Link>
      </div>
    </header>
  );
}
