import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-100 dark:bg-gray-800">
            <Link to="/" className="text-xl font-bold text-blue-600">
                Movie Explorer
            </Link>

            <div className="space-x-4">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link to="/favorites" className="hover:underline">
                    Favorites
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
