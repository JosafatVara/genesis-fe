import { BankAccount } from "./bank-account";
import { Worker } from "./worker";

export class Freelancer extends Worker{

    public type: string = "rxh";

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

    constructor(partial?: Partial<Freelancer>){
        super();
        Object.assign(this,partial);
    }
    
}
