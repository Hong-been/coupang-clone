import {Axios}  from "./axios";
import {SignupParams,LoginParams} from "./types";
import cookies from "js-cookie";

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
    
    cookies.set("accessToken", data.access, { expires:1 });
    cookies.set("refreshToken", data.refresh, { expires:7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(params: SignupParams) {
    const { data } = await Axios.post(`/auth/signup`,params);

    cookies.set("accessToken", data.access, { expires:1 });
    cookies.set("refreshToken", data.refresh, { expires:7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(params : LoginParams) {
    const { data } = await Axios.post(`/auth/login`,params);

    cookies.set("accessToken", data.access, { expires:1 });
    cookies.set("refreshToken", data.refresh, { expires:7 });
  }
}
export default new AuthService();
