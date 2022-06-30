import {apiAxios}  from "./axios";
import Cookies from "./cookies"

class Service {
  readonly apiAxios = apiAxios;
  readonly Cookies = Cookies;
  constructor(){
    this.apiAxios = apiAxios;
    this.Cookies = Cookies;
  }
}

export default Service;