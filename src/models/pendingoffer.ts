export class PendingOffer {

  id:number

  offer_id:number
  buyer_id:number

  constructor() {}

  /**
    createEmptyPendingOffer()

    ;; This method creates a empty pending offer as a skeleton

  **/
  static createEmptyPendingOffer() {

    return <PendingOffer> {
      id:null,
      offer_id: null,
      buyer_id: null
    }

  }

  /**

  offer_id: The id of the textbook offer
  buyer_id: The id of the user who would like to purchase said offer with its benefits (textbook, advice, etc)

  **/
  static createPendingOffer(offer_id:number, buyer_id:number) {

    var new_pending_offer:PendingOffer = PendingOffer.createEmptyPendingOffer();

    new_pending_offer.offer_id = offer_id;
    new_pending_offer.buyer_id = buyer_id;

    return new_pending_offer;

  }

  /**

  getPendingOfferPayload()

  ;; This method parses the model to its respective payload form
  ;; with the payload form (JSON in this case) the data can then be
  ;; sent to the backend for storage and business logic in TextbookTradeSystemApi
  
  **/

  static getPendingOfferPayload(pendingoffer:PendingOffer) {

    return {
      pendingoffer: {
        offer_id: pendingoffer.offer_id,
        buyer_id: pendingoffer.buyer_id
      }
    };

  }

}
