import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ isDarkMode }) {
    const contactRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setIsLoading(true);
        try {
            await axios.post('/contact', form);
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
        } finally {
            setIsLoading(false);
            setShowModal(true);
        }
    };

    // GSAP Animations
    useRef(() => {
        // Contact section animation
        gsap.fromTo(
            contactRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );

        gsap.fromTo(
            contactRef.current.querySelectorAll('.grid > div'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            },
        );
    }, []);

    return (
        <section
            ref={contactRef}
            id="contact"
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div>
                <div className="mx-auto max-w-4xl">
                    <h2
                        className={`animate__animated animate__fadeInUp mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Contact
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="animate__animated animate__fadeInLeft">
                            <h3
                                className={`mb-6 text-2xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=iqbalkresna.12@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
                                >
                                    <svg
                                        className="h-6 w-6 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span
                                        className={
                                            isDarkMode
                                                ? 'text-gray-300'
                                                : 'text-gray-600'
                                        }
                                    >
                                        iqbalkresna.12@gmail.com
                                    </span>
                                </a>
                                <a
                                    href="https://wa.me/6289605641672"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
                                >
                                    <svg
                                        className="h-6 w-6 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span
                                        className={
                                            isDarkMode
                                                ? 'text-gray-300'
                                                : 'text-gray-600'
                                        }
                                    >
                                        +62 8960 5641 672
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="animate__animated animate__fadeInRight">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:scale-105 ${
                                        isDarkMode
                                            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:scale-105 ${
                                        isDarkMode
                                            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                <textarea
                                    rows="4"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-300 focus:scale-105 ${
                                        isDarkMode
                                            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className={`animate__animated animate__pulse animate__infinite relative w-full rounded-lg px-6 py-3 font-medium shadow-xl transition-all duration-300 hover:scale-105 ${
                                        isDarkMode
                                            ? 'bg-primary-dark text-text-dark hover:bg-accent-dark'
                                            : 'bg-primary-light text-text-dark hover:bg-accent-light'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="mr-2 h-6 w-6 animate-spin text-white"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                            {/* Modal for success/error */}
                            {showModal && (
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                                    onClick={() => setShowModal(false)}
                                >
                                    <div
                                        className={`relative w-full max-w-xs rounded-lg p-6 shadow-lg ${status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex flex-col items-center">
                                            {status === 'success' ? (
                                                <svg
                                                    className="mb-2 h-12 w-12 text-green-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="mb-2 h-12 w-12 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            )}
                                            <div
                                                className={`mb-2 text-lg font-semibold ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}
                                            >
                                                {status === 'success'
                                                    ? 'Message sent successfully!'
                                                    : 'Failed to send message.'}
                                            </div>
                                            <button
                                                className={`mt-2 rounded px-4 py-2 font-medium ${status === 'success' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
