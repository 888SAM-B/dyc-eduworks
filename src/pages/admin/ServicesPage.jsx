import React, { useState, useEffect, useRef } from 'react';
import { getAllServicesAdmin, createService, updateService, deleteService, getDevelopers } from '../../api/index.js';
import { Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight, Upload, Image } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5001';
const ICONS = ['BookOpen', 'Cpu', 'Settings', 'ShoppingBag', 'Globe', 'User', 'Layers'];
const EMPTY = {
  title: '', description: '', longDescription: '', icon: 'Globe',
  order: 0, active: true, projects: [], assignedDevelopers: [],
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [allDevs, setAllDevs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [proj, setProj] = useState({ title: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileRef = useRef();

  const fetch_ = async () => {
    try {
      const [s, d] = await Promise.all([getAllServicesAdmin(), getDevelopers()]);
      setServices(s.data); setAllDevs(d.data);
    } catch { /**/ } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setProj({ title: '', description: '' });
    setEditId(null);
    setErr('');
    setImageFile(null);
    setImagePreview('');
    setOpen(true);
  };

  const openEdit = (s) => {
    setForm({
      title: s.title, description: s.description,
      longDescription: s.longDescription || '',
      icon: s.icon, order: s.order, active: s.active,
      projects: s.projects || [],
      assignedDevelopers: (s.assignedDevelopers || []).map(d => d._id || d),
    });
    setImagePreview(s.image ? `${BACKEND_URL}${s.image}` : '');
    setImageFile(null);
    setProj({ title: '', description: '' });
    setEditId(s._id);
    setErr('');
    setOpen(true);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addProj = () => {
    if (!proj.title.trim()) return;
    setForm(f => ({ ...f, projects: [...f.projects, proj] }));
    setProj({ title: '', description: '', url: '' });
  };
  const removeProj = (i) => setForm(f => ({ ...f, projects: f.projects.filter((_, idx) => idx !== i) }));
  const toggleDev = (id) => setForm(f => ({
    ...f,
    assignedDevelopers: f.assignedDevelopers.includes(id)
      ? f.assignedDevelopers.filter(d => d !== id)
      : [...f.assignedDevelopers, id],
  }));

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setErr('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('longDescription', form.longDescription);
      fd.append('icon', form.icon);
      fd.append('order', String(form.order));
      fd.append('active', String(form.active));
      fd.append('projects', JSON.stringify(form.projects));
      fd.append('assignedDevelopers', JSON.stringify(form.assignedDevelopers));
      if (imageFile) fd.append('image', imageFile);

      if (editId) await updateService(editId, fd);
      else await createService(fd);

      setOpen(false);
      fetch_();
    } catch (e) { setErr(e.response?.data?.message || 'Error saving service'); }
    finally { setSaving(false); }
  };

  const del = async (id) => { if (!window.confirm('Delete?')) return; await deleteService(id); fetch_(); };
  const toggle = async (s) => {
    const fd = new FormData();
    fd.append('title', s.title);
    fd.append('description', s.description);
    fd.append('longDescription', s.longDescription || '');
    fd.append('icon', s.icon);
    fd.append('order', String(s.order));
    fd.append('active', String(!s.active));
    fd.append('projects', JSON.stringify(s.projects || []));
    fd.append('assignedDevelopers', JSON.stringify((s.assignedDevelopers || []).map(d => d._id || d)));
    await updateService(s._id, fd);
    fetch_();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">Services</h1>
          <p className="text-light/40 text-sm">Manage services displayed on the website.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-teal text-dark px-6 py-3 font-bold hover:bg-light transition-all">
          <Plus size={18} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="bg-medium animate-pulse h-20 border border-light/5" />)}</div>
      ) : services.length === 0 ? (
        <div className="text-center py-24 text-light/30"><div className="text-6xl mb-4">⚙️</div><p>No services yet.</p></div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s._id} className={`bg-medium border flex items-center gap-4 px-6 py-4 ${s.active ? 'border-light/5' : 'border-light/5 opacity-50'}`}>
              {/* Service thumbnail */}
              <div className="w-12 h-12 shrink-0 overflow-hidden bg-dark/60 border border-light/10">
                {s.image ? (
                  <img src={`${BACKEND_URL}${s.image}`} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={18} className="text-light/20" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">{s.title}</div>
                <div className="text-light/40 text-xs mt-0.5">{s.projects?.length || 0} projects · {s.assignedDevelopers?.length || 0} developers {s.image ? '· 📷 has illustration' : ''}</div>
              </div>
              <span className="text-xs text-light/30 shrink-0">Order: {s.order}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggle(s)} className={s.active ? 'text-teal' : 'text-light/30'}>
                  {s.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
                <button onClick={() => openEdit(s)} className="p-2 text-light/40 hover:text-teal"><Pencil size={15} /></button>
                <button onClick={() => del(s._id)} className="p-2 text-light/40 hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-medium border border-light/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-light/5">
              <h2 className="text-lg font-bold">{editId ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setOpen(false)} className="text-light/40 hover:text-light"><X size={20} /></button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-5">
              {err && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">{err}</div>}

              {/* Illustration image upload */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Service Illustration</label>
                <div
                  onClick={() => fileRef.current.click()}
                  className="border border-dashed border-light/20 hover:border-teal cursor-pointer h-40 flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden relative group"
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="preview" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-light/80 text-sm font-bold">
                        <Upload size={18} /> Change Image
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={28} className="text-light/30" />
                      <span className="text-xs text-light/30">Click to upload illustration / banner image</span>
                      <span className="text-xs text-light/20">PNG, JPG, WEBP up to 5MB</span>
                    </>
                  )}
                </div>
                <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleImage} />
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(''); }}
                    className="text-xs text-red-400 hover:text-red-300 mt-2 flex items-center gap-1"
                  >
                    <X size={12} /> Remove illustration
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full bg-dark border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Short Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={2} className="w-full bg-dark border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Detailed Description</label>
                <textarea value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} rows={4} placeholder="Full description for the service detail page..." className="w-full bg-dark border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none resize-none" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Icon</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full bg-dark border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none">
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} className="w-full bg-dark border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Active</label>
                  <select value={form.active.toString()} onChange={e => setForm({ ...form, active: e.target.value === 'true' })} className="w-full bg-dark border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none">
                    <option value="true">Yes</option><option value="false">No</option>
                  </select>
                </div>
              </div>

              {/* Projects */}
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-3">Sample Projects</label>
                <div className="space-y-2 mb-3">
                  {form.projects.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-dark/50 border border-light/10 px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{p.title}</div>
                        <div className="text-xs text-light/40 truncate">{p.description}</div>
                        {p.url && <div className="text-xs text-teal/60 truncate mt-0.5">🔗 {p.url}</div>}
                      </div>
                      <button type="button" onClick={() => removeProj(i)} className="text-light/30 hover:text-red-400 shrink-0"><X size={14} /></button>
                    </div>
                  ))}
                </div>
                <div className="border border-dashed border-light/10 p-4 space-y-3">
                  <input type="text" value={proj.title} onChange={e => setProj({ ...proj, title: e.target.value })} placeholder="Project title" className="w-full bg-dark border border-light/10 px-3 py-2 text-sm text-light placeholder-light/20 focus:border-teal focus:outline-none" />
                  <input type="text" value={proj.description} onChange={e => setProj({ ...proj, description: e.target.value })} placeholder="Project description" className="w-full bg-dark border border-light/10 px-3 py-2 text-sm text-light placeholder-light/20 focus:border-teal focus:outline-none" />
                  <input type="text" value={proj.url || ''} onChange={e => setProj({ ...proj, url: e.target.value })} placeholder="Project URL (optional) — e.g. github.com/repo" className="w-full bg-dark border border-light/10 px-3 py-2 text-sm text-light placeholder-light/20 focus:border-teal focus:outline-none" />
                  <button type="button" onClick={addProj} className="text-xs font-bold text-teal hover:text-light flex items-center gap-1"><Plus size={13} /> Add Project</button>
                </div>
              </div>

              {/* Developer Assignment */}
              {allDevs.length > 0 && (
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-3">Assign Developers</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allDevs.map(d => {
                      const sel = form.assignedDevelopers.includes(d._id);
                      return (
                        <button key={d._id} type="button" onClick={() => toggleDev(d._id)}
                          className={`flex items-center gap-3 p-3 border text-left transition-all ${sel ? 'border-teal bg-teal/10 text-teal' : 'border-light/10 text-light/50 hover:border-light/20'}`}>
                          <div className={`w-2 h-2 shrink-0 ${sel ? 'bg-teal' : 'bg-light/20'}`} />
                          <div className="min-w-0"><div className="text-xs font-bold truncate">{d.name}</div><div className="text-xs text-light/30 truncate">{d.specialization}</div></div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-light/10 py-3 text-sm font-bold text-light/50 hover:border-light/30 hover:text-light transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-teal text-dark py-3 font-bold hover:bg-light transition-all disabled:opacity-50">
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
