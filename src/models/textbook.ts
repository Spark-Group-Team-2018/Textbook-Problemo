export class Textbook {

  id:number
  name:string
  description:string

  static createEmptyTextbook() {
      return <Textbook> {name: "", description: ""}
  }

}
