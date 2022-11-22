export interface ContactAddressInterface {
  street: string
  suite:string 
  city:string
  zipcode:string
  geo:{
    lat:string
    lng:string
  }
}

export interface ContactCompanyInterface {
  name:string
  catchPhrase:string
  bs:string
}

export interface ContactInterface {
  id?: string,
  name: string,
  username?:string,
  email: string
  address?: ContactAddressInterface
  phone:string
  wepsite?:string
  company?:ContactCompanyInterface
}
