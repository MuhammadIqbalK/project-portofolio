export default function GridBackground() {
    return (
        <>
            <style>
                {`
                    /* Background grid animation */
                    @keyframes bg-scrolling-reverse {
                        100% {
                            background-position: 50px 50px;
                        }
                    }

                    .grid-bg {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: -1;
                        /* Grid pattern - light gray grid on white/gray background */
                        background-color: #f5f5f5;
                        background-image:
                            linear-gradient(#e0e0e0 1px, transparent 1px),
                            linear-gradient(90deg, #e0e0e0 1px, transparent 1px);
                        background-size: 50px 50px;
                        animation: bg-scrolling-reverse 0.92s infinite linear;
                    }

                    /* Add a subtle gradient overlay */
                    .grid-bg::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(135deg,
                            rgba(197, 61, 7, 0.03) 0%,
                            rgba(139, 134, 202, 0.03) 50%,
                            rgba(80, 71, 174, 0.03) 100%
                        );
                        pointer-events: none;
                    }
                `}
            </style>
            <div className="grid-bg" />
        </>
    );
}
