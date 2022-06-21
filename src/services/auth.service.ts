import {Axios}  from "./axios";
import cookies from "js-cookie";

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

export type SetCookies = {
  type: "access" | "refresh"
  token : string,
  expires: number,
}

export type SignupParams = LoginParams & {
  name: string,
  phoneNumber: string,
  agreements: SignupAgreements
}

export type LoginParams= {
  email: string, 
  password: string
}

class AuthService {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const { data } = await Axios.post(`/auth/refresh`,null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    this.setCookies({type: "access", token: data.access, expires: 1});
    this.setCookies({type: "refresh", token: data.refresh, expires: 7});
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(params: SignupParams) {
    const { data } = await Axios.post(`/auth/signup`,params);

    this.setCookies({type: "access", token: data.access, expires: 1});
    this.setCookies({type: "refresh", token: data.refresh, expires: 7});
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(params : LoginParams) {
    const { data } = await Axios.post(`/auth/login`,params);

    this.setCookies({type: "access", token: data.access, expires: 1});
    this.setCookies({type: "refresh", token: data.refresh, expires: 7});
  }

  private setCookies({
    type,
    token,
    expires,
  }: SetCookies){
    switch(type){
      case "access":
        cookies.set("accessToken", token, { expires });
        break;
      case "refresh":
        cookies.set("refreshToken", token, { expires });
        break;
    }
  }
}

export default new AuthService();
