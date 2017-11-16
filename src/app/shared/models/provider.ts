import { BaseEntity } from "./base/base-entity";
import { BankAccount } from './bank-account'
import { Contact } from './contact'


export class Provider extends BaseEntity<Provider>{
    public businessName: string;
    public firstName: string
    public lastName: string;
    public type: string;
    public cellphone: number;
    public address: string;
    public ruc: number;
    public phone: number;
    public details: string;
    public contacts: Contact[];
    public bankAccounts: BankAccount[];
    // public photo: any;
    // public photoPublicUrl: string;
    // public get fullName(): string {
    //     return this.firstName + ' ' + this.lastName;
    // }
}