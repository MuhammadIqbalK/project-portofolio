import { useRef } from 'react';

export default function CertificationSection({ isDarkMode }) {
    const certRef = useRef(null);
    const certifications = [
        {
            name: 'AWS Certified Solutions Architect – Associate',
            issuer: 'Amazon Web Services (AWS)',
            year: '2023',
        },
        {
            name: 'Google IT Support Professional Certificate',
            issuer: 'Coursera',
            year: '2022',
        },
    ];
    return (
        <section
            ref={certRef}
            id="certification"
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div className="mx-auto max-w-4xl">
                <h2
                    className={`animate__animated animate__fadeInUp mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Certification
                </h2>
                <div className="space-y-8">
                    {certifications.map((cert, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                        >
                            <h3
                                className={`mb-2 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            >
                                {cert.name}
                            </h3>
                            <p
                                className={`mb-1 text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                            >
                                {cert.issuer}
                            </p>
                            <p
                                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                {cert.year}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
