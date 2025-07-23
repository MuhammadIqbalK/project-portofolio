import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function Navbar({ isDarkMode, toggleDarkMode }) {
    const navbarRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // GSAP Animation for navbar
    useEffect(() => {
        // Navbar animation on load
        gsap.fromTo(
            navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        );

        // Floating animation for navbar
        gsap.to(navbarRef.current, {
            y: -10,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
        });
    }, []);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <nav
            ref={navbarRef}
            className={`fixed top-4 z-50 ml-3 -translate-x-1/2 transform rounded-full shadow-lg md:ml-10 ${
                isDarkMode
                    ? 'bg-bg-dark shadow-text-dark/20'
                    : 'bg-bg-light shadow-text-light/20'
            } animate__animated animate__fadeInDown px-3 py-2 sm:top-6 sm:px-4`}
        >
            <div className="flex items-center justify-between space-x-4 sm:space-x-6 lg:space-x-8">
                {/* Left: Dark/Light Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className={`rounded-full p-1.5 transition-all duration-300 hover:scale-110 ${
                        isDarkMode
                            ? 'bg-secondary-dark hover:bg-accent-dark'
                            : 'bg-secondary-light hover:bg-accent-light'
                    }`}
                >
                    {isDarkMode ? (
                        <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-4 w-4 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>

                {/* Navigation Links - Desktop */}
                <div className="hidden items-center space-x-2 sm:flex lg:space-x-6">
                    {[
                        'About Me',
                        'Skills',
                        'Project',
                        'Experience',
                        'Contact',
                    ].map((link, index) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '')}`}
                            className={`font-medium transition-all duration-300 hover:scale-110 hover:text-primary-light ${
                                isDarkMode
                                    ? 'text-text-dark hover:text-primary-dark'
                                    : 'text-text-light hover:text-primary-light'
                            } px-2 py-1 text-xs sm:text-sm lg:text-base`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Hamburger Button - Mobile Only */}
                <button
                    className="rounded p-1.5 transition hover:bg-accent-light/20 sm:hidden dark:hover:bg-accent-dark/20"
                    onClick={toggleMenu}
                    aria-label="Open menu"
                >
                    <svg
                        className="h-5 w-5 sm:h-4 sm:w-4"
                        fill="none"
                        stroke={isDarkMode ? '#f1f0f9' : '#07060f'}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Fullscreen Menu - Mobile Only */}
            {isMenuOpen && (
                <div
                    className={`animate__animated animate__fadeInDown animate__faster fixed left-0 top-0 z-50 sm:hidden ${isDarkMode ? 'bg-bg-dark' : 'bg-bg-light'} flex items-center justify-between px-4 py-2 shadow-md`}
                >
                    {/* Navigation Links */}
                    <div className="flex flex-1 justify-center">
                        <div className="flex space-x-2">
                            {[
                                'About Me',
                                'Skills',
                                'Project',
                                'Experience',
                                'Contact',
                            ].map((link, index) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase().replace(' ', '')}`}
                                    className={`font-medium transition-all duration-300 hover:scale-110 hover:text-primary-light ${
                                        isDarkMode
                                            ? 'text-text-dark hover:text-primary-dark'
                                            : 'text-text-light hover:text-primary-light'
                                    } px-1 py-1 text-xs`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                    onClick={toggleMenu}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Close Button */}
                    <button
                        className="ml-2 p-1"
                        onClick={toggleMenu}
                        aria-label="Close menu"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke={isDarkMode ? '#f1f0f9' : '#07060f'}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </nav>
    );
}
