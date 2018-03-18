export class Book {

  id:number
  ISBN:number
  title:string
  description:string
  manufacturer_id:number

  constructor() {

  }

  static createEmptyBook() {

    return <Book> {
      ISBN: null,
      title: ""
      description: ""
      manufacturer_id: null
    }

  }

}
