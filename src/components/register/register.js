

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { toast } from 'react-toastify';
import RegisterService from '../../services/registerService';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const registerService = new RegisterService();
  const history = useHistory();
  const submitted = false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'emailAddress') {
      setEmailAddress(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'contactNumber') {
      setContactNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    registerService
      .registerUser({
        firstName,
        lastName,
        emailAddress,
        username,
        password,
        contactNumber,
      })
      .then((response) => {
        if (response) {
          localStorage.setItem('accessToken', response.accessToken);
          setFirstName('');
          setLastName('');
          setEmailAddress('');
          setUsername('');
          setPassword('');
          setContactNumber('');
          setLoading(false);
          //toast.success('Registration successful! Please log in.');
          history.push('/login');
        } else {
          setError('Error occurred');
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <section id="register">
      <div className="container">
        <div className="row min-vh-100 d-flex justify-content-center align-items-center">
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="https://d33wubrfki0l68.cloudfront.net/d7b3128e115346d419e411ffe3ac9a97c6c1bbd5/70041/assets/images/illustrations/sign-up-illustration.svg"
                    width="200"
                    height="200"
                    alt="Login page illustration"
                  />
                  <h3>SingUp to create your account</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !firstName)) && 'is-invalid'
                      }`}
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={handleInputChange}
                      placeholder="e.g johndoe"
                    />
                    {(submitted && !firstName) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !firstName
                          ? 'This field is required'
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !lastName)) && 'is-invalid'
                      }`}
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={handleInputChange}
                    />
                    {(submitted && !lastName) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !lastName
                          ? 'This field is required'
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">
                      E-mail
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !emailAddress)) && 'is-invalid'
                      }`}
                      type="emailAddress"
                      name="emailAddress"
                      id="emailAddress"
                      value={emailAddress}
                      onChange={handleInputChange}
                    />
                    {(submitted && !emailAddress) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !emailAddress
                          ? 'This field is required'
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !username)) && 'is-invalid'
                      }`}
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={handleInputChange}
                    />
                    {(submitted && !username) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !username
                          ? 'This field is required'
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !password)) && 'is-invalid'
                      }`}
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                    {(submitted && !password) || error ? (
                      <div className="invalid-feedback">
                        {submitted && !password
                          ? 'This field is required'
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <div className="input-group">
                      <div className="input-group-text">+91</div>
                      <input
                        className={`form-control form-control-sm ${
                          (error || (submitted && !contactNumber)) &&
                          'is-invalid'
                        }`}
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        value={contactNumber}
                        onChange={handleInputChange}
                      />
                      {(submitted && !contactNumber) || error ? (
                        <div className="invalid-feedback">
                          {submitted && !contactNumber
                            ? 'This field is required'
                            : error}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    {!loading ? (
                      <button type="submit" className="btn btn-sm btn-primary">Register</button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Checking..
                      </button>
                    )}
                  </div>
                </form>
                <div className="text-center mt-4">
                  <a href="/login">Back</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;