/* tslint:disable */

declare var Object: any;
export interface LeadersInterface {
  "name": string;
  "image": string;
  "designation": string;
  "abbr": string;
  "description": string;
  "featured": boolean;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Leaders implements LeadersInterface {
  "name": string;
  "image": string;
  "designation": string;
  "abbr": string;
  "description": string;
  "featured": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: LeadersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Leaders`.
   */
  public static getModelName() {
    return "Leaders";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Leaders for dynamic purposes.
  **/
  public static factory(data: LeadersInterface): Leaders{
    return new Leaders(data);
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
      name: 'Leaders',
      plural: 'Leaders',
      path: 'Leaders',
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
        "designation": {
          name: 'designation',
          type: 'string'
        },
        "abbr": {
          name: 'abbr',
          type: 'string'
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
