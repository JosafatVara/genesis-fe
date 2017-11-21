import { Contact } from './contact';
import { Group } from './group';
import { BaseEntity } from "./base/base-entity";
import { BankAccount } from './bank-account'

export class Provider extends BaseEntity<Provider>{
    public address: string;
    public ruc: string;
    public phone: string;
    public bankAccounts: BankAccount[];
    public photo: File;
    public type: string;
    //LegalProvider
    public businessName?: string;
    public group?: Group;
    public details?: string;
    public contacts?: Contact[]
    //NaturalProvider
    public cellphone?: string;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public notes?: string;
}

// export class LegalProvider extends Provider {
//     public businessName: string;
//     public group: Group;
//     public details: string;
//     public contacts: Contact[]
// }

// export class NaturalProvider extends Provider {
//     public cellphone: string;
//     public firstName: string;
//     public lastName: string;
//     public email: string;
//     public notes: string;
// }
