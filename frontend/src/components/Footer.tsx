const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto py-6 border-t border-neutral-800/50">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <p>&copy; {currentYear} Intereview.</p>
                <p className="text-sm mt-1">Tallinn, Estonia</p>
            </div>
        </footer>
    );
};

export default Footer;