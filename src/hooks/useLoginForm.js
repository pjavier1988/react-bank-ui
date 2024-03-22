import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const API = process.env.REACT_APP_BANK_API_URL;

const useLoginForm = (submitCallback) => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Login Submitted', { username, password });
    await logIn(username, password);
  };

  const logIn = async (email, password) => {
    try {
      const response = await fetch(`${API}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      const { access_token } = data?.data;
      localStorage.setItem('authToken', access_token);
      setIsAuthenticated(true);
      navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username.length) newErrors.from_account = 'Username is required';
    if (password?.length === 0) newErrors.to_account = 'Account to is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    handleChange,
    handleLogIn,
    errors,
    username,
    password,
  };
};

export default useLoginForm;
