export class Book {

  id:number
  ISBN:number
  title:string
  description:string
  manufacturer_id:number
  cover_image_link:string

  constructor() {

  }

  static getBookPayload(book: Book) {
    return {
      book: {
        ISBN: book["ISBN"],
        title: book["title"],
        description: book["description"],
        manufacturer_id: book["manufacturer_id"],
        cover_image_link: book["cover_image_link"]
      }
    }
  }

  static createEmptyBook() {

    return <Book> {
      id: null,
      ISBN: null,
      title: "",
      description: "",
      manufacturer_id: 1,
      cover_image_link: ""
    }

  }

}
