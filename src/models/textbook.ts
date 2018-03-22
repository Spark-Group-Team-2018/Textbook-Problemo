export class Textbook {

  id:number
  name:string

  book_id:number
  user_id:number
  status:string
  owner_description:string
  is_public:boolean

  static createEmptyTextbook() {
      //Change User id part
      return <Textbook> {book_id: null, user_id: null, status: "", owner_description: "", is_public: true}
  }

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
