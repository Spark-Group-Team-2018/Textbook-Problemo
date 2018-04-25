// Manufacturer model

export class Manufacturer {

  //Manufacturer fields
  id:number
  name:string
  description:string


  constructor() {

  }

  //Get the payload necessary for the manufacturer to interact with the backend
  static getManufacturerPayload(manufacturer:Manufacturer) {

    return {
      manufacturer: {
        name: manufacturer.name,
        description: manufacturer.description
      }
    }

  }

}
