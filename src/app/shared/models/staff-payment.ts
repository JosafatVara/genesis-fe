import { BaseEntity } from "./base/base-entity";
import { Employee } from "./employee";
import { Incentive } from "./incentive";
import { Discount } from "./discount";
import { Contribution } from "./contribution";

export class StaffPayment extends BaseEntity<StaffPayment>{
    // public paymentDate: Date;
    // public payPerFamiliar: number;
    // public bonus: number;
    // public remuneration: number;
    // public AFPAmmount: number;
    // public insurance: number;
    // public commission: number;
    // public gratification: number;
    // public mobility: number;
    // public prepayment: number;
    // public loan: number;
    // public totalDiscount: number;
    // public salaryToPay: number;
    // public essalud: number;
    // public totalContributions: number;
    
    public month: number;
    public year: number;

    public employee: Employee;
    public paymentDate: Date;
    public laboredDays: number;
    public unlaboredDays: number;
    public subsidizedDays: number;
    public condition: string;
    public ordinaryHours: number;
    public ordinaryMinutes: number;
    public overtimeHours: number;
    public overtimeMinutes: number;
    public suspensionWorkType: string;
    public suspensionWorkReason: string;
    public suspensionWorkDays: number;
    public otherEmployers: string;
    
    public basePay: number;
    public incentives: Incentive[];
    public discounts: Discount[];
    public contributions: Contribution[];
    public netTotalAmmount: number;

}
