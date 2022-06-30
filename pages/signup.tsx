import type { NextPage } from "next";
import { useCallback,useEffect,useState } from 'react';
import { useRequest } from '../src/hooks';
import styles from "../styles/Home.module.css";
import { SignupInput,AuthService,LoginInput } from "../src/services";
import {useRouter} from 'next/router';

const correctSample:SignupInput = { 
  email: `${Math.random()}@hong.com`, 
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
  const router=useRouter()
  const [signupInput,setSignupInput] = useState<SignupInput>(wrongSample);

  const { status:signupStatus,refetch:reSignup } = useRequest("signup",()=>AuthService.signup(signupInput));

  const handleCorrectSignupClick = useCallback(() => {
    setSignupInput(correctSample)
  },[setSignupInput])

  const handleWrongSignupClick = useCallback(()=>{
    setSignupInput(wrongSample)
  },[setSignupInput])

  useEffect(()=>{
    reSignup();
  },[reSignup,signupInput])

  useEffect(()=>{
    if(signupStatus==="success"){
      if(confirm("로그인하러 이동하시겠습니까?")){
        router.replace("/login");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setSignupInput,signupStatus])
    
  return (
    <h1 className={styles.container}>
      sign up page
      <p>{signupStatus}</p>
      <button onClick={handleCorrectSignupClick}>Correct SignUp</button>
      <button onClick={handleWrongSignupClick}>Wrong SignUp</button>
      <div>{JSON.stringify(signupInput)}</div>
    </h1>
  );
};

export default Signup;
