'use client';

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const PageTransitionWrapper = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransitionWrapper;