
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

