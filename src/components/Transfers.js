import React from 'react';
import useTransferForm from '../hooks/useTransferForm';
export const Transfers = () => {
  const {
    transaction,
    handleChange,
    handleSubmit,
    successMessage,
    errors,
    transfer,
    accounts,
  } = useTransferForm((account) => {
    console.log('Form submitted:', account);
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
            name="from_account"
            onChange={handleChange}
            value={transfer?.from_account}
            className={`form-control ${
              errors.from_account ? 'is-invalid' : ''
            }`}
            placeholder="Account from:"
            autoFocus
          />
          {errors.from_account && (
            <div className="invalid-feedback">{errors.from_account}</div>
          )}

          <input
            type="text"
            name="to_account"
            onChange={handleChange}
            value={transfer?.to_account}
            className={`form-control ${errors.to_account ? 'is-invalid' : ''}`}
            placeholder="Account to:"
          />
          {errors.to_account && (
            <div className="invalid-feedback">{errors.to_account}</div>
          )}

          <input
            type="number"
            name="amount"
            onChange={handleChange}
            value={transfer?.amount}
            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
            placeholder="Amount"
          />
          {errors.amount && (
            <div className="invalid-feedback">{errors.email}</div>
          )}

          <button className="btn btn-primary btn-block" type="submit">
            {'Transfer'}
          </button>
        </form>
      </div>
      <div className="col-md-8">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Names</th>
              <th>Account number</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((account) => (
              <tr key={account.account_number}>
                <td>{account.user?.names}</td>
                <td>{account.account_number}</td>
                <td>${account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
