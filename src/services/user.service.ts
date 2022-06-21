import {Axios}  from "./axios";
import cookies from "js-cookie";

class UserService {
  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await Axios.get("/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  }

  async read(id: number) {
    const { data } = await Axios.get(`/users/${id}`);

    return data;
  }
}

export default new UserService();
