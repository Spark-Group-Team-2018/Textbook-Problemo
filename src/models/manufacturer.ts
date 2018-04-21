export class Manufacturer {

  id:number
  name:string
  description:string


  constructor() {

  }

  static getManufacturerPayload(manufacturer:Manufacturer) {

    return {
      manufacturer: {
        name: manufacturer.name,
        description: manufacturer.description
      }
    }

  }

}
