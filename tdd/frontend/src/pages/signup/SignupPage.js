import axios from 'axios';
import React, { useState } from 'react'

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });

  const [isLoading, setIsLoding] = useState(false);
  const [isSuccessSignup, setIsSuccessSignup] = useState(false);
  
  const onChange = (event) => {
    setSignupData({ ...signupData, [event.target.id]: event.target.value });
  }

  const submit = async (event) => {
    event.preventDefault();
    setIsLoding(true);
    const { username, email, password } = signupData;
    try {
      await axios.post('http://localhost:8080/api/1.0/users', {
        username,
        email,
        password
      });
    
      setIsLoding(false);  
      setIsSuccessSignup(true);
    } catch (e) {
      console.log(e);
    }
    
  }

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      {!isSuccessSignup && ( <form className="card mt-5" data-testid="form-sign-up">
        <div className="card-header">
          <h1 className="text-center">
            Sign Up
          </h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor='username' className="form-label">username</label>
            <input id="username" name="username" className="form-control" placeholder="username" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor='email' className="form-label">email</label>
            <input className="form-control" id="email" name="email" placeholder="email" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor='password' className="form-label">password</label>
            <input className="form-control" type="password" name="password" id="password" placeholder="password" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor='passwordRepeat' className="form-label">password repeat</label>
            <input className="form-control" type="password" name="repeatedPassword" id="passwordRepeat" placeholder="password" onChange={onChange} />
          </div>
          <div className="text-center">
          <button
                className="btn btn-primary"
                onClick={submit}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                )}
                Sign Up
              </button>
          </div>
        </div>
      </form>
      )}
      {isSuccessSignup && (
        <div className="alert alert-success mt-3">
          Please check your e-mail to activate your account
        </div>
      )}
    </div>
  )
}

export default SignupPage;
