import { useQuery } from "react-query";
import { useCallback,useEffect,useState } from 'react';
import { UserService } from "../services";
import { AuthService,SignupParams,LoginParams } from "../services";

//우선 로그인만 구현하고, 로그인대신 회원가입, 등 타입을 제네릭으로 만들어? ㅠ
export const useRequest = () => {
  
  return {
    signupFetch: (signup:SignupParams)=>AuthService.signup(signup),
    loginFetch: AuthService.login,
  }
};

