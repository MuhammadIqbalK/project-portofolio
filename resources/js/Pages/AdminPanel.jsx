import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminPanel() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="bg-slate-100 text-center text-xl font-semibold leading-tight text-gray-800">
                    Secret Admin Panel
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="m-6 rounded-lg bg-blue-100 p-6 shadow-lg">
                {/* Container untuk dua tabel */}
                <div className="flex space-x-6">
                    {/* Tabel pertama */}
                    <div className="w-1/2">
                        <h3 className="mb-2 text-xl font-semibold">
                            Tags Table
                        </h3>
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        ID
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Type
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        CreatedAt
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        UpdatedAt
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="border-b px-4 py-2">1</td>
                                    <td className="border-b px-4 py-2">
                                        Project A
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        Type A
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        2024-01-01
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        2024-01-10
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Tabel kedua */}
                    <div className="w-1/2">
                        <h3 className="mb-2 text-xl font-semibold">
                            Projects Table
                        </h3>
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        ID
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Task Name
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Assigned To
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Due Date
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="border-b px-4 py-2">101</td>
                                    <td className="border-b px-4 py-2">
                                        Task A
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        John Doe
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        2024-02-01
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        In Progress
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="m-6 rounded-lg bg-blue-100 p-6 shadow-lg">
                {/* Container untuk dua tabel */}
                <div className="flex space-x-6">
                    {/* Tabel pertama */}
                    <div className="w-1/2">
                        <h3 className="mb-2 text-xl font-semibold">
                            Tags Table
                        </h3>
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        ID
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Type
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        CreatedAt
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        UpdatedAt
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="border-b px-4 py-2">1</td>
                                    <td className="border-b px-4 py-2">
                                        Project A
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        Type A
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        2024-01-01
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        2024-01-10
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Tabel kedua */}
                    <div className="w-1/2">
                        <h3 className="mb-2 text-xl font-semibold">
                            Projects Table
                        </h3>
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        ID
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Task Name
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Assigned To
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Due Date
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="border-b px-4 py-2">101</td>
                                    <td className="border-b px-4 py-2">
                                        Task A
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        John Doe
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        2024-02-01
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        In Progress
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
