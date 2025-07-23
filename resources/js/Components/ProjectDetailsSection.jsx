import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProjectDetailsSection({ projectId }) {
    const [details, setDetails] = useState([]);
    const [images, setImages] = useState([]);
    const [editing, setEditing] = useState(null); // {id, type, content, position}
    const [form, setForm] = useState({
        type: 'paragraph',
        content: '',
        position: 1,
    });

    // Fetch details
    useEffect(() => {
        fetchDetails();
    }, [projectId]);

    const fetchDetails = async () => {
        const res = await axios.get(`/admin/projects/${projectId}/details`);
        setDetails(res.data);
    };

    // Fetch images for image type
    const fetchImages = async () => {
        // Ambil semua gambar detail milik project
        const res = await axios.get(`/admin/projects/${projectId}`);
        const project = res.data;
        setImages(
            (project.images || []).filter((img) => img.type === 'detail'),
        );
    };

    // Handle add/edit
    const handleSave = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`/admin/project-details/${editing.id}`, {
                ...form,
                position: form.position,
            });
        } else {
            await axios.post('/admin/project-details', {
                ...form,
                project_id: projectId,
            });
        }
        setEditing(null);
        setForm({
            type: 'paragraph',
            content: '',
            position: details.length + 1,
        });
        fetchDetails();
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (confirm('Delete this block?')) {
            await axios.delete(`/admin/project-details/${id}`);
            fetchDetails();
        }
    };

    // Handle edit
    const handleEdit = (detail) => {
        setEditing(detail);
        setForm({
            type: detail.type,
            content: detail.content,
            position: detail.position,
        });
        if (detail.type === 'image') fetchImages();
    };

    // Handle type change
    const handleTypeChange = (e) => {
        setForm({ ...form, type: e.target.value });
        if (e.target.value === 'image') fetchImages();
    };

    return (
        <div className="my-6 rounded border bg-white p-4">
            <h3 className="mb-2 font-bold">Project Details</h3>
            <form onSubmit={handleSave} className="mb-4 flex flex-col gap-2">
                <select
                    name="type"
                    value={form.type}
                    onChange={handleTypeChange}
                    className="rounded border p-2"
                >
                    <option value="heading">Heading</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="image">Image</option>
                    <option value="embed">Embed</option>
                </select>
                {form.type === 'image' ? (
                    <div className="flex flex-col gap-2">
                        <select
                            name="content"
                            value={form.content}
                            onChange={(e) =>
                                setForm({ ...form, content: e.target.value })
                            }
                            className="rounded border p-2"
                        >
                            <option value="">Select Image</option>
                            {images.map((img) => (
                                <option key={img.id} value={img.url}>
                                    {img.url}
                                </option>
                            ))}
                        </select>
                        {form.content && (
                            <img
                                src={
                                    form.content.startsWith('http')
                                        ? form.content
                                        : `/storage/${form.content}`
                                }
                                alt="Preview"
                                className="h-32 rounded border object-contain"
                                style={{ maxWidth: 240 }}
                            />
                        )}
                    </div>
                ) : (
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                        className="rounded border p-2"
                        placeholder={
                            form.type === 'heading'
                                ? 'Heading text'
                                : form.type === 'paragraph'
                                  ? 'Paragraph text'
                                  : 'Embed code'
                        }
                    />
                )}
                <input
                    type="number"
                    name="position"
                    value={form.position}
                    onChange={(e) =>
                        setForm({ ...form, position: e.target.value })
                    }
                    className="rounded border p-2"
                    min={1}
                    placeholder="Position"
                />
                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    {editing ? 'Update' : 'Add'} Block
                </button>
                {editing && (
                    <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="rounded bg-gray-400 px-4 py-2 text-white"
                    >
                        Cancel
                    </button>
                )}
            </form>
            <div>
                {details.map((detail) => (
                    <div
                        key={detail.id}
                        className="flex items-center gap-2 border-b py-2"
                    >
                        <span className="font-mono text-xs text-gray-500">
                            #{detail.position}
                        </span>
                        <span className="font-semibold">{detail.type}</span>
                        <span className="flex-1">
                            {detail.type === 'image' ? (
                                <img
                                    src={
                                        detail.content.startsWith('http')
                                            ? detail.content
                                            : `/storage/${detail.content}`
                                    }
                                    alt=""
                                    className="inline h-12"
                                />
                            ) : (
                                <span>{detail.content}</span>
                            )}
                        </span>
                        <button
                            onClick={() => handleEdit(detail)}
                            className="text-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(detail.id)}
                            className="text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
