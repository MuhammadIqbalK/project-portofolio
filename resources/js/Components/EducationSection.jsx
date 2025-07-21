import { useRef } from 'react';

export default function EducationSection({ isDarkMode }) {
    const educationRef = useRef(null);
    const educations = [
        {
            degree: 'D3 Sistem Informasi',
            school: 'Universitas Airlangga',
            period: '2020 - 2023',
            detail: 'GPA: 3.56/4.00',
        },
        {
            degree: 'Sains and mathematics',
            school: 'SMA Negeri 1 Driyorejo',
            period: '2017 - 2020',
            detail: 'score 90/100',
        },
    ];
    return (
        <section
            ref={educationRef}
            id="education"
            className="px-4 py-16 sm:px-6 sm:py-20"
        >
            <div className="mx-auto max-w-4xl">
                <h2
                    className={`animate__animated animate__fadeInUp mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Education
                </h2>
                <div className="space-y-8">
                    {educations.map((edu, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                        >
                            <h3
                                className={`mb-2 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            >
                                {edu.degree}
                            </h3>
                            {edu.school && (
                                <p
                                    className={`mb-1 text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                                >
                                    {edu.school}
                                </p>
                            )}
                            <p
                                className={`mb-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                {edu.period}
                            </p>
                            {edu.detail && (
                                <p
                                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                >
                                    {edu.detail}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
