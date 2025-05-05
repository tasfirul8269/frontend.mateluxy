import React, { useState, useEffect } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import WhatsAppButton from './WhatsAppButton';

function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
}


const Header = () => {
    const isMobile = useIsMobile();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const headerBaseClasses = `
    border-b border-gray-200 w-full transition-all duration-300 ease-in-out z-40
  `;

    const headerClasses = isScrolled
        ? `${headerBaseClasses}  z-999 fixed backdrop-blur-sm bg-white/80 shadow-md py-2`
        : `${headerBaseClasses} z-999 bg-white py-4`;



    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <HeaderLogo />

                {isMobile ? (<div className="flex items-center  gap-4 ml-auto">
                    <WhatsAppButton />

                    <HeaderNav
                        isScrolled={isScrolled}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </div>) : (<div className="flex items-center gap-4 ml-auto">

                    <HeaderNav
                        isScrolled={isScrolled}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                    <WhatsAppButton />

                </div>)}
            </div>
        </header>
    );
};

export default Header;