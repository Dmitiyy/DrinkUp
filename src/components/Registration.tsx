import { useAppSelector } from "../redux"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"

export const Registration = () => {
  const isSignIn = useAppSelector(state => state.user.isSignIn);

  return (
    <>
      {
        isSignIn ? (
          <SignIn />
          ) : (
          <SignUp />
        )
      }
    </>
  )
}