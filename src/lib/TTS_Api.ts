//Adding HTTP (AJAX) for Backend API interaction
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//Establishing API Stuff
import {Injectable} from '@angular/core';

//Import models for parsing
import {Textbook} from '../models/textbook';
import {Offer} from '../models/offer';
import {Book} from '../models/book';
import {Manufacturer} from '../models/manufacturer';
import {User} from '../models/user';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//Get the API endpoint (URL)
import endpoint from './Endpoint';

@Injectable()
export class TextbookTradeSystemApi {

  constructor(private http:HttpClient) {

  }


  //Retrieve all da manufacturers
  public getManufacturers() {

    let that = this;

    var manufacturer_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/manufacturers")
        .toPromise()
        .then (function (res) {
          var manufacturers:Manufacturer[] = (<any[]>res).map(function (item) {

            return <Manufacturer> {
              id: Number(item["id"]),
              name: item["name"],
              description: item["description"]
            }

          })

          resolve(manufacturers)
        }).catch (function (err) {
          reject(err)
        })
    })

    return manufacturer_promise;

  }

  //Retrieve all da book
  public getBooks() {

    let that = this;

    var book_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/books")
        .toPromise()
        .then (function (res) {

          var books:Book[] = (<any[]>res).map(function (item) {
            return <Book>{
              id: Number(item["id"]),
              ISBN: item["ISBN"],
              title: item["title"],
              description: item["description"],
              manufacturer_id: item["manufacturer_id"]
            }
          })

          resolve(books)
        }).catch (function (err) {
          reject(err);
        })
    })

    return book_promise;

  }

  //Create a book
  public createBook(new_book:Book) {

    var book_payload = Book.getBookPayload(new_book);

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    let that = this;

    var create_book_promise = new Promise (function (resolve, reject) {

      that.http.post(endpoint + "/books", book_payload, httpOptions)
        .toPromise()
        .then (function (item:any) {
          var book:Book = <Book> {
            id: Number(item["id"]),
            ISBN: item["ISBN"],
            title: item["title"],
            description: item["description"],
            manufacturer_id: item["manufacturer_id"]
          }

          console.log("CREATED BOOK");
          resolve(book);
        }).catch (function (err) {
          reject(err);
        })
    });

    return create_book_promise;

  }

  //User functions
  public parseRawUser(item:any) {

    return <User> {
      id: item["id"],
      first_name: item["first_name"],
      last_name: item["last_name"],
      email: item["email"]
    }
  }

  public getUsers() {

    let that = this;

    var get_user_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/users')
        .toPromise()
        .then (function (res) {
          var users:User[] = (<any[]>res).map(function (rawItem:any) {
            return that.parseRawUser(rawItem);
          })

          resolve(users);
        }).catch (function (err) {
          reject(err);
        })

    })

    return get_user_promise

  }

  public getUserById(user_id:number) {
    let that = this;

    var get_user_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/users/' + user_id.toString())
        .toPromise()
        .then (function (rawItem:any) {
          var user:User = that.parseRawUser(rawItem);
          resolve(user);
        }).catch (function (err) {
          reject(err);
        })

    })

    return get_user_promise
  }


  public getUserPendingOffers() {

  }

  //FIXME Do with real data and model
  public getUserTextbooks() {

    let that = this;

    var textbook_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/textbooks")
        .toPromise()
        .then (function (res) {

          var textbooks:Textbook[] = (<any[]>res).map(function (item) {
            return <Textbook>{
              id: Number(item["id"]),
              name: item["textbook_title"],
              book_id: item["book_id"],
              user_id: item["user_id"],
              status: item["status"],
              is_public: item["is_public"],
              owner_description: item["owner_description"]
            }
          })

          resolve(textbooks)
          console.log(textbooks);
        }).catch (function (err) {
          reject(err);
        })
    })

    return textbook_promise;

  }

  //Create a new textbook
  public createTextbook(new_textbook:Textbook) {
    var textbook_payload = Textbook.getTextbookPayload(new_textbook);

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    let that = this;

    var create_textbook_promise = new Promise (function (resolve, reject) {

      that.http.post(endpoint + "/textbooks", textbook_payload, httpOptions)
        .toPromise()
        .then (function (item:any) {
          var textbook:Textbook = <Textbook> {
            id: Number(item["id"]),
            name: item["textbook_title"],
            book_id: item["book_id"],
            user_id: item["user_id"],
            status: item["status"],
            is_public: item["is_public"],
            owner_description: item["owner_description"]
          }

          console.log("CREATED TEXTBOOK");
          resolve(textbook);
        }).catch (function (err) {
          reject(err);
        })
    });

    return create_textbook_promise;
  }


  //FIXME Do with real data and model
  public getUserOffers() {

    let that = this;

    var offer_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/offers")
        .toPromise()
        .then (function (res) {

          var offers:Offer[] = (<any[]>res).map(function (item) {
            return <Offer>{
              id: Number(item["id"]),
              textbook_id: item["textbook_id"],
              price: Number(item["price"])
            }
          })

          console.log(offers);
          resolve(offers);

        }).catch (function (err) {
          reject(err);
        })
    })

    return offer_promise;

  }

}
