import { SignIn } from "../login, signup/signIn";
import { SignUp } from "../login, signup/signUp";
import { Route, Routes} from 'react-router-dom'

export const LoginPage = ()=> {
  return(
    <>
      <Routes>
        <Route path="/" element={ <SignIn />} /> 
        <Route path="/signIn" element={ <SignIn />} /> 
        <Route path="/signUp" element={ <SignUp />} />
      </Routes>
    </>
  )
}