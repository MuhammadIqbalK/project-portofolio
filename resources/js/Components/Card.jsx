export default function Card({
    title,
    subtitle,
    content,
    children,
    className = '',
    height = 'auto',
    showArrow = false,
    arrowDirection = 'right',
}) {
    return (
        <div className={`p-4 ${className}`} style={{ height }}>
            <div className="w-full">
                <div className="relative ml-0 h-full">
                    <span className="absolute left-0 top-0 ml-2 mt-1 h-full w-full rounded-lg bg-black"></span>
                    <div className="relative h-full rounded-lg border-2 border-black bg-white p-4">
                        {title && (
                            <div className="-mt-1 flex items-center">
                                <h3 className="my-2 ml-2 text-lg font-bold text-gray-800">
                                    {title}
                                </h3>
                            </div>
                        )}
                        {subtitle && (
                            <p className="mb-1 mt-3 text-xs font-medium uppercase text-blue-600">
                                {subtitle}
                            </p>
                        )}
                        {content && (
                            <p className="mb-2 text-gray-600">{content}</p>
                        )}
                        {children}

                        {/* Moving Arrow */}
                        {showArrow && (
                            <div
                                className={`absolute ${
                                    arrowDirection === 'right'
                                        ? 'bottom-2 right-2'
                                        : arrowDirection === 'down'
                                          ? 'bottom-2 right-2'
                                          : 'bottom-2 left-2'
                                } animate-pulse`}
                            >
                                <svg
                                    className={`h-6 w-6 text-blue-600 ${
                                        arrowDirection === 'right'
                                            ? 'animate-bounce-x'
                                            : arrowDirection === 'down'
                                              ? 'animate-bounce-y'
                                              : 'animate-bounce-x-reverse'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={
                                            arrowDirection === 'right'
                                                ? 'M13 7l5 5m0 0l-5 5m5-5H6'
                                                : arrowDirection === 'down'
                                                  ? 'M7 13l5 5m0 0l5-5m-5 5V6'
                                                  : 'M11 17l-5-5m0 0l5-5m-5 5h12'
                                        }
                                    ></path>
                                </svg>
                            </div>
                        )}

                        {/* Connection Lines */}
                        {showArrow && arrowDirection === 'right' && (
                            <div className="absolute -right-1 top-1/2 h-0.5 w-2 -translate-y-1/2 transform animate-pulse bg-blue-500"></div>
                        )}
                        {showArrow && arrowDirection === 'down' && (
                            <div className="absolute bottom-0 left-1/2 h-2 w-0.5 -translate-x-1/2 transform animate-pulse bg-blue-500"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
