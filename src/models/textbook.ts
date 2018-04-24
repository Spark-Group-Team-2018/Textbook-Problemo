// Textbook model

export class Textbook {

  //Textbook fields
  id:number
  name:string

  book_id:number
  user_id:number
  status:string
  owner_description:string
  is_public:boolean

  //creates an empty textbook object for textbook creation

  static createEmptyTextbook() {
      //Change User id part
      return <Textbook> {book_id: null, user_id: null, status: "", owner_description: "", is_public: true}
  }


  //Gets the textbook payload for backend interaction
  static getTextbookPayload(textbook:Textbook) {

    return {
      textbook: {
        book_id: textbook.book_id,
        user_id: textbook.user_id,
        status: textbook.status,
        owner_description: textbook.owner_description,
        is_public: textbook.is_public
      }
    }

  }

}
