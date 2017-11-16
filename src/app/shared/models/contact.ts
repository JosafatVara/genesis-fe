import { BaseEntity } from "./base/base-entity";

export class Contact extends BaseEntity<Contact> {
    public firstName: string;
    public lastName: string;
    public position: string;
    public phone: number;
    public email: string;
}
