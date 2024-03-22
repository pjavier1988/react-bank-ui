import React from 'react';
import useUserForm from '../hooks/useUserForm';

export const Users = () => {
  const {
    user,
    handleChange,
    handleSubmit,
    errors,
    successMessage,
    users,
    deleteUser,
    updateUser,
    loadUser,
    editing,
    cancel,
  } = useUserForm((user) => {
    console.log('Form submitted:', user);
  });

  return (
    <div className="row">
      <div className="col-md-4">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}
        <form onSubmit={handleSubmit} className="card card-body">
          <input
            type="text"
            name="names"
            onChange={handleChange}
            value={user.names}
            className={`form-control ${errors.names ? 'is-invalid' : ''}`}
            placeholder="Names"
            autoFocus
          />
          {errors.names && (
            <div className="invalid-feedback">{errors.names}</div>
          )}

          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={user.username}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Username"
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}

          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={user.email}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}

          <button className="btn btn-primary btn-block" type="submit">
            {editing ? 'Update' : 'Create'}
          </button>

          {editing && (
            <button className="btn btn-secondary btn-block" onClick={cancel}>
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="col-md-8">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Names</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.names}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => loadUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
