export class Offer {

  id:number
  textbook_id:number
  textbook_name:string
  price:number

  static createEmptyOffer () {
    return <Offer>{textbook_name: "", price: 0}
  }

}
