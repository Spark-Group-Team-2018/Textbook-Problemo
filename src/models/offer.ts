export class Offer {

  id:number
  textbook_id:number
  textbook_name:string
  price:number
  is_public:boolean
  lat:number
  lon:number

  static createEmptyOffer () {
    return <Offer>{textbook_id: null, price: 0.0, lat: 0, lon: 0, is_public: true}
  }

}
