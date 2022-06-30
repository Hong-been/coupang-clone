import cookies from "js-cookie";

export interface CookiesI {
  set: (name: string, value: string, options?: cookies.CookieAttributes | undefined) => string | undefined,
  get: (name:string) => string | undefined,
}

class Cookies implements CookiesI{
  constructor() {}

  set(name: string, value: string, options?: cookies.CookieAttributes | undefined){
    console.warn(`cookies set✨: \n ${name} \n\n "${value}" \n\n options ${JSON.stringify(options)}`)
    return cookies.set(name, value, options);
  }

  get(name:string){
    console.warn(`cookies get: \n ${name}`)
    return cookies.get(name);
  } 
}

export default new Cookies();