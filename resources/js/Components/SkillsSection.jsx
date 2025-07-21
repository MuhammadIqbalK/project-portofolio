import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Optimized HorizontalLoop helper function with anti-jitter
function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};

    // Force hardware acceleration and smooth rendering
    gsap.set(items, {
        force3D: true,
        backfaceVisibility: 'hidden',
        perspective: 1000,
        transformStyle: 'preserve-3d',
    });

    let tl = gsap.timeline({
            repeat: -1,
            paused: config.paused,
            defaults: {
                ease: 'none',
                force3D: true,
            },
            onReverseComplete: () =>
                tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 60, // Reduced for smoother motion
        snap =
            config.snap === false
                ? (v) => v
                : gsap.utils.snap(config.snap || 0.1), // Smaller snap for smoothness
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;

    gsap.set(items, {
        xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
                gsap.getProperty(el, 'width', 'px'),
            ));
            xPercents[i] = snap(
                (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
                    gsap.getProperty(el, 'xPercent'),
            );
            return xPercents[i];
        },
    });

    gsap.set(items, { x: 0 });

    totalWidth =
        items[length - 1].offsetLeft +
        widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
            gsap.getProperty(items[length - 1], 'scaleX') +
        (parseFloat(config.paddingRight) || 0);

    for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');

        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond,
                force3D: true,
            },
            0,
        ).fromTo(
            item,
            {
                xPercent: snap(
                    ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
                ),
            },
            {
                xPercent: xPercents[i],
                duration:
                    (curX - distanceToLoop + totalWidth - curX) /
                    pixelsPerSecond,
                immediateRender: false,
                force3D: true,
            },
            distanceToLoop / pixelsPerSecond,
        );

        times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }

    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }

    return tl;
}

export default function SkillsSection({ isDarkMode, tags = [] }) {
    const skillsRef = useRef(null);
    const marqueeRefs = useRef([]);

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

        // Create horizontal loops for each row with delay to prevent simultaneous initialization
        const loops = [];
        marqueeRefs.current.forEach((row, index) => {
            if (row && row.children.length > 0) {
                // Small delay to prevent initialization conflicts
                setTimeout(() => {
                    const loop = horizontalLoop(row.children, {
                        speed: 0.3 + index * 0.05, // Slower, more consistent speeds
                        reversed: index % 2 === 1, // Alternate directions
                        paddingRight: 30,
                        snap: false, // Disable snapping for ultra-smooth motion
                    });
                    loops.push(loop);
                }, index * 50); // Stagger initialization
            }
        });

        // Cleanup
        return () => {
            loops.forEach((loop) => loop.kill());
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
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div>
                <div className="mx-auto max-w-4xl">
                    <h2
                        className={`mb-8 text-center font-heading text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${
                            isDarkMode ? 'text-text-dark' : 'text-text-light'
                        }`}
                    >
                        Skills
                    </h2>
                    <div className="space-y-6">
                        {rows.map((rowTags, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="relative overflow-hidden"
                            >
                                <div
                                    ref={(el) =>
                                        (marqueeRefs.current[rowIndex] = el)
                                    }
                                    className="flex items-center gap-8"
                                    style={{
                                        width: 'fit-content',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden',
                                        perspective: '1000px',
                                        transform: 'translate3d(0,0,0)', // Force GPU layer
                                    }}
                                >
                                    {/* Duplicate tags for seamless loop */}
                                    {[...rowTags, ...rowTags, ...rowTags].map(
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
                                                    boxShadow: `0 4px 32px 0 ${
                                                        tag.colour
                                                            ? tag.colour + '99'
                                                            : isDarkMode
                                                              ? '#39357999'
                                                              : '#8b86ca99'
                                                    }, 0 1.5px 8px 0 ${
                                                        tag.colour
                                                            ? tag.colour + '55'
                                                            : isDarkMode
                                                              ? '#39357955'
                                                              : '#8b86ca55'
                                                    }`,
                                                    minWidth: 'max-content',
                                                    whiteSpace: 'nowrap',
                                                    willChange: 'transform',
                                                    backfaceVisibility:
                                                        'hidden',
                                                    transform:
                                                        'translate3d(0,0,0)', // Force GPU
                                                    transition: 'none', // Disable CSS transitions that can cause jitter
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
