export interface UserAddressInterface {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserCompanyInterface {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserInterface {
  id?: string;
  name: string;
  username?: string;
  email: string;
  address?: UserAddressInterface;
  phone: string;
  wepsite?: string;
  company?: UserCompanyInterface;
}

export type GetUserApiArg = void;
export type GetUserApiResponse = UserInterface[];
