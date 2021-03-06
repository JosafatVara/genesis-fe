import { Contact } from './contact';
import { Group } from './group';
import { BaseEntity } from "./base/base-entity";
import { BankAccount } from './bank-account'

export class Customer extends BaseEntity<Customer>{
    public address: string;
    public ruc: string;
    public phone: string;
    public bankAccounts: BankAccount[];
    public photo: File;
    public type: string;
    public numOrders?: number;
    public pendingAmount?: number;
    //LegalProvider
    public businessName?: string;
    public group?: Group;
    public details?: string;
    public contacts?: Contact[];
    public position?: string;
    
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
