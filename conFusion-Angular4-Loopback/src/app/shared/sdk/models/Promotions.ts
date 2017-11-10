/* tslint:disable */

declare var Object: any;
export interface PromotionsInterface {
  "name": string;
  "image": string;
  "label": string;
  "price": string;
  "description": string;
  "featured": boolean;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Promotions implements PromotionsInterface {
  "name": string;
  "image": string;
  "label": string;
  "price": string;
  "description": string;
  "featured": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: PromotionsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Promotions`.
   */
  public static getModelName() {
    return "Promotions";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Promotions for dynamic purposes.
  **/
  public static factory(data: PromotionsInterface): Promotions{
    return new Promotions(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Promotions',
      plural: 'Promotions',
      path: 'Promotions',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "image": {
          name: 'image',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string',
          default: '""'
        },
        "price": {
          name: 'price',
          type: 'string',
          default: '"0"'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "featured": {
          name: 'featured',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
