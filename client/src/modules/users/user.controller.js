const UserController = {};
const ENV = import.meta.env;

const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}/users`;

UserController.getAll = async () => {
    return fetch(`${API_URL}`, {
        method: 'GET',
        headers: { "Accept": "application/json" }
    }).then(r => r.json());
}

UserController.getById = async (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: { "Accept": "application/json" }
    }).then(r => r.json());
}

UserController.create = async (user) => {
    return fetch(`${API_URL}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(r => r.json());
}

UserController.update = async (user) => {
    return fetch(`${API_URL}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(r => r.json());
}

UserController.delete = async (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}

export default UserController;
