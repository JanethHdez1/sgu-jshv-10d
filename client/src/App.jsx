import React, { useState, useEffect } from 'react';
import UserController from "./modules/users/user.controller";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await UserController.getAll();
    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await UserController.update({
        id: form.id,
        name: form.name,
        email: form.email,
        phone: form.phone
      });
    } else {
      await UserController.create({
        name: form.name,
        email: form.email,
        phone: form.phone
      });
    }
    setForm({ id: "", name: "", email: "", phone: "" });
    await load();
  };

  const edit = async (id) => {
    const u = await UserController.getById(id);
    if (u) setForm({ id: u.id, name: u.name || "", email: u.email || "", phone: u.phone || "" });
  };

  const remove = async (id) => {
    await UserController.delete(id);
    await load();
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12">
          <h1 className="h4">SGU-JSVH-10D</h1>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{form.id ? "Datos de usuario" : "Nuevo usuario"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary btn-sm">{form.id ? "Actualizar" : "Crear"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Lista de usuarios</h5>
              </div>

              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">No hay usuarios</td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.phone}</td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-outline-success" onClick={() => edit(u.id)}>Editar</button>
                              <button className="btn btn-outline-danger" onClick={() => remove(u.id)}>Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;