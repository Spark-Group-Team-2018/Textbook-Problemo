export class Textbook {

  name:string
  description:string

  static createEmptyTextbook() {
      return <Textbook> {name: "", description: ""}
  }

}
