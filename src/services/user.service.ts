import Service from "./service";
import {SignupInput} from "./auth.service"

export interface UserServiceI {
  me: ()=>any;
  read: (input:readInput)=>any;
}

class UserService extends Service implements UserServiceI {
  async me() {
    const accessToken = this.Cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await this.apiAxios.get<userDataReturnType>("/users/me",{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }}
    );

    return data;
  }

  async read({id}:readInput) {
    const { data } = await this.apiAxios.get<userDataReturnType>(`/users/${id}`);
    return data;
  }
}

export default new UserService();

export type userDataReturnType = SignupInput & {
  email: string,
  id: number,
}

export type readInput = {
  id: number
}