import { useEffect, useRef } from 'react';

// Generate multiple box-shadows for stars
const generateBoxShadows = (n) => {
    let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
    for (let i = 1; i < n; i++) {
        value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
    }
    return value;
};

const shadowsSmall = generateBoxShadows(700);
const shadowsMedium = generateBoxShadows(200);
const shadowsBig = generateBoxShadows(100);

export default function StarryBackground() {
    const starsRef = useRef(null);
    const stars2Ref = useRef(null);
    const stars3Ref = useRef(null);

    useEffect(() => {
        if (starsRef.current) {
            starsRef.current.style.boxShadow = shadowsSmall;
        }
        if (stars2Ref.current) {
            stars2Ref.current.style.boxShadow = shadowsMedium;
        }
        if (stars3Ref.current) {
            stars3Ref.current.style.boxShadow = shadowsBig;
        }
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes animStar {
                        from {
                            transform: translateY(0px);
                        }
                        to {
                            transform: translateY(-2000px);
                        }
                    }

                    #stars,
                    #stars2,
                    #stars3 {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 1px;
                        height: 1px;
                        background: transparent;
                        overflow: hidden;
                        z-index: -1;
                    }

                    #stars {
                        animation: animStar 50s linear infinite;
                    }

                    #stars:after {
                        content: " ";
                        position: absolute;
                        top: 2000px;
                        width: 1px;
                        height: 1px;
                        background: transparent;
                    }

                    #stars2 {
                        animation: animStar 100s linear infinite;
                    }

                    #stars2:after {
                        content: " ";
                        position: absolute;
                        top: 2000px;
                        width: 2px;
                        height: 2px;
                        background: transparent;
                    }

                    #stars3 {
                        animation: animStar 150s linear infinite;
                    }

                    #stars3:after {
                        content: " ";
                        position: absolute;
                        top: 2000px;
                        width: 3px;
                        height: 3px;
                        background: transparent;
                    }
                `}
            </style>
            <div id="stars" ref={starsRef} />
            <div id="stars2" ref={stars2Ref} />
            <div id="stars3" ref={stars3Ref} />
        </>
    );
}
