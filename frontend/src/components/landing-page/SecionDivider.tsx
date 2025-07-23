const SectionDivider = () => {
    return (
        <div className="relative h-20">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-neutral-800" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-black px-4">
                    <div className="h-1 w-20 bg-gradient-to-r from-white via-white/40 to-white/ blur-2xl" />
                </span>
            </div>
        </div>
    );
};

export default SectionDivider;