import {apiAxios}  from "./axios";
import Cookies from "./cookies"
import {SignupInput} from "./auth.service"

export interface UserServiceI {
  me: ()=>any;
  read: (input:readInput)=>any;
}

class UserService implements UserServiceI {
  async me() {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await apiAxios.get<userDataReturnType>("/users/me",{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }}
    );

    return data;
  }

  async read({id}:readInput) {
    const { data } = await apiAxios.get<userDataReturnType>(`/users/${id}`);
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