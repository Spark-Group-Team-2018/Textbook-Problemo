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

  static getOfferPayload(offer:Offer) {

    return {
      offer: {
        lat: offer.lat,
        lon: offer.lon,
        price: offer.price,
        is_public: offer.is_public,
        textbook_id: offer.textbook_id
      }
    }

  }

}
