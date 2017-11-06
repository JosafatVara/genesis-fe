import { BaseEntity } from "./base/base-entity";
import { Department } from "./department";
import { EmployeesQuantity } from "./employees-quantity";

export class Enterprise extends BaseEntity<Enterprise> {

    public name: string;
    public businessName: string;
    public ruc: string;
    public address: string;
    public department: Department = new Department();
    public photo: any;
    public adminsQuantity: number;
    public employeesQuantity: EmployeesQuantity = new EmployeesQuantity();

}
