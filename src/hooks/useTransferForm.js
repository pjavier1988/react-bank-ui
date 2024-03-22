import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_BANK_API_URL;

const useTransferForm = (submitCallback) => {
  const [transfer, setTransfer] = useState({
    from_account: '',
    to_account: '',
    amount: 0,
  });
  const [accounts, setAccounts] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const floatValue = parseFloat(value);
      setTransfer((prevState) => ({
        ...prevState,
        [name]: floatValue,
      }));
    } else {
      setTransfer((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!transfer.from_account.length)
      newErrors.from_account = 'Account from is required';
    if (transfer.to_account?.length === 0)
      newErrors.to_account = 'Account to is required';
    if (transfer.amount <= 0)
      newErrors.amount = 'Amount must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAccounts = async () => {
    const token = `Bearer ${localStorage.getItem('authToken')}`;
    const response = await fetch(`${API}/account`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    setAccounts(data?.data);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const generateTransfer = async () => {
    try {
      const token = `Bearer ${localStorage.getItem('authToken')}`;
      const response = await fetch(`${API}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(transfer),
      });

      if (response.status === 200) {
        setSuccessMessage('Transfer successfully!');
        setTimeout(() => setSuccessMessage(''), 20000);
        await getAccounts();
        submitCallback(transfer);
      } else {
        console.error('Failed to generate transfer:', response.status);
        setErrors({ form: 'Failed to generate transfer. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await generateTransfer();
  };

  return {
    transfer,
    handleChange,
    handleSubmit,
    errors,
    successMessage,
    accounts,
  };
};

export default useTransferForm;
