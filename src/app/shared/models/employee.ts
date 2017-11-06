import { BaseEntity } from "./base/base-entity";
import { Affiliation } from "./affiliation";
import { BankAccount } from "./bank-account";

export class Employee extends BaseEntity<Employee>{
    public firstName: string;
    public lastName: string;
    public address: string;
    public dni: string;
    public email: string;
    public workPosition: string;
    public workFunctions: string;
    public affiliation: Affiliation;
    public affiliationName: string;
    public pay: number;
    public admissionDate: Date;
    public bankAccounts: BankAccount[];
    public lastDayPaid: Date;
}
