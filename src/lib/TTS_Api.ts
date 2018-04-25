//Adding HTTP (AJAX) for Backend API interaction
import {HttpClient, HttpHeaders} from '@angular/common/http';

//Establishing API Stuff
import {Injectable} from '@angular/core';

//Import models for parsing
import {Textbook} from '../models/textbook';
import {Offer} from '../models/offer';
import {Book} from '../models/book';
import {Manufacturer} from '../models/manufacturer';
import {PendingOffer} from '../models/pendingoffer';
import {User} from '../models/user';

//Import rxjs helpers for API
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//Get the Backend API endpoint (URL)
import endpoint from './Endpoint';

/**

TTS_API.ts

This is utility libarary that makes interfacing with the textbookio backend much simpler for
development purposes

each request is initially a http request which recieves raw data. This raw JSON data is then converted into
the corresponding TypeScript Objects for rendering

**/

@Injectable()
export class TextbookTradeSystemApi {

  //Simple constructor to inject http
  constructor(private http: HttpClient) {

  }

  //Function that returns HTTP Request Headers neccessary for authenticating api requests
  private authHeaders(user_auth: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': user_auth
      })
    }

    return httpOptions;
  }

  //function responsible for parsing raw manufacturer JSON responses into the Manufacturer model
  private parseRawManufacturer(item: any) {

    return <Manufacturer> {
      id: Number(item["id"]),
      name: item["name"],
      description: item["description"]
    }

  }

  /** Retrieves a specific manufacturer object by its id in the form of a Async JavaScript Promise **/
  public getManufacturerById(manufacturer_id: number) {

    let that = this;

    var manufacturer_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/manufacturers" + "/" + manufacturer_id)
        .toPromise()
        .then(function (item: any) {
          var manufacturer: Manufacturer = that.parseRawManufacturer(item);

          resolve(manufacturer)
        }).catch(function (err) {
        reject(err)
      })
    })

    return manufacturer_promise;

  }

  /**
    Retrieves a specific manufacturer by its publisher_name
    result is parsed to Manufacturer object
    Mostly used for checking if a publisher is already in the system
  **/
  public getManufacturerByName(manufacturer_name:string) {

    let that = this;

    var manufacturer_promise = new Promise (function (resolve, reject) {

      that.http.get(endpoint + "/manufacturers/get-existing-manufacturer" + "?name=" + manufacturer_name)
        .toPromise()
        .then (function (rawManufacturer:any) {

          if (rawManufacturer == null) {
              //TEMP
              console.log("manufacturer does not exist yet");
              resolve(undefined);
          }else {
            console.log(rawManufacturer);
            var manufacturer:Manufacturer = that.parseRawManufacturer(rawManufacturer);
            resolve(manufacturer)
          }

        }).catch (function (err) {
          reject(err);
        })

    })

    return manufacturer_promise;

  }

  //Function retrieves all the manufacturers from the backend database
  public getManufacturers() {

    let that = this;

    var manufacturer_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/manufacturers")
        .toPromise()
        .then(function (res) {
          var manufacturers: Manufacturer[] = (<any[]>res).map(function (item: any) {

            return that.parseRawManufacturer(item);

          })

          resolve(manufacturers)
        }).catch(function (err) {
        reject(err)
      })
    })

    return manufacturer_promise;

  }

  /**
    Function creates a new manufacturer on the backend.
    - requires authentication in form of auth_token
    - requires a partially completed manufacturer object
  **/
  public createManufacturer(manufacturer:Manufacturer, authToken:string) {

    let that = this;

    let manufacturer_payload:any = Manufacturer.getManufacturerPayload(manufacturer);

    const httpOptions = this.authHeaders(authToken);

    var create_manufacturer_promise = new Promise (function (resolve, reject) {
      that.http.post(endpoint + "/manufacturers", manufacturer_payload, httpOptions)
        .toPromise()
        .then (function (rawManufacturer:any) {

          var new_manufacturer:Manufacturer = that.parseRawManufacturer(rawManufacturer);
          resolve(new_manufacturer);

        }).catch (function (err) {
          reject(err);
        })
    })

    return create_manufacturer_promise;

  }

  /**
  function used to parse raw JSON Book responses into TypeScript Book objects
  **/
  private parseRawBook(item: any) {

    return <Book>{
      id: Number(item["id"]),
      ISBN: item["ISBN"],
      title: item["title"],
      cover_image_link: item["cover_image_link"],
      description: item["description"],
      manufacturer_id: item["manufacturer_id"]
    }

  }

  //Retrieve book by book_id via the backend api
  public getBookById(book_id: number) {

    let that = this;

    var book_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/books" + '/' + book_id)
        .toPromise()
        .then(function (bookItem: any) {

          var book: Book = that.parseRawBook(bookItem);

          resolve(book)
        }).catch(function (err) {
        reject(err);
      })
    })

    return book_promise;

  }

  /**
    Retrieve all the books
    - parsed to corresponding Book TypeScript Objects
  **/
  public getBooks() {

    let that = this;

    var book_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/books")
        .toPromise()
        .then(function (res) {

          var books: Book[] = (<any[]>res).map(function (item) {
            return that.parseRawBook(item);
          })

          resolve(books)
        }).catch(function (err) {
        reject(err);
      })
    })

    return book_promise;

  }

  /**
  function written to parse raw book info from google books api into a
  usable format
  **/

  private processBookInfo(json: object) {
    const book = json["volumeInfo"];

    const bookInfo = {
      title: book["title"],
      ISBN: book["industryIdentifiers"][0]["identifier"],
      authors: book["authors"],
      publisher: book["publisher"],
      publishedDate: book["publishedDate"],
      description: book["description"],
      thumbnailLink: book["imageLinks"]["thumbnail"]
    };

    return bookInfo;
  }

  /**
  retrieves book data through the google books api
  - takes in an ISBN number as a parameter
  **/
  public getBookInfoFromIsbn(isbn: number) {
    const googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes?q=';
    const that = this;

    return new Promise(function (resolve, reject) {
      that.http.get(googleBooksEndpoint + isbn)
        .toPromise()
        .then(function (res) {
          resolve(that.processBookInfo(res["items"][0]));
        })
        .catch(function (err) {
          reject(err);
        });
    });

  }

  /**
    - retrieves a list of books as raw_book_data JSON
    - parsed via processBookInfo
    - takes in any string query as a parameter
  **/
  public getBooksInfoFromQuery(query: string) {
    const googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes?q=';
    const that = this;

    return new Promise(function (resolve, reject) {
      that.http.get(googleBooksEndpoint + query)
        .toPromise()
        .then(function (res) {
          resolve(res["items"].map(that.processBookInfo));
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  /**
  function created in order to parse google books api book data into TypeScript Book Objects
  - it also insures that the book object has a existing manufacturer to reference to
    ** IF NOT, it creates a new manufacturer
  - requires bookInfo JSON that were parsed via processBookInfo
  - requires authentication via authToken
  **/
  public parseBookInfo(bookInfo:any, authToken:string) {

    let that = this;

    var book_promise = new Promise(function (resolve, reject) {

      that.getManufacturerByName(bookInfo["publisher"]).then (function (manufacturer) {

        if (manufacturer == undefined) {
          console.log("NEW manufacturer must be created!");
          var tempManufacturer = <Manufacturer> {
            name: bookInfo["publisher"],
            description: ""
          }
          return that.createManufacturer(tempManufacturer, authToken);
        }else {
          return manufacturer;
        }

      }).then (function (manufacturer: Manufacturer) {

        var book = <Book> {
            ISBN: bookInfo["ISBN"],
            title: bookInfo["title"],
            description: bookInfo["description"],
            manufacturer_id: manufacturer.id,
            cover_image_link: bookInfo["thumbnailLink"]
        }

        resolve(book);


      }).catch (function (err) {
        reject(err);
      })




    })

    return book_promise;

  }

  /**
    Creates a new Book on the textrade backend
    - requires authentication via a auth_token
  **/
  public createBook(new_book: Book, authToken) {

    var book_payload = Book.getBookPayload(new_book);

    const httpOptions = this.authHeaders(authToken);

    let that = this;

    var create_book_promise = new Promise(function (resolve, reject) {

      that.http.post(endpoint + "/books", book_payload, httpOptions)
        .toPromise()
        .then(function (item: any) {
          var book: Book = <Book> {
            id: Number(item["id"]),
            ISBN: item["ISBN"],
            title: item["title"],
            description: item["description"],
            manufacturer_id: item["manufacturer_id"]
          }

          console.log("CREATED BOOK");
          resolve(book);
        }).catch(function (err) {
        reject(err);
      })
    });

    return create_book_promise;

  }

  /**
    - parses a raw user json from the backend db
    - converts to User TypeScript Object
  **/
  private parseRawUser(item: any) {

    return <User> {
      id: item["id"],
      first_name: item["first_name"],
      last_name: item["last_name"],
      email: item["email"],
      phone_number: item["phone_number"]
    }
  }

  /**
    Creates new user via backend api
    - requires User TypeScript object
  **/
  public newUser(user: User) {

    var new_user_payload = User.getNewUserPayload(user);

    let that = this;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    var user_promise = new Promise(function (resolve, reject) {
      that.http.post(endpoint + '/users', new_user_payload, httpOptions)
        .toPromise()
        .then(function (res: any) {

          if (res["status"] == "unable to save new user") {
            resolve(user)
          } else {
            console.log(res);

            var new_user: User = that.parseRawUser(res);
            new_user.user_token = user.user_token;
            resolve(new_user);
          }

        }).catch(function (err) {
        reject(err);
      })
    })

    return user_promise;

  }

  /**
    returns the user_auth_token for a specific user

    requires the
    -email
    -password

    of the user that is being authenticated

  **/
  public userAuth(user: User) {

    var email = user["email"];
    var password = user["user_token"]

    let that = this

    var auth_payload = {
      "email": email,
      "password": password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    var authentication_promise = new Promise(function (resolve, reject) {

      that.http.post(endpoint + "/authenticate", auth_payload, httpOptions)
        .toPromise()
        .then(function (res: any) {

          var authToken = res["auth_token"]
          resolve(authToken);

        }).catch(function (err) {
        reject(err);
      })
    })

    return authentication_promise;

  }

  /**
    returns the current authenticated user through the auth token provided
    also used to verify validity of auth token
  **/
  public getAuthUser(authToken: string) {

    let that = this;


    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authToken
      })
    }

    var auth_user_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + "/authenticated-user", httpOptions)
        .toPromise()
        .then(function (res: any) {

          var auth_user: User = that.parseRawUser(res);
          auth_user.authToken = authToken;
          resolve(auth_user);
        })
        .catch(function (err) {
          reject(err);
        })

    })

    return auth_user_promise;

  }

  /**
    function that updates authenticated user with new user info
    - Sends api request to main rails backend server
    - requires the user auth token
  **/
  public updateAuthUser(authUser: User, authToken: string) {

    let that = this;

    const httpOptions = this.authHeaders(authToken);

    var update_user_payload = User.getUserPayload(authUser);

    var update_auth_user_promise = new Promise(function (resolve, reject) {

      that.http.put(endpoint + "/update-authenticated-user", update_user_payload, httpOptions)
        .toPromise()
        .then(function (item: any) {

          var updated_auth_user: User = that.parseRawUser(item);
          resolve(updated_auth_user);

        }).catch(function (err) {
        reject(err);
      })

    })

    return update_auth_user_promise;

  }

  /**
    Retrieves a list of all the users via the backend api
  **/
  public getUsers() {

    let that = this;

    var get_user_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/users')
        .toPromise()
        .then(function (res) {
          var users: User[] = (<any[]>res).map(function (rawItem: any) {
            return that.parseRawUser(rawItem);
          })

          resolve(users);
        }).catch(function (err) {
        reject(err);
      })

    })

    return get_user_promise

  }

  /**
    Gets a specific user via the user's id
    - Requests to the default rails backend server
  **/
  public getUserById(user_id: number) {
    let that = this;

    var get_user_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/users/' + user_id.toString())
        .toPromise()
        .then(function (rawItem: any) {
          var user: User = that.parseRawUser(rawItem);
          resolve(user);
        }).catch(function (err) {
        reject(err);
      })

    })

    return get_user_promise
  }

  /**
  Function that parses raw pending offer JSON from the backend server
  - converts to PendingOffer TypeScript object
  **/
  public parseRawPendingOffer(item: any) {

    return <PendingOffer> {
      id: Number(item["id"]),
      offer_id: Number(item["offer_id"]),
      buyer_id: Number(item["buyer_id"])
    }

  }


  /**
    Deletes the specified pending offer
    - requires authToken verification
    NOTE future checks may need to implemented in later versions
  **/
  public deletePendingOffer(pending_offer_id: number, authToken: string) {

    let that = this;

    const httpOptions = that.authHeaders(authToken);

    var delete_pending_offer_promise = new Promise(function (resolve, reject) {

      that.http.delete(endpoint + '/pendingoffers' + '/' + pending_offer_id, httpOptions)
        .toPromise()
        .then(function (res) {

          resolve(res);

        }).catch(function (err) {
        reject(err);
      })

    })

    return delete_pending_offer_promise;

  }

  /**
  Function that returns a PendingOffer object by its specified id
  interacts with the main application backend
  **/

  public getPendingOfferById(pendingoffer_id: number) {

    let that = this;

    var pending_offer_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/pendingoffers' + '/' + pendingoffer_id.toString())
        .toPromise()
        .then(function (item: any) {

          var pending_offer: PendingOffer = that.parseRawPendingOffer(item);

          resolve(pending_offer);

        }).catch(function (err) {
        reject(err);
      })

    })

    return pending_offer_promise;

  }

  /**
  Function that returns list of all PendingOffer objects from the rails backend db
  **/
  public getPendingOffers() {

    let that = this;

    var pending_offer_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/pendingoffers')
        .toPromise()
        .then(function (res) {

          var items: any[] = (<any[]>res);

          var pending_offers: PendingOffer[] = items.map(function (item: any) {
            return that.parseRawPendingOffer(item);
          })

          resolve(pending_offers);

        }).catch(function (err) {
        reject(err);
      })

    })

    return pending_offer_promise;

  }

  /**
  Function that returns a list of all the PendingOffers
  that have been requested for a specific seller
  **/

  public getBuyerPendingOffers(seller_id: number) {
    let that = this;

    var pending_offer_promise = new Promise(function (resolve, reject) {

      var offer_ids: number[] = [];

      that.getUserOffers(seller_id).then(function (offers: Offer[]) {

        console.log("User Offers")
        console.log(offers);

        offer_ids = offers.map(function (offer: Offer) {
          return offer.id;
        })

        return that.getPendingOffers();

      }).then(function (pendingoffers: PendingOffer[]) {

        console.log(offer_ids);
        var filtered_pending_offers: PendingOffer[] = pendingoffers.filter(function (pending_offer: PendingOffer) {
          return offer_ids.includes(pending_offer.offer_id);
        })

        resolve(filtered_pending_offers);

      }).catch(function (err) {
        reject(err);
      })

    })

    return pending_offer_promise;

  }

  /**
  function that returns a list of PendingOffer objects from the backend
  these are the pendingoffers that the user has requested to sellers (The one they want to buy (text)books from
  **/
  public getSellerPendingOffers(buyer_id: number) {

    let that = this;

    var pending_offer_promise = new Promise(function (resolve, reject) {

      that.getPendingOffers().then(function (pendingoffers: PendingOffer[]) {
        var filtered_pending_offers = pendingoffers.filter(function (pending_offer: PendingOffer) {
          return pending_offer.buyer_id == buyer_id;
        })

        resolve(filtered_pending_offers);
      }).catch(function (err) {
        reject(err);
      })

    })

    return pending_offer_promise;

  }

  /**
  Function that creates a pending textbook offer between two users and a textbook
  - Requires to the backend api
  - requires authentication via auth token
  **/
  public createPendingOffer(pending_offer: PendingOffer, authToken: string) {

    let that = this;

    const httpOptions = that.authHeaders(authToken);

    var pendingOfferPayload = PendingOffer.getPendingOfferPayload(pending_offer);


    var pending_offer_promise = new Promise(function (resolve, reject) {
      that.http.post(endpoint + "/pendingoffers", pendingOfferPayload, httpOptions)
        .toPromise()
        .then(function (item: any) {
          var created_pending_offer: PendingOffer = that.parseRawPendingOffer(item);
          resolve(created_pending_offer);
        }).catch(function (err) {
        reject(err);
      })
    })

    return pending_offer_promise;

  }

  /**
  function that parses raw textbook json from backend db to beautiful Textbook TypeScript Objects
  **/

  public parseRawTextbook(item: any) {

    return <Textbook>{
      id: Number(item["id"]),
      name: item["textbook_title"],
      book_id: item["book_id"],
      user_id: item["user_id"],
      status: item["status"],
      is_public: item["is_public"],
      owner_description: item["owner_description"]
    }

  }

  /**
  function that returns a Textbook Object by its specified id
  - interacts with backend
  **/
  public getTextbookById(textbook_id: number) {

    let that = this;

    var textbook_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/textbooks' + '/' + textbook_id)
        .toPromise()
        .then(function (item: any) {
          var textbook: Textbook = that.parseRawTextbook(item);
          resolve(textbook);
        }).catch(function (err) {
        reject(err);
      })

    })

    return textbook_promise;

  }

  /**
  Retrieves list of all textbooks from backend
  - interacts with backend api
  **/
  public getTextbooks() {

    let that = this;

    var textbook_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/textbooks")
        .toPromise()
        .then(function (res) {

          var textbooks: Textbook[] = (<any[]>res).map(function (item) {
            return that.parseRawTextbook(item);
          })

          resolve(textbooks)
          console.log(textbooks);
        }).catch(function (err) {
        reject(err);
      })
    })

    return textbook_promise;

  }

  /**
  Function that deletes a specified textbook by its id
  requires a authToken for verification
  **/
  public deleteTextbook(textbook_id: number, authToken: string) {
    let that = this;

    const httpOptions = that.authHeaders(authToken);

    var delete_textbook_promise = new Promise(function (resolve, reject) {
      that.http.delete(endpoint + "/textbooks" + "/" + textbook_id, httpOptions)
        .toPromise()
        .then(function (res) {

          resolve(res);

        }).catch(function (err) {
        reject(err);
      })
    })

    return delete_textbook_promise;
  }

  /**
  Function that updates a specific textbook
  - requires textbook new data
  - requires auth token for authentication
  - Interacts with backend
  **/

  public updateTextbook(updated_textbook: Textbook, authToken: string) {

    let that = this;

    var textbook_id: number = updated_textbook.id;

    var textbook_payload = Textbook.getTextbookPayload(updated_textbook);

    const httpOptions = that.authHeaders(authToken);

    var update_textbook_promise = new Promise(function (resolve, reject) {

      that.http.put(endpoint + '/textbooks' + '/' + textbook_id, textbook_payload, httpOptions)
        .toPromise()
        .then(function (item: any) {
          var updated_textbook: Textbook = that.parseRawTextbook(item);
          resolve(updated_textbook);
        }).catch(function (err) {
        reject(err);
      })
    })

    return update_textbook_promise;

  }


  /**
  Function responsible for retrieving all the textbooks associated with a specific user
  - requires the id of said user
  **/
  public getUserTextbooks(user_id: number) {

    let that = this;

    var textbook_promise = new Promise(function (resolve, reject) {

      that.getTextbooks().then(function (textbooks: Textbook[]) {
        var filtered_textbooks: Textbook[] = textbooks.filter(function (textbook: Textbook) {
          return textbook.user_id == user_id;
        })

        resolve(filtered_textbooks);
      }).catch(function (err) {
        reject(err);
      })

    })

    return textbook_promise;


  }

  /**
  Function responsible for creating a new textbook
  - requires:
    - textbook data
    - auth token for authentication
  **/
  public createTextbook(new_textbook: Textbook, authToken: string) {
    var textbook_payload = Textbook.getTextbookPayload(new_textbook);

    const httpOptions = this.authHeaders(authToken);

    let that = this;

    var create_textbook_promise = new Promise(function (resolve, reject) {

      that.http.post(endpoint + "/textbooks", textbook_payload, httpOptions)
        .toPromise()
        .then(function (item: any) {
          var textbook: Textbook = <Textbook> {
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
        }).catch(function (err) {
        reject(err);
      })
    });

    return create_textbook_promise;
  }

  /**
  parses raw offer JSON from backend to Offer TypeScript Object
  **/
  private parseRawOffer(item: any) {

    return <Offer>{
      id: Number(item["id"]),
      textbook_id: item["textbook_id"],
      price: Number(item["price"])
    }

  }

  /**
  Deletes a specified Offer from the database
  - requires offer id
  - requires auth token for auth.
  **/
  public deleteOffer(offer_id: number, authToken: string) {
    let that = this;

    const httpOptions = that.authHeaders(authToken);

    var delete_offer_promise = new Promise(function (resolve, reject) {
      that.http.delete(endpoint + "/offers" + "/" + offer_id, httpOptions)
        .toPromise()
        .then(function (res) {

          resolve(res);

        }).catch(function (err) {
        reject(err);
      })
    })

    return delete_offer_promise;
  }

  /**
  Retrieves a list of all Offers from the backend db
  - parsed to Offer TypeScript objects
  **/
  public getOffers() {

    let that = this;

    var offer_promise = new Promise(function (resolve, reject) {
      that.http.get(endpoint + "/offers")
        .toPromise()
        .then(function (res) {

          var offers: Offer[] = (<any[]>res).map(function (item: any) {
            return that.parseRawOffer(item)
          })

          console.log(offers);
          resolve(offers);

        }).catch(function (err) {
        reject(err);
      })
    })

    return offer_promise;

  }

  /**
  Get a specific Offer by its id
  - No auth neccessary
  **/
  public getOfferById(offer_id: number) {

    let that = this;

    var offer_promise = new Promise(function (resolve, reject) {

      that.http.get(endpoint + '/offers' + '/' + offer_id)
        .toPromise()
        .then(function (item: any) {

          var retrieved_offer: Offer = that.parseRawOffer(item);
          resolve(retrieved_offer);

        }).catch(function (err) {
        reject(err);
      })

    })

    return offer_promise;

  }

  /**
  function that updates User Offer.
  - requires new offer data
  - requires auth token for authentication
  **/
  public updateOffer(updated_offer: Offer, authToken: string) {

    let that = this;

    const httpOptions = that.authHeaders(authToken);

    var offer_id = updated_offer.id;

    var updated_offer_payload = Offer.getOfferPayload(updated_offer);

    var update_offer_promise = new Promise(function (resolve, reject) {

      that.http.put(endpoint + '/offers' + '/' + offer_id, updated_offer_payload, httpOptions)
        .toPromise()
        .then(function (item: any) {

          var updated_offer_res = that.parseRawOffer(item);
          resolve(updated_offer_res);

        }).catch(function (err) {
        reject(err);
      })


    })

    return update_offer_promise;

  }

  /**
  Function that creates a new offer for a textbook on the backend
  - requires a auth token
  **/
  public createOffer(offer: Offer, authtoken: string) {

    let that = this;

    const httpOptions = that.authHeaders(authtoken);

    var offer_payload = Offer.getOfferPayload(offer);

    var offer_promise = new Promise(function (resolve, reject) {
      that.http.post(endpoint + "/offers", offer_payload, httpOptions)
        .toPromise()
        .then(function (item: any) {

          var offer_res: Offer = <Offer> {
            id: Number(item["id"]),
            textbook_id: item["textbook_id"],
            price: Number(item["price"])
          }

          resolve(offer_res);

        }).catch(function (err) {
        reject(err)
      })
    })

    return offer_promise;

  }

  /**
  Function that retrieves all the offers associated with a specific user
  - requires only user_id
  **/
  public getUserOffers(user_id: number) {

    let that = this;

    var offer_promise = new Promise(function (resolve, reject) {

      var textbook_ids: Number[] = [];

      that.getUserTextbooks(user_id).then(function (pulled_textbooks: Textbook[]) {
        pulled_textbooks.map(function (textbook: Textbook) {
          textbook_ids.push(textbook.id);
        })
        return that.getOffers()
      }).then(function (offers: Offer[]) {

        console.log("MEH")

        var filtered_offers: Offer[] = offers.filter(function (offer: Offer) {
          return textbook_ids.includes(offer.textbook_id);
        })

        resolve(filtered_offers);

      }).catch(function (err) {
        reject(err);
      })

    })

    return offer_promise;

  }

}
