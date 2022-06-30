import type { NextPage } from "next";
import { useCallback,useEffect,useState } from 'react';
import { useRequest } from '../src/hooks';
import styles from "../styles/Home.module.css";
import { SignupInput,AuthService,LoginInput } from "../src/services";

const correctSample:SignupInput = { 
  email: `${Math.random}@gmail.com`, 
  password: "111", 
  name:"hong",
  phoneNumber:"342", 
  agreements: {
    privacy: false,
    ad: false,
}}
const wrongSample:SignupInput = { 
  email: "hong1231@gmail.com", 
  password: "111", 
  name:"hong",
  phoneNumber:"342", 
  agreements: {
    privacy: false,
    ad: false,
}}

const Signup: NextPage = () => {
  const [signupInput,setSignupInput] = useState<SignupInput>(wrongSample);

  const { status,refetch:reSignup } = useRequest("signup",()=>AuthService.signup(signupInput));
    
  const handleCorrectSignupClick = useCallback(() => {
    setSignupInput(correctSample)
  },[setSignupInput])

  const handleWrongSignupClick = useCallback(()=>{
    setSignupInput(wrongSample)
  },[setSignupInput])


  useEffect(()=>{
    reSignup();
  },[reSignup,signupInput])
    
  return (
    <h1 className={styles.container}>
      sign up page
      <p>{status}</p>
      <button onClick={handleCorrectSignupClick}>Correct SignUp</button>
      <button onClick={handleWrongSignupClick}>Wrong SignUp</button>
      <div>{JSON.stringify(signupInput)}</div>
    </h1>
  );
};

export default Signup;
