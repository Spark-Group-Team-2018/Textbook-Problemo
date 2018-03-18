//Adding HTTP (AJAX) for Backend API interaction
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//Establishing API Stuff
import {Injectable} from '@angular/core';

//Import models for parsing
import {Textbook} from '../models/textbook';
import {Offer} from '../models/offer';
import {Book} from '../models/book';

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
              description: item["owner_description"]
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

  //FIXME Do with real data and model
  getUserOffers() {

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
