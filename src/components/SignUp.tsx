import { useState } from "react";
import { ReactComponent as Password } from "../assets/images/password.svg";

export const SignUp = () => {
  const [policy, setPolicy] = useState(false);

  return (
    <div className='signUp'>
      <label htmlFor="email">E-mail</label>
      <input type="email" id='email' placeholder='E-mail' />
      <label htmlFor="password">Password</label>
      <div>
        <input type="text" id='password' placeholder='Password' />
        <div>
          <Password />
        </div>
      </div>
      <button>SIGN UP</button>
      <div className='signUp__policy'>
        <div className='checkbox' onClick={() => setPolicy(!policy)}>
          {policy ? (<p>✔</p>) : null}
        </div>
        <p>By signing up you agree to <span>TOU and Privacy Policy</span></p>
      </div>
      <div className='signUp__text'>
        <p>Already have an account?</p>
        <p>Sign in</p>
      </div>
    </div>
  )
}