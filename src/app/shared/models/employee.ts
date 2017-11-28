import { Affiliation } from "./affiliation";
import { BankAccount } from "./bank-account";
import { Worker } from "./worker";

export class Employee extends Worker{

    public type: string = "planilla";

    public firstName: string;
    public lastName: string;
    public address: string;
    public dni: string;
    public email: string;
    public workPosition: string;
    public workFunctions: string;
    public situation: string;
    public affiliation: Affiliation;
    public pensionRegime: string;
    public admissionDate: Date;
    public cuspp: string;
    public pay: number;
    public bankAccounts: BankAccount[];
    public lastDayPaid: Date;
    public photo: any;
    public photoPublicUrl: string;

    public get fullName(): string{
        return this.firstName + ' ' + this.lastName;
    }

    constructor(partial?: Partial<Employee>){
        super();
        Object.assign(this,partial);
    }
}