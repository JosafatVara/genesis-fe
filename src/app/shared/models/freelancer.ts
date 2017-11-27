import { BankAccount } from "./bank-account";
import { BaseEntity } from "./base/base-entity";

export class Freelancer extends BaseEntity<Freelancer>{
    public firstName: string;
    public lastName: string;
    public address: string;
    public dni: string;
    public email: string;
    public workPosition: string;
    public workFunctions: string;
    public bankAccounts: BankAccount[];
    public lastDayPaid: Date;
    public photo: any;
    public photoPublicUrl: string;

    public get fullName(): string{
        return this.firstName + ' ' + this.lastName;
    }
}
