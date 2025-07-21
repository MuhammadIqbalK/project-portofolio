import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function AdminIndex({ projects, tags }) {
    // State untuk form Project
    const [projectForm, setProjectForm] = useState({
        title: '',
        slug: '',
        status: 'ongoing',
        short_description: '',
        tags: [],
        images: [],
        imageTypes: [],
    });
    const [editProjectId, setEditProjectId] = useState(null);
    const [projectImages, setProjectImages] = useState([]); // for edit
    const [projectTags, setProjectTags] = useState([]); // for edit
    const fileInputRef = useRef();
    // State untuk form Tag
    const [tagForm, setTagForm] = useState({ name: '', type: '', colour: '' });
    const [editTagId, setEditTagId] = useState(null);
    const [tagMessage, setTagMessage] = useState(null);
    const [tagsData, setTagsData] = useState(tags);

    // Pagination for tags
    const TAGS_PER_PAGE = 10;
    const [tagPage, setTagPage] = useState(1);
    const totalTagPages = Math.ceil(tagsData.length / TAGS_PER_PAGE);
    const paginatedTags = tagsData.slice(
        (tagPage - 1) * TAGS_PER_PAGE,
        tagPage * TAGS_PER_PAGE,
    );

    useEffect(() => {
        if (tagMessage) {
            const timer = setTimeout(() => setTagMessage(null), 2500); // 2.5 detik
            return () => clearTimeout(timer);
        }
    }, [tagMessage]);

    // Handler Project
    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProjectForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleProjectTagsChange = (e) => {
        const options = Array.from(e.target.selectedOptions).map((o) =>
            String(o.value),
        );
        setProjectForm((prev) => ({ ...prev, tags: options }));
    };
    const handleProjectImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProjectForm((prev) => ({
            ...prev,
            images: files,
            imageTypes: files.map(() => 'card'),
        }));
    };
    const handleImageTypeChange = (idx, type) => {
        setProjectForm((prev) => {
            const newTypes = [...prev.imageTypes];
            newTypes[idx] = type;
            return { ...prev, imageTypes: newTypes };
        });
    };
    const handleProjectSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', projectForm.title);
        formData.append('slug', projectForm.slug);
        formData.append('status', projectForm.status);
        formData.append('short_description', projectForm.short_description);
        projectForm.tags.forEach((tagId) => formData.append('tags[]', tagId));
        projectForm.images.forEach((file, idx) => {
            formData.append('images[]', file);
            formData.append(
                'image_types[]',
                projectForm.imageTypes[idx] || 'card',
            );
        });
        const url = editProjectId
            ? `/admin/projects/${editProjectId}?_method=PUT`
            : '/admin/projects';
        window.axios
            .post(url, formData)
            .then(() => window.location.reload())
            .catch((err) => {
                alert(
                    err.response?.data?.message ||
                        JSON.stringify(err.response?.data) ||
                        'Error',
                );
            });
    };
    const handleProjectEdit = (p) => {
        setEditProjectId(p.id);
        setProjectForm({
            title: p.title,
            slug: p.slug,
            status: p.status,
            short_description: p.short_description,
            tags: (p.tags || []).map((t) => String(t.id)),
            images: [],
            imageTypes: [],
        });
        setProjectImages(p.images || []);
        setProjectTags(p.tags || []);
    };
    const handleProjectDelete = (id) => {
        if (confirm('Delete project?'))
            window.axios
                .delete(`/admin/projects/${id}`)
                .then(() => window.location.reload());
    };
    const handleDeleteProjectImage = (imageId) => {
        if (confirm('Delete image?')) {
            window.axios.delete(`/admin/project-images/${imageId}`).then(() => {
                setProjectImages((prev) =>
                    prev.filter((img) => img.id !== imageId),
                );
            });
        }
    };
    const handleDetachProjectTag = (projectId, tagId) => {
        if (confirm('Remove tag from project?')) {
            window.axios
                .delete(`/admin/projects/${projectId}/tags/${tagId}`)
                .then(() => {
                    setProjectTags((prev) =>
                        prev.filter((tag) => String(tag.id) !== String(tagId)),
                    );
                    setProjectForm((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((id) => id !== String(tagId)),
                    }));
                });
        }
    };

    // Handler Tag
    const handleTagChange = (e) =>
        setTagForm({ ...tagForm, [e.target.name]: e.target.value });
    const handleTagSubmit = (e) => {
        e.preventDefault();
        if (editTagId) {
            window.axios
                .put(`/admin/tags/${editTagId}`, tagForm)
                .then((res) => {
                    setTagMessage({
                        type: res.data.success ? 'success' : 'error',
                        text: res.data.message,
                    });
                    if (res.data.success) {
                        setTagsData(
                            tagsData.map((tag) =>
                                tag.id === editTagId ? res.data.data : tag,
                            ),
                        );
                        setTagForm({ name: '', type: '', colour: '' });
                        setEditTagId(null);
                    }
                })
                .catch((err) => {
                    setTagMessage({
                        type: 'error',
                        text: err.response?.data?.message || 'Gagal update tag',
                    });
                });
        } else {
            window.axios
                .post('/admin/tags', tagForm)
                .then((res) => {
                    setTagMessage({
                        type: res.data.success ? 'success' : 'error',
                        text: res.data.message,
                    });
                    if (res.data.success) {
                        setTagsData([...tagsData, res.data.data]);
                        setTagForm({ name: '', type: '', colour: '' });
                        setEditTagId(null);
                    }
                })
                .catch((err) => {
                    setTagMessage({
                        type: 'error',
                        text: err.response?.data?.message || 'Gagal tambah tag',
                    });
                });
        }
    };
    const handleTagEdit = (t) => {
        setEditTagId(t.id);
        setTagForm({ name: t.name, type: t.type, colour: t.colour || '' });
    };
    const handleTagDelete = (id) => {
        if (confirm('Delete tag?'))
            window.axios
                .delete(`/admin/tags/${id}`)
                .then((res) => {
                    setTagMessage({
                        type: res.data.success ? 'success' : 'error',
                        text: res.data.message,
                    });
                    if (res.data.success) {
                        setTagsData(tagsData.filter((tag) => tag.id !== id));
                    }
                })
                .catch((err) => {
                    setTagMessage({
                        type: 'error',
                        text: err.response?.data?.message || 'Gagal hapus tag',
                    });
                });
    };

    return (
        <div>
            <Head title="Dashboard" />
            <h2 className="bg-slate-100 text-center text-xl font-semibold leading-tight text-gray-800">
                Secret Admin Panel
            </h2>
            <div className="m-6 rounded-lg bg-blue-100 p-6 shadow-lg">
                <div className="flex space-x-6">
                    {/* Tag CRUD */}
                    <div className="w-1/2">
                        <h3 className="mb-2 text-xl font-semibold">Tags</h3>
                        {tagMessage && (
                            <div
                                className={`mb-2 rounded px-3 py-2 text-sm ${tagMessage.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                            >
                                {tagMessage.text}
                            </div>
                        )}
                        <form
                            onSubmit={handleTagSubmit}
                            className="mb-4 flex gap-2"
                        >
                            <input
                                name="name"
                                value={tagForm.name}
                                onChange={handleTagChange}
                                placeholder="Tag name"
                                className="rounded border px-2 py-1"
                            />
                            <select
                                name="type"
                                value={tagForm.type}
                                onChange={handleTagChange}
                                className="rounded border px-2 py-1"
                                required
                            >
                                <option value="">Pilih Type</option>
                                <option value="framework">Framework</option>
                                <option value="language">Language</option>
                                <option value="tool">Tool</option>
                            </select>
                            <input
                                name="colour"
                                type="color"
                                value={tagForm.colour}
                                onChange={handleTagChange}
                                className="rounded border px-2 py-1"
                            />
                            <button
                                type="submit"
                                className="rounded bg-blue-500 px-3 py-1 text-white"
                            >
                                {editTagId ? 'Update' : 'Add'}
                            </button>
                            {editTagId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditTagId(null);
                                        setTagForm({
                                            name: '',
                                            type: '',
                                            colour: '',
                                        });
                                    }}
                                    className="rounded bg-gray-400 px-3 py-1 text-white"
                                >
                                    Cancel
                                </button>
                            )}
                        </form>
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
                                        Colour
                                    </th>
                                    <th className="border-b px-4 py-2 text-left font-semibold text-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedTags.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="border-b px-4 py-2">
                                            {t.id}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {t.name}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {t.type}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {t.colour && (
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-4 w-4 rounded border"
                                                        style={{
                                                            backgroundColor:
                                                                t.colour,
                                                        }}
                                                    ></div>
                                                    <span>{t.colour}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            <button
                                                onClick={() => handleTagEdit(t)}
                                                className="mr-2 text-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleTagDelete(t.id)
                                                }
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="mt-2 flex items-center justify-center gap-2">
                            <button
                                className="rounded bg-gray-200 px-2 py-1 disabled:opacity-50"
                                onClick={() =>
                                    setTagPage((p) => Math.max(1, p - 1))
                                }
                                disabled={tagPage === 1}
                            >
                                Prev
                            </button>
                            <span className="text-sm">
                                Page {tagPage} of {totalTagPages}
                            </span>
                            <button
                                className="rounded bg-gray-200 px-2 py-1 disabled:opacity-50"
                                onClick={() =>
                                    setTagPage((p) =>
                                        Math.min(totalTagPages, p + 1),
                                    )
                                }
                                disabled={tagPage === totalTagPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    {/* Project CRUD */}
                    <div className="w-full">
                        <h3 className="mb-2 text-xl font-semibold">Projects</h3>

                        {/* Project Form */}
                        <div className="mb-6 rounded border bg-white p-4">
                            <h4 className="mb-3 text-lg font-semibold">
                                {editProjectId
                                    ? 'Edit Project'
                                    : 'Add New Project'}
                            </h4>

                            <form
                                onSubmit={handleProjectSubmit}
                                className="space-y-4"
                            >
                                {/* Basic Info Section */}
                                <div className="space-y-2">
                                    <h5 className="font-medium text-gray-700">
                                        Basic Information
                                    </h5>
                                    <input
                                        name="title"
                                        value={projectForm.title}
                                        onChange={handleProjectChange}
                                        placeholder="Project title"
                                        className="w-full rounded border px-3 py-2"
                                        required
                                    />
                                    <input
                                        name="slug"
                                        value={projectForm.slug}
                                        onChange={handleProjectChange}
                                        placeholder="Slug"
                                        className="w-full rounded border px-3 py-2"
                                        required
                                    />
                                    <select
                                        name="status"
                                        value={projectForm.status}
                                        onChange={handleProjectChange}
                                        className="w-full rounded border px-3 py-2"
                                    >
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                    <textarea
                                        name="short_description"
                                        value={projectForm.short_description}
                                        onChange={handleProjectChange}
                                        placeholder="Short description"
                                        className="w-full rounded border px-3 py-2"
                                        rows="3"
                                    />
                                </div>

                                {/* Tags Management Section */}
                                <div className="space-y-2">
                                    <h5 className="font-medium text-gray-700">
                                        Tags Management
                                    </h5>

                                    {/* Existing Tags (Edit Mode) */}
                                    {editProjectId &&
                                        (projectTags || []).length > 0 && (
                                            <div className="mb-3">
                                                <label className="mb-2 block text-sm font-medium text-gray-600">
                                                    Current Tags:
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {(projectTags || []).map(
                                                        (tag) => (
                                                            <span
                                                                key={tag.id}
                                                                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm"
                                                            >
                                                                <span className="mr-2">
                                                                    {tag.name}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDetachProjectTag(
                                                                            editProjectId,
                                                                            tag.id,
                                                                        )
                                                                    }
                                                                    className="font-bold text-red-500 hover:text-red-700"
                                                                    title="Remove tag"
                                                                >
                                                                    ×
                                                                </button>
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* Add New Tags */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-600">
                                            {editProjectId
                                                ? 'Add More Tags:'
                                                : 'Select Tags:'}
                                        </label>
                                        <select
                                            multiple
                                            name="tags"
                                            value={projectForm.tags}
                                            onChange={handleProjectTagsChange}
                                            className="min-h-[100px] w-full rounded border px-3 py-2"
                                        >
                                            {tagsData.map((tag) => (
                                                <option
                                                    key={tag.id}
                                                    value={String(tag.id)}
                                                >
                                                    {tag.name} ({tag.type})
                                                </option>
                                            ))}
                                        </select>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Hold Ctrl/Cmd to select multiple
                                            tags
                                        </p>
                                    </div>
                                </div>

                                {/* Images Management Section */}
                                <div className="space-y-2">
                                    <h5 className="font-medium text-gray-700">
                                        Images Management
                                    </h5>

                                    {/* Existing Images (Edit Mode) */}
                                    {editProjectId &&
                                        (projectImages || []).length > 0 && (
                                            <div className="mb-3">
                                                <label className="mb-2 block text-sm font-medium text-gray-600">
                                                    Current Images:
                                                </label>
                                                <div className="grid grid-cols-4 gap-3">
                                                    {(projectImages || []).map(
                                                        (img) => (
                                                            <div
                                                                key={img.id}
                                                                className="group relative"
                                                            >
                                                                <img
                                                                    src={
                                                                        img.url.startsWith(
                                                                            'http',
                                                                        )
                                                                            ? img.url
                                                                            : `/storage/${img.url}`
                                                                    }
                                                                    alt="Project image"
                                                                    className="h-20 w-full rounded border object-cover"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDeleteProjectImage(
                                                                                img.id,
                                                                            )
                                                                        }
                                                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white"
                                                                        title="Delete image"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                                <div className="mt-1 rounded bg-gray-100 px-1 text-center text-xs">
                                                                    {img.type}
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* Upload New Images */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-600">
                                            {editProjectId
                                                ? 'Add More Images:'
                                                : 'Upload Images:'}
                                        </label>
                                        <input
                                            type="file"
                                            multiple
                                            ref={fileInputRef}
                                            onChange={handleProjectImageChange}
                                            className="w-full rounded border px-3 py-2"
                                            accept="image/*"
                                        />

                                        {/* New Images Preview */}
                                        {projectForm.images.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                <label className="block text-sm font-medium text-gray-600">
                                                    New Images (select type):
                                                </label>
                                                {projectForm.images.map(
                                                    (file, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-3 rounded bg-gray-50 p-2"
                                                        >
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    file,
                                                                )}
                                                                alt="Preview"
                                                                className="h-12 w-12 rounded border object-cover"
                                                            />
                                                            <span className="flex-1 text-sm">
                                                                {file.name}
                                                            </span>
                                                            <select
                                                                value={
                                                                    projectForm
                                                                        .imageTypes[
                                                                        idx
                                                                    ] || 'card'
                                                                }
                                                                onChange={(e) =>
                                                                    handleImageTypeChange(
                                                                        idx,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="rounded border px-2 py-1 text-sm"
                                                            >
                                                                <option value="card">
                                                                    Card
                                                                </option>
                                                                <option value="detail">
                                                                    Detail
                                                                </option>
                                                            </select>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex gap-2 pt-4">
                                    <button
                                        type="submit"
                                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    >
                                        {editProjectId
                                            ? 'Update Project'
                                            : 'Create Project'}
                                    </button>
                                    {editProjectId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditProjectId(null);
                                                setProjectForm({
                                                    title: '',
                                                    slug: '',
                                                    status: 'ongoing',
                                                    short_description: '',
                                                    tags: [],
                                                    images: [],
                                                    imageTypes: [],
                                                });
                                                setProjectImages([]);
                                                setProjectTags([]);
                                                if (fileInputRef.current)
                                                    fileInputRef.current.value =
                                                        '';
                                            }}
                                            className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Projects Table */}
                        <div className="w-full rounded border bg-white">
                            <table
                                className="w-full"
                                style={{ tableLayout: 'auto' }}
                            >
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                            Title
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                            Tags
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                            Images
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">
                                                {p.id}
                                            </td>
                                            <td className="px-4 py-3 font-medium">
                                                {p.title}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`rounded px-2 py-1 text-xs ${
                                                        p.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {(p.tags || []).map(
                                                        (tag) => (
                                                            <span
                                                                key={tag.id}
                                                                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs"
                                                            >
                                                                <span className="mr-1">
                                                                    {tag.name}
                                                                </span>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDetachProjectTag(
                                                                            p.id,
                                                                            tag.id,
                                                                        )
                                                                    }
                                                                    className="font-bold text-red-500 hover:text-red-700"
                                                                    title="Remove tag"
                                                                >
                                                                    ×
                                                                </button>
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </td>
                                            <td
                                                className="px-2 py-2 text-center align-middle"
                                                style={{
                                                    width: '140px',
                                                    height: '90px',
                                                }}
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    {(p.images || []).map(
                                                        (img) => (
                                                            <div
                                                                key={img.id}
                                                                className="group relative"
                                                            >
                                                                <img
                                                                    src={
                                                                        img.url.startsWith(
                                                                            'http',
                                                                        )
                                                                            ? img.url
                                                                            : `/storage/${img.url}`
                                                                    }
                                                                    alt="Project image"
                                                                    className="h-20 w-32 rounded border object-cover"
                                                                    style={{
                                                                        display:
                                                                            'inline-block',
                                                                    }}
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteProjectImage(
                                                                                img.id,
                                                                            )
                                                                        }
                                                                        className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                                                                        title="Delete image"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleProjectEdit(p)
                                                        }
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleProjectDelete(
                                                                p.id,
                                                            )
                                                        }
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
