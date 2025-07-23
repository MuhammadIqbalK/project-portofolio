import { useEffect, useState } from 'react';

export default function ProjectShow({ project, details }) {
    // Inherit dark mode from localStorage or default
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme');
            if (stored) return stored === 'dark';
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        window.dispatchEvent(new Event('storage'));
    }, [isDarkMode]);

    useEffect(() => {
        const syncTheme = () => {
            const stored = localStorage.getItem('theme');
            setIsDarkMode(stored === 'dark');
        };
        window.addEventListener('storage', syncTheme);
        return () => window.removeEventListener('storage', syncTheme);
    }, []);

    // Custom scrollbar & progress bar style (inherit from Dashboard/Index)
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      /* Webkit Scrollbar Styles */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: ${isDarkMode ? '#1c1c1c' : '#e3e3e3'};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background: ${isDarkMode ? '#f8703a' : '#c53d07'};
        border-radius: 10px;
        transition: all 0.3s ease;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${isDarkMode ? '#e55a2b' : '#b03a06'};
        transform: scale(1.1);
      }
      * {
        scrollbar-width: thin;
        scrollbar-color: ${isDarkMode ? '#f8703a #1c1c1c' : '#c53d07 #e3e3e3'};
      }
      /* NProgress bar (if used) */
      #nprogress .bar {
        background: ${isDarkMode ? '#f8703a' : '#c53d07'} !important;
        height: 3px !important;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px ${isDarkMode ? '#f8703a' : '#c53d07'}, 0 0 5px ${isDarkMode ? '#f8703a' : '#c53d07'} !important;
      }
      #nprogress .spinner-icon {
        border-top-color: ${isDarkMode ? '#f8703a' : '#c53d07'} !important;
        border-left-color: ${isDarkMode ? '#f8703a' : '#c53d07'} !important;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, [isDarkMode]);

    const handleBack = () => {
        window.history.length > 1
            ? window.history.back()
            : (window.location.href = '/');
    };

    return (
        <div
            className={`min-h-screen font-sans ${
                isDarkMode
                    ? 'bg-bg-dark text-text-dark'
                    : 'bg-bg-light text-text-light'
            } transition-colors duration-300`}
            style={{
                fontFamily: 'Ubuntu Sans, sans-serif',
            }}
        >
            {/* Floating Button (hanya md ke atas) */}
            <div className="fixed bottom-8 left-8 z-50 hidden flex-col gap-4 md:flex">
                <button
                    onClick={handleBack}
                    className={`animate__animated animate__fadeInUp rounded-full border-2 p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none ${
                        isDarkMode
                            ? 'border-accent-dark bg-primary-dark text-text-dark'
                            : 'border-accent-light bg-primary-light text-text-dark'
                    }`}
                    title="Back"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => setIsDarkMode((v) => !v)}
                    className={`animate__animated animate__fadeInUp rounded-full border-2 p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none ${
                        isDarkMode
                            ? 'border-accent-dark bg-accent-dark text-white'
                            : 'border-accent-light bg-accent-light text-white'
                    }`}
                    title="Toggle Theme"
                >
                    {isDarkMode ? (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="5" strokeWidth="2" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.05 6.05L4.64 4.64m12.73 0l-1.41 1.41M6.05 17.95l-1.41 1.41"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-6 md:my-0 md:px-8">
                <div className="mb-2 flex items-center justify-between gap-2">
                    <h1
                        className="font-heading text-3xl font-bold"
                        style={{ fontFamily: 'Rethink Sans, sans-serif' }}
                    >
                        {project.title}
                    </h1>
                    {/* Theme toggle button hanya di mobile (sm dan ke bawah) */}
                    <button
                        onClick={() => setIsDarkMode((v) => !v)}
                        className={`ml-2 rounded-full p-3 text-xl font-bold shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none md:hidden ${
                            isDarkMode
                                ? 'bg-accent-dark text-white'
                                : 'bg-accent-light text-white'
                        }animate__animated animate__fadeInUp`}
                        title="Toggle Theme"
                    >
                        {isDarkMode ? '🌙' : '☀️'}
                    </button>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                    {(project.tags || []).map((tag) => (
                        <span
                            key={tag.id}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                                backgroundColor: tag.colour || '#8b86ca',
                                color: '#fff',
                            }}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
                {project.images && project.images.length > 0 && (
                    <img
                        src={
                            project.images[0].url.startsWith('http')
                                ? project.images[0].url
                                : `/storage/${project.images[0].url}`
                        }
                        alt={project.title}
                        className="mb-8 w-full rounded-xl object-cover shadow-2xl"
                        style={{ maxHeight: 480 }}
                        loading="lazy"
                    />
                )}
                <div className="space-y-6">
                    {details.map((block) => {
                        if (block.type === 'heading') {
                            return (
                                <h2
                                    key={block.id}
                                    className="mt-8 font-heading text-2xl font-bold"
                                    style={{
                                        fontFamily: 'Rethink Sans, sans-serif',
                                    }}
                                >
                                    {block.content}
                                </h2>
                            );
                        }
                        if (block.type === 'paragraph') {
                            return (
                                <p
                                    key={block.id}
                                    className="text-justify text-base leading-relaxed"
                                >
                                    {block.content}
                                </p>
                            );
                        }
                        if (block.type === 'image') {
                            return (
                                <img
                                    key={block.id}
                                    src={
                                        block.content.startsWith('http')
                                            ? block.content
                                            : `/storage/${block.content}`
                                    }
                                    alt="Project Detail"
                                    className="mb-8 w-full rounded-xl object-cover shadow-2xl"
                                    loading="lazy"
                                />
                            );
                        }
                        if (block.type === 'embed') {
                            return (
                                <div
                                    key={block.id}
                                    className="w-full overflow-x-auto"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: block.content,
                                        }}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}
