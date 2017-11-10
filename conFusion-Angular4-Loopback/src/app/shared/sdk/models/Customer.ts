/* tslint:disable */
import {
  Comments,
  Favorites
} from '../index';

declare var Object: any;
export interface CustomerInterface {
  "firstname"?: string;
  "lastname"?: string;
  "image"?: string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "password"?: string;
  accessTokens?: any[];
  comments?: Comments[];
  favorites?: Favorites[];
}

export class Customer implements CustomerInterface {
  "firstname": string;
  "lastname": string;
  "image": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  "password": string;
  accessTokens: any[];
  comments: Comments[];
  favorites: Favorites[];
  constructor(data?: CustomerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Customer`.
   */
  public static getModelName() {
    return "Customer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Customer for dynamic purposes.
  **/
  public static factory(data: CustomerInterface): Customer{
    return new Customer(data);
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
      name: 'Customer',
      plural: 'Customers',
      path: 'Customers',
      idName: 'id',
      properties: {
        "firstname": {
          name: 'firstname',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "image": {
          name: 'image',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        comments: {
          name: 'comments',
          type: 'Comments[]',
          model: 'Comments',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'customerId'
        },
        favorites: {
          name: 'favorites',
          type: 'Favorites[]',
          model: 'Favorites',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'customerId'
        },
      }
    }
  }
}
