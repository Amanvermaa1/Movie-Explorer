const MovieCardSkeleton = ({ index = 0 }) => {
    const delayClass = `delay-${(index % 8 + 1) * 100}`;
    
    return (
        <div className={`animate-fade-in-up ${delayClass}`} style={{ opacity: 0 }}>
            <div className="rounded-md overflow-hidden bg-[#1a1a1a]">
                {/* Image Skeleton */}
                <div className="aspect-[2/3] skeleton" />
                
                {/* Title Skeleton */}
                <div className="p-2">
                    <div className="h-4 skeleton rounded w-3/4" />
                </div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
