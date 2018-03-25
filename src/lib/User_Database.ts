import * as localForage from "localforage";

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//Get the API endpoint (URL)
import endpoint from './Endpoint';

/**

User_Database.ts

;; This script serves as an API interface with the local browser storage
;; The main purpose is to store and retrieve logged in user info
;; without repeat calles to the backend server

**/

@Injectable()
export class UserDatabase {

  constructor() {

  }


  /**

  setUserId(user_id)
  ;; Sets the user id of the logged in user

  **/

  setUserId(user_id:number) {

    let that = this;

    var user_promise = new Promise(function (resolve, reject) {
      localForage.setItem('user_id', user_id).then (function () {
        return that.getUserId();
      }).then (function (user_id:number) {
        resolve(user_id)
      }).catch (function (err) {
        reject(err);
      });
    })

    return user_promise;

  }

  /**

  getUserId()

  ;; Gets the current user id of the logged in user

  **/

  getUserId() {

    var user_promise = new Promise(function (resolve, reject) {

      localForage.getItem('user_id').then (function (value) {
        resolve(value);
      }).catch (function (err) {
        reject(err);
      })

    })

    return user_promise;

  }

  /**
  userLoggedIn()
  ;; checks if user 'logged in'
  **/

  userLoggedIn() {

    let that = this;

    var user_logged_in = new Promise(function (resolve, reject) {

      that.getUserId().then (function (value) {

        if (value == null) {
          resolve(false);
        }else if (typeof(value) == "number")){
          resolve(true);
        }

      }).catch (function (err) {
        reject(err);
      })

    })

    return user_logged_in

  }

  /**

  clearUser()
  ;; 'clears' the user value to null in the database
  ;; effectively 'logs out' the user

  **/

  clearUser() {

    let that = this;

    var user_promise = new Promise(function (resolve, reject) {

      localForage.setItem("user_id", null).then (function () {
        return that.getUserId();
      }).then (function (value) {
        resolve(value);
      }).catch (function (err) {
        reject(err);
      })

    })

    return user_promise;

  }

}
