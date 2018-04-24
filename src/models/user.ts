// User model

export class User {

  //user fields
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

  //generate payload neccessary for creating a new user on the backend
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

  //generate payload neccessary for other user interactions with the backend
  static getUserPayload(user:User) {

    return {
      "user": {
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "phone_number": user["phone_number"],
        "email": user["email"]
      }
    }

  }


}
