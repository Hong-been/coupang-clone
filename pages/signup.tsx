import type { NextPage } from "next";
import { useCallback,useEffect,useState } from 'react';
import { useRequest } from '../src/hooks';
import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import { SignupParams } from "../src/services";

const sample:SignupParams = { 
  email: "hong1231@gmail.com", 
  password: "111", 
  name:"hong",
  phoneNumber:"342", 
  agreements: {
    privacy: false,
    ad: false,
}}

const Signup: NextPage = () => {
  const [signup,setSignup] = useState<SignupParams>({...sample});
  const {signupFetch} = useRequest();
  
  const { data: signupData, status, error, refetch } = useQuery('signup', ()=>signupFetch(signup), {
    enabled:false
  });
    
  const handleSignupClick = useCallback(() => {
    refetch()
  },[refetch])
    

    console.log(signupData, status, error)
  return (
    <div className={styles.container}>
      sign up page
      <button onClick={handleSignupClick}>SIGN UP</button>
    </div>
  );
};

export default Signup;
