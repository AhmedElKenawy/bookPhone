export class contact {
  id: string;
  name: string;
  phoneNumber: string;

  constructor(contactRes: any) {
    this.id = contactRes.id;
    this.name = contactRes.name;
    this.phoneNumber = contactRes.phoneNumber;
  }
}
