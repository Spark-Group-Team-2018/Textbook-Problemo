export class Offer {

  textbook_name:string
  price:number

  static createEmptyOffer () {
    return <Offer>{textbook_name: "", price: 0}
  }

}
