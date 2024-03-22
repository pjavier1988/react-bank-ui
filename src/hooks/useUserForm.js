import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_BANK_API_URL;

const useUserForm = (submitCallback) => {
  const [user, setUser] = useState({
    names: '',
    email: '',
    username: '',
  });
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.email.includes('@')) newErrors.email = 'Email must contain @';
    if (user.names?.length === 0) newErrors.names = 'Name is required';
    if (user.username.length === 0) newErrors.username = 'Username is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getUsers = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    const response = await fetch(`${API}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data?.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${API}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.status === 201) {
        setUser({ names: '', email: '', username: '' });
        setSuccessMessage('User created successfully!');
        setTimeout(() => setSuccessMessage(''), 20000);
        await getUsers();
        submitCallback(user);
      } else {
        console.error('Failed to create user:', response.status);
        setErrors({ form: 'Failed to create user. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!editing) await createUser();
    else await updateUser();
  };

  const updateUser = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    const response = await fetch(`${API}/user/${user.username}`, {
      method: 'PUT',
      body: JSON.stringify({ email: user.email }),
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    await getUsers();
    setEditing(false);
    setUser({ names: '', email: '', username: '' });
  };

  const loadUser = (user) => {
    setUser(user);
    setEditing(true);
  };
  const cancel = (user) => {
    setUser({
      names: '',
      email: '',
      username: '',
    });
    setEditing(false);
  };

  const deleteUser = async (username) => {
    const userResponse = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (!userResponse) return;
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API}/user/${username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    await getUsers();
  };

  return {
    user,
    handleChange,
    handleSubmit,
    errors,
    successMessage,
    users,
    deleteUser,
    loadUser,
    editing,
    cancel,
  };
};

export default useUserForm;
