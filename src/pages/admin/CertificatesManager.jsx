import { useEffect, useState } from 'react';
import { certificatesApi } from '../../services/api';

const emptyForm = { title: '', issuer: '', image: '', fileUrl: '' };

export default function CertificatesManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await certificatesApi.list();
      setItems(data);
    } catch {
      setNotice('Could not load certificates. Is the backend running?');
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
      const { data } = await certificatesApi.uploadImage(formData);
      setForm((f) => ({ ...f, image: data.url }));
    } catch {
      setNotice('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice('');
    try {
      if (editingId) {
        await certificatesApi.update(editingId, form);
        setNotice('Certificate updated.');
      } else {
        await certificatesApi.create(form);
        setNotice('Certificate added.');
      }
      resetForm();
      load();
    } catch {
      setNotice('Save failed. Check required fields.');
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setForm({ ...emptyForm, ...cert });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    await certificatesApi.remove(id);
    load();
  };

  return (
    <div className="admin-projects">
      <h2>Certificates</h2>
      {notice && <p className="admin-notice">{notice}</p>}

      <form className="card admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Certificate' : 'Add Certificate'}</h3>

        <div className="field">
          <label>Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>

        <div className="field">
          <label>Issuer</label>
          <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
        </div>

        <div className="field">
          <label>Certificate Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.image && <span className="admin-form__hint">Uploaded: {form.image}</span>}
        </div>

        <div className="field">
          <label>File URL (PDF download)</label>
          <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} />
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary">
            {editingId ? 'Update Certificate' : 'Add Certificate'}
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
                <th>Issuer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.issuer}</td>
                  <td className="admin-table__actions">
                    <button onClick={() => handleEdit(c)}>Edit</button>
                    <button onClick={() => handleDelete(c.id)}>Delete</button>
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
