import { useEffect, useRef, useState } from 'react';

export default function SmoothCursor({ isDarkMode }) {
    const mousePosition = useRef({ x: 0, y: 0 });

    const dotPosition = useRef({ x: 0, y: 0 });
    const borderDotPosition = useRef({ x: 0, y: 0 });

    const [renderPos, setRenderPos] = useState({
        dot: { x: 0, y: 0 },
        border: { x: 0, y: 0 },
    });
    const [isHovering, setIsHovering] = useState(false);

    const DOT_SMOOTHNESS = 0.2;
    const BORDER_DOT_SMOOTHNESS = 0.1;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);

        // Animation function for smooth movement
        const animate = () => {
            const lerp = (start, end, factor) => {
                return start + (end - start) * factor;
            };

            dotPosition.current.x = lerp(
                dotPosition.current.x,
                mousePosition.current.x,
                DOT_SMOOTHNESS
            );
            dotPosition.current.y = lerp(
                dotPosition.current.y,
                mousePosition.current.y,
                DOT_SMOOTHNESS
            );

            borderDotPosition.current.x = lerp(
                borderDotPosition.current.x,
                mousePosition.current.x,
                BORDER_DOT_SMOOTHNESS
            );
            borderDotPosition.current.y = lerp(
                borderDotPosition.current.y,
                mousePosition.current.y,
                BORDER_DOT_SMOOTHNESS
            );

            setRenderPos({
                dot: { x: dotPosition.current.x, y: dotPosition.current.y },
                border: {
                    x: borderDotPosition.current.x,
                    y: borderDotPosition.current.y,
                },
            });

            requestAnimationFrame(animate);
        };

        // Start animation loop
        const animationId = requestAnimationFrame(animate);

        // Clean up
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    useEffect(() => {
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const interactiveElements = document.querySelectorAll(
            'a, button, img, input, textarea, select'
        );
        interactiveElements.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            interactiveElements.forEach((element) => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Hide default cursor
    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    if (typeof window === 'undefined') return null;

    const dotColor = isDarkMode ? 'bg-white' : 'bg-black';
    const borderColor = isDarkMode ? 'border-white' : 'border-black';

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            <div
                className={`absolute rounded-full ${dotColor}`}
                style={{
                    width: '8px',
                    height: '8px',
                    transform: 'translate(-50%, -50%)',
                    left: `${renderPos.dot.x}px`,
                    top: `${renderPos.dot.y}px`,
                }}
            />

            <div
                className={`absolute rounded-full border ${borderColor}`}
                style={{
                    width: isHovering ? '44px' : '28px',
                    height: isHovering ? '44px' : '28px',
                    transform: 'translate(-50%, -50%)',
                    left: `${renderPos.border.x}px`,
                    top: `${renderPos.border.y}px`,
                    transition: 'width 0.3s, height 0.3s',
                }}
            />
        </div>
    );
}
