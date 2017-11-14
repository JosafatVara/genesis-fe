import { BaseEntity } from "./base/base-entity";
import { Employee } from "./employee";
import { Incentive } from "./incentive";
import { Discount } from "./discount";

export class StaffPayment extends BaseEntity<StaffPayment>{
    public paymentDate: Date;
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
    
    public basePay: number;
    public employee: Employee;    
    public month: number;
    public year: number;
    public incentives: Incentive[];
    public discounts: Discount[];
    public netTotalAmmount: number;

}
