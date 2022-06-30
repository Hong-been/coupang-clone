import Service from "./service";

export interface AuthServiceI{
  refresh: ()=>void;
  signup: (params: SignupInput)=>void;
  login: (params: LoginInput)=>void;
}

class AuthService extends Service implements AuthServiceI{
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = this.Cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const {data} = await this.apiAxios.post<tokenData>(`/auth/refresh`,null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    
    this.Cookies.set("accessToken", data.access, { expires:1 });
    this.Cookies.set("refreshToken", data.refresh, { expires:7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(params: SignupInput) {
    const { data } = await this.apiAxios.post<tokenData>(`/auth/signup`,params);

    this.Cookies.set("accessToken", data.access, { expires:1 });
    this.Cookies.set("refreshToken", data.refresh, { expires:7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(params : LoginInput) {
    const { data } = await this.apiAxios.post<tokenData>(`/auth/login`,params);

    this.Cookies.set("accessToken", data.access, { expires:1 });
    this.Cookies.set("refreshToken", data.refresh, { expires:7 });
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

