import { BaseEntity } from "./base/base-entity";

export class BankAccount extends BaseEntity<BankAccount> {
    public bankName: string;
    public number: string;
    public interbankNumber?: string;
}
