import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection({ isDarkMode, tags = [] }) {
    const skillsRef = useRef(null);

    useEffect(() => {
        if (!skillsRef.current || tags.length === 0) return;

        // Skills section fade in animation
        gsap.fromTo(
            skillsRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [tags]);

    // Group tags into rows
    const rows = [0, 1, 2, 3]
        .map((rowIndex) => tags.filter((_, i) => i % 4 === rowIndex))
        .filter((row) => row.length > 0);

    return (
        <section
            ref={skillsRef}
            id="skills"
            className="px-4 py-30 sm:px-6 sm:py-20"
        >
            <style>{`
                @keyframes ticker-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes ticker-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .ticker-track {
                    display: flex;
                    width: max-content;
                    will-change: transform;
                }

                .ticker-left {
                    animation: ticker-left 30s linear infinite;
                }

                .ticker-right {
                    animation: ticker-right 30s linear infinite;
                }

                .ticker-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
            <div>
                <div className="mx-auto max-w-6xl">
                    <h2
                        className={`mb-5 text-center font-heading text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-text-dark' : 'text-text-light'
                            }`}
                    >
                        Skills
                    </h2>
                    <div className="space-y-6">
                        {rows.map((rowTags, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="overflow-hidden"
                            >
                                <div
                                    className={`ticker-track gap-8 ${rowIndex % 2 === 0
                                        ? 'ticker-left'
                                        : 'ticker-right'
                                        }`}
                                >
                                    {/* Duplicate tags enough times for seamless loop */}
                                    {[...rowTags, ...rowTags, ...rowTags, ...rowTags].map(
                                        (tag, index) => (
                                            <div
                                                key={`${tag.id}-${index}`}
                                                className={`flex h-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-medium sm:h-20 sm:px-8 sm:py-4 sm:text-base`}
                                                style={{
                                                    backgroundColor:
                                                        tag.colour ||
                                                        (isDarkMode
                                                            ? '#393579'
                                                            : '#e3e3e3'),
                                                    color: '#fff',
                                                    boxShadow: `0 2px 16px 0 ${tag.colour
                                                        ? tag.colour + '99'
                                                        : isDarkMode
                                                            ? '#39357999'
                                                            : '#8b86ca99'
                                                        }, 0 1.5px 8px 0 ${tag.colour
                                                            ? tag.colour + '55'
                                                            : isDarkMode
                                                                ? '#39357955'
                                                                : '#8b86ca55'
                                                        }`,
                                                }}
                                                title={tag.type}
                                            >
                                                {tag.icon && (
                                                    <span
                                                        className="mr-2 inline-flex items-center justify-center"
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: tag.icon,
                                                        }}
                                                    />
                                                )}
                                                <span className="font-medium">
                                                    {tag.name}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* second skill */}
                    <div className="space-y-6 mt-6">
                        {rows.map((rowTags, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="overflow-hidden"
                            >
                                <div
                                    className={`ticker-track gap-8 ${rowIndex % 2 === 0
                                        ? 'ticker-left'
                                        : 'ticker-right'
                                        }`}
                                >
                                    {/* Duplicate tags enough times for seamless loop */}
                                    {[...rowTags, ...rowTags, ...rowTags, ...rowTags].map(
                                        (tag, index) => (
                                            <div
                                                key={`${tag.id}-${index}`}
                                                className={`flex h-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-medium sm:h-20 sm:px-8 sm:py-4 sm:text-base`}
                                                style={{
                                                    backgroundColor:
                                                        tag.colour ||
                                                        (isDarkMode
                                                            ? '#393579'
                                                            : '#e3e3e3'),
                                                    color: '#fff',
                                                    boxShadow: `0 2px 16px 0 ${tag.colour
                                                        ? tag.colour + '99'
                                                        : isDarkMode
                                                            ? '#39357999'
                                                            : '#8b86ca99'
                                                        }, 0 1.5px 8px 0 ${tag.colour
                                                            ? tag.colour + '55'
                                                            : isDarkMode
                                                                ? '#39357955'
                                                                : '#8b86ca55'
                                                        }`,
                                                }}
                                                title={tag.type}
                                            >
                                                {tag.icon && (
                                                    <span
                                                        className="mr-2 inline-flex items-center justify-center"
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: tag.icon,
                                                        }}
                                                    />
                                                )}
                                                <span className="font-medium">
                                                    {tag.name}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
