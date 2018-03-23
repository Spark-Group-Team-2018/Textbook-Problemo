export class PendingOffer {

  id:number

  offer_id:number
  buyer_id:number

  constructor() {}

  static getPendingOfferPayload(pendingoffer:PendingOffer) {

    return {
      pendingoffer: {
        offer_id: pendingoffer.offer_id,
        buyer_id: pendingoffer.buyer_id
      }
    };

  }

}
