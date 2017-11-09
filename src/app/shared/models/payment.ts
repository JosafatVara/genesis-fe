import { BaseEntity } from "./base/base-entity";
import { Employee } from "./employee";

export class Payment extends BaseEntity<Payment>{
    public paymentDate: Date;
    public employee: Employee;
    public basePay: number;
    public payPerFamiliar: number;
    public bonus: number;
    public remuneration: number;
    public AFPAmmount: number;
    public insurance: number;
    public commission: number;
    public gratification: number;
    public mobility: number;
    public prepayment: number;
    public loan: number;
    public totalDiscount: number;
    public salaryToPay: number;
    public essalud: number;
    public totalContributions: number;

}
