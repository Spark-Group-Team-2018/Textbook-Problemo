export class User {

  id:number
  first_name:string
  last_name:string
  email:string
  user_token:string /** Profile Token for Auth **/
  authToken:string
  phone_number:string
  // You dont have the password


  constructor() {

  }

  static getNewUserPayload(user:User) {

    return {
      "user": {
        "first_name": "",
        "last_name": "",
        "phone_number": "000-000-0000",
        "email": user["email"],
        "password": user["user_token"],
        "password_confirmation": user["user_token"]
      }
    }

  }


}
