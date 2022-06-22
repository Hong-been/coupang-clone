import type { NextPage } from "next";
import { useCallback,useEffect,useState } from 'react';
import { useRequest } from '../src/hooks';
import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import { LoginParams } from "../src/services";

const correctSample:LoginParams = { 
  email: "hong1231@gmail.com", 
  password: "111", 
}
const wrongPwSample:LoginParams = { 
  email: "hong1231@gmail.com", 
  password: "1234", 
}

const wrongEmailSample:LoginParams = { 
  email: "hong897982739471@gmail.com", 
  password: "111", 
}

const Login: NextPage = () => {
  const [login,setLogin] = useState<LoginParams>(wrongPwSample);
  const {loginFetch} = useRequest();
  
  const { data: loginData, status, isLoading,  error, refetch } = useQuery('Login', ()=>loginFetch(login), {
    enabled:false,
    retry: false,
  });
    
  const handleCorrectLoginClick = useCallback(() => {
    setLogin(correctSample)
  },[setLogin])

  const handleWrongPwClick = useCallback(()=>{
    setLogin(wrongPwSample)
  },[setLogin])

  const handleWrongEmailClick = useCallback(()=>{
    setLogin(wrongEmailSample)
  },[setLogin])

  useEffect(()=>{
    refetch()
  },[login,refetch])

    console.log(loginData, status,isLoading, error)
  return (
    <div className={styles.container}>
      login page
      <button onClick={handleCorrectLoginClick}>Correct Log In</button>
      <button onClick={handleWrongPwClick}>Wrong PW Log In</button>
      <button onClick={handleWrongEmailClick}>Wrong Email Log In</button>
    </div>
  );
};

export default Login;
