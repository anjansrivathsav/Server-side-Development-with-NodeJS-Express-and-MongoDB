/* tslint:disable */
import {
  Dishes,
  Customer
} from '../index';

declare var Object: any;
export interface CommentsInterface {
  "rating": number;
  "comment": string;
  "id"?: any;
  "dishesId"?: any;
  "customerId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  dishes?: Dishes;
  customer?: Customer;
}

export class Comments implements CommentsInterface {
  "rating": number;
  "comment": string;
  "id": any;
  "dishesId": any;
  "customerId": any;
  "createdAt": Date;
  "updatedAt": Date;
  dishes: Dishes;
  customer: Customer;
  constructor(data?: CommentsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Comments`.
   */
  public static getModelName() {
    return "Comments";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Comments for dynamic purposes.
  **/
  public static factory(data: CommentsInterface): Comments{
    return new Comments(data);
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
      name: 'Comments',
      plural: 'Comments',
      path: 'Comments',
      idName: 'id',
      properties: {
        "rating": {
          name: 'rating',
          type: 'number',
          default: 5
        },
        "comment": {
          name: 'comment',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "dishesId": {
          name: 'dishesId',
          type: 'any'
        },
        "customerId": {
          name: 'customerId',
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
        dishes: {
          name: 'dishes',
          type: 'Dishes',
          model: 'Dishes',
          relationType: 'belongsTo',
                  keyFrom: 'dishesId',
          keyTo: 'id'
        },
        customer: {
          name: 'customer',
          type: 'Customer',
          model: 'Customer',
          relationType: 'belongsTo',
                  keyFrom: 'customerId',
          keyTo: 'id'
        },
      }
    }
  }
}
