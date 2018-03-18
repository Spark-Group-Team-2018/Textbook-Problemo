export class Textbook {

  id:number
  name:string

  book_id:number
  user_id:number
  status:string
  owner_description:string
  is_public:boolean

  static createEmptyTextbook() {
      return <Textbook> {book_id: null, user_id: null, status: "", owner_description: "", is_public: true}
  }

}
