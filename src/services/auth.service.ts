import {apiAxios}  from "./axios";
import Cookies from "./cookies"

export interface AuthServiceI{
  refresh: ()=>void;
  signup: (params: SignupInput)=>void;
  login: (params: LoginInput)=>void;
}

class AuthService implements AuthServiceI{
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const {data} = await apiAxios.post<tokenData>(`/auth/refresh`,null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    
    Cookies.set("accessToken", data.access, { expires:1 });
    Cookies.set("refreshToken", data.refresh, { expires:7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(params: SignupInput) {
    const { data } = await apiAxios.post<tokenData>(`/auth/signup`,params);

    Cookies.set("accessToken", data.access, { expires:1 });
    Cookies.set("refreshToken", data.refresh, { expires:7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(params : LoginInput) {
    const { data } = await apiAxios.post<tokenData>(`/auth/login`,params);

    Cookies.set("accessToken", data.access, { expires:1 });
    Cookies.set("refreshToken", data.refresh, { expires:7 });
  }
}
export default new AuthService();

export type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

export type tokenData = {
  access:string, 
  refresh:string
}

export type SignupInput = LoginInput & {
  name: string,
  phoneNumber: string,
  agreements: SignupAgreements
}

export type LoginInput= {
  email: string, 
  password: string
}

