import { useEffect, useState } from 'react';
import { projectsApi } from '../../services/api';
import { projectCategories } from '../../data/portfolioData';

const emptyForm = {
  title: '',
  description: '',
  category: projectCategories[1] ?? 'Frontend',
  tech: '',
  github: '',
  live: '',
  featured: false,
  image: '',
};

export default function ProjectsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await projectsApi.list();
      setItems(data);
    } catch {
      setNotice('Could not load projects. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await projectsApi.uploadImage(formData);
      setForm((f) => ({ ...f, image: data.url }));
    } catch {
      setNotice('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setNotice('');
    const payload = { ...form, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editingId) {
        await projectsApi.update(editingId, payload);
        setNotice('Project updated.');
      } else {
        await projectsApi.create(payload);
        setNotice('Project added.');
      }
      resetForm();
      load();
    } catch {
      setNotice('Save failed. Check required fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      ...emptyForm,
      ...project,
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await projectsApi.remove(id);
    load();
  };

  return (
    <div className="admin-projects">
      <h2>Projects</h2>
      {notice && <p className="admin-notice">{notice}</p>}

      <form className="card admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Project' : 'Add Project'}</h3>

        <div className="field">
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {projectCategories.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Tech Stack (comma separated)</label>
          <input
            value={form.tech}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
            placeholder="React, Node.js, MySQL"
          />
        </div>

        <div className="field">
          <label>GitHub URL</label>
          <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
        </div>

        <div className="field">
          <label>Live Demo URL</label>
          <input value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} />
        </div>

        <div className="field">
          <label>Project Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.image && <span className="admin-form__hint">Uploaded: {form.image}</span>}
        </div>

        <label className="admin-form__checkbox">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured project
        </label>

        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" className="btn btn--ghost" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.featured ? 'Yes' : 'No'}</td>
                  <td className="admin-table__actions">
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
