import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const prevPathnameRef = useRef(location.pathname);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        if (prevPathnameRef.current !== location.pathname) {
            prevPathnameRef.current = location.pathname;
            requestAnimationFrame(() => {
                setIsMenuOpen(false);
            });
        }
    }, [location.pathname]);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/favorites", label: "My List" },
    ];

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? "bg-[#141414] shadow-lg" 
                    : "bg-gradient-to-b from-black/80 to-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link 
                            to="/" 
                            className="text-2xl sm:text-3xl font-bold text-[#E50914] tracking-tighter hover:scale-105 transition-transform"
                        >
                            MOVIEFLIX
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`text-sm transition-all duration-200 hover:text-gray-300 ${
                                        location.pathname === link.to
                                            ? "text-white font-medium"
                                            : "text-gray-300"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <Link 
                            to="/" 
                            className="text-white hover:text-gray-300 transition-colors"
                            title="Search"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white hover:text-gray-300 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#141414] border-t border-gray-800 animate-slide-down">
                    <div className="px-4 py-3 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block py-2 text-base transition-colors ${
                                    location.pathname === link.to
                                        ? "text-white font-medium"
                                        : "text-gray-400"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
