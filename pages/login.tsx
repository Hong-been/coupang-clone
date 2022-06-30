import type { NextPage } from "next";
import { useCallback,useEffect,useState } from 'react';
import { useRequest } from '../src/hooks';
import styles from "../styles/Home.module.css";
import { UserService,AuthService,LoginInput } from "../src/services";

const correctSample:LoginInput = { 
  email: "hong1231@gmail.com", 
  password: "111", 
}
const wrongPwSample:LoginInput = { 
  email: "hong1231@gmail.com", 
  password: "1234", 
}

const wrongEmailSample:LoginInput = { 
  email: "hong897982739471@gmail.com", 
  password: "111", 
}

const Login: NextPage = () => {
  const [loginInput,setLoginInput] = useState<LoginInput>(wrongPwSample);
  
  const { status,refetch:reLogin, isLoading } = useRequest("login",()=>AuthService.login(loginInput));
  const { data: meData,refetch: reMe} = useRequest("me",UserService.me);
    
  const handleCorrectLoginClick = useCallback(() => {
    setLoginInput(correctSample)
  },[setLoginInput])

  const handleWrongPwClick = useCallback(()=>{
    setLoginInput(wrongPwSample)
  },[setLoginInput])

  const handleWrongEmailClick = useCallback(()=>{
    setLoginInput(wrongEmailSample)
  },[setLoginInput])

  useEffect(()=>{
    reLogin();
  },[reLogin,loginInput])

  useEffect(()=>{
    if(status==="success"){
      reMe()
    }
  },[status,reMe])

  return (
    <h1>
      login page
      <p>
        {isLoading ? "Loading...🤔" 
        : status==="success" 
        ? "로그인 성공! ✅" 
        : status==="error" && "로그인 실패 ❌"}
      </p>
      {status==="success" && 
      <div className={styles.code}>{JSON.stringify(meData)}</div>}
      <button 
        className={styles.code} 
        onClick={handleCorrectLoginClick}>Correct Log In</button>
      <button 
        className={styles.code} 
        onClick={handleWrongPwClick}>Wrong PW Log In</button>
      <button 
        className={styles.code} 
        onClick={handleWrongEmailClick}>Wrong Email Log In</button>
      
    </h1>
  );
};

export default Login;
