import React, { useState, useEffect, useRef } from 'react';
import { getDevelopers, createDeveloper, updateDeveloper, deleteDeveloper } from '../../api/index.js';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
const getImageSrc = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${BACKEND_URL}${url}`;
};
const EMPTY_FORM = { name: '', qualification: '', specialization: '', projectsHandled: 0, bio: '', order: 0, portfolioUrl: '', email: '' };

const DevelopersPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const fetchDevelopers = async () => {
    try {
      const { data } = await getDevelopers();
      setDevelopers(data);
    } catch { setDevelopers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDevelopers(); }, []);

  const openAdd = () => {
    setForm(EMPTY_FORM); setImageFile(null); setImagePreview('');
    setEditingId(null); setError(''); setModalOpen(true);
  };

  const openEdit = (dev) => {
    setForm({
      name: dev.name, qualification: dev.qualification, specialization: dev.specialization,
      projectsHandled: dev.projectsHandled, bio: dev.bio || '', order: dev.order || 0,
      portfolioUrl: dev.portfolioUrl || '', email: dev.email || '',
    });
    setImagePreview(dev.image ? getImageSrc(dev.image) : '');
    setImageFile(null); setEditingId(dev._id); setError(''); setModalOpen(true);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);
      if (editingId) await updateDeveloper(editingId, fd);
      else await createDeveloper(fd);
      setModalOpen(false);
      fetchDevelopers();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this developer?')) return;
    await deleteDeveloper(id);
    fetchDevelopers();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">Developers</h1>
          <p className="text-light/40 text-sm">Manage team members shown on the website.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-teal text-dark px-6 py-3 font-bold hover:bg-light transition-all duration-300">
          <Plus size={18} /> Add Developer
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="bg-medium animate-pulse h-40 border border-light/5" />)}
        </div>
      ) : developers.length === 0 ? (
        <div className="text-center py-24 text-light/30">
          <div className="text-6xl mb-4">👥</div>
          <p>No developers yet. Click "Add Developer" to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev) => (
            <div key={dev._id} className="bg-medium border border-light/5 overflow-hidden group">
              <div className="h-40 bg-dark/50 relative overflow-hidden">
                {dev.image ? (
                  <img src={getImageSrc(dev.image)} alt={dev.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-teal/20">
                    {dev.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base mb-1">{dev.name}</h3>
                <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-1">{dev.specialization}</p>
                <p className="text-light/40 text-xs mb-1">{dev.qualification}</p>
                {dev.email && (
                  <p className="text-light/50 text-xs truncate mb-1">
                    📧 {dev.email}
                  </p>
                )}
                {dev.portfolioUrl && (
                  <a href={dev.portfolioUrl} target="_blank" rel="noreferrer" className="text-xs text-teal/60 hover:text-teal truncate block mb-2">
                    🔗 {dev.portfolioUrl}
                  </a>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-light/10">
                  <span className="text-xs text-light/30">{dev.projectsHandled} Projects</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(dev)} className="p-2 text-light/40 hover:text-teal transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(dev._id)} className="p-2 text-light/40 hover:text-red-400 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-medium border border-light/10 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-light/5">
              <h2 className="text-lg font-bold">{editingId ? 'Edit Developer' : 'Add Developer'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-light/40 hover:text-light">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">{error}</div>}

              {/* Image upload */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Photo</label>
                <div onClick={() => fileRef.current.click()} className="border border-dashed border-light/20 hover:border-teal cursor-pointer h-32 flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <><Upload size={24} className="text-light/30" /><span className="text-xs text-light/30">Click to upload image</span></>
                  )}
                </div>
                <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleImage} />
              </div>

              {[
                { key: 'name', label: 'Full Name', type: 'text', required: true },
                { key: 'qualification', label: 'Qualification', type: 'text', required: true },
                { key: 'specialization', label: 'Specialization', type: 'text', required: true },
                { key: 'email', label: 'Email Address', type: 'email', required: false, placeholder: 'developer@dyceduworks.com' },
                { key: 'portfolioUrl', label: 'Portfolio URL', type: 'text', required: false, placeholder: 'github.com/username' },
                { key: 'projectsHandled', label: 'Projects Handled', type: 'number' },
                { key: 'order', label: 'Display Order', type: 'number' },
              ].map(({ key, label, type, required, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required={required}
                    placeholder={placeholder || ''}
                    className="w-full bg-dark border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                  className="w-full bg-dark border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none transition-colors resize-none" />
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 border border-light/10 py-3 text-sm font-bold text-light/50 hover:border-light/30 hover:text-light transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 bg-teal text-dark py-3 font-bold hover:bg-light transition-all disabled:opacity-50">
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopersPage;
