import { useState, useRef } from "react";

const SearchBar = ({ onSearch, onClear, hasSearch }) => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        onSearch(query);
    };

    const handleClear = () => {
        setQuery("");
        inputRef.current?.focus();
        if (hasSearch) {
            onClear();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            handleClear();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative max-w-2xl"
        >
            <div 
                className={`relative flex items-center transition-all duration-300 ${
                    isFocused ? "scale-[1.02]" : ""
                }`}
            >
                {/* Search Icon */}
                <div className="absolute left-4 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Titles, people, genres"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    className={`w-full pl-12 pr-10 py-3 bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 rounded-md transition-all duration-200 focus:outline-none focus:border-gray-500 focus:bg-[#242424] ${
                        isFocused ? "ring-1 ring-gray-600" : ""
                    }`}
                />

                {/* Clear Button */}
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 p-1 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
