import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Contact extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minlength: 3,
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,

    jsonSchema: {
      unique: [true, ' Must Be Unique'],
    },
  })
  phoneNumber: string;

  constructor(data?: Partial<Contact>) {
    super(data);
  }
}

export interface ContactRelations {
  // describe navigational properties here
}

export type ContactWithRelations = Contact & ContactRelations;
