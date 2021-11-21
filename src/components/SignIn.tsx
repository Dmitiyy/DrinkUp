import { ReactComponent as Password } from "../assets/images/password.svg";

export const SignIn = () => {
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
      <button>LOG IN</button>
    </div>
  )
}