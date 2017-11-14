import { BaseEntity } from "./base/base-entity";
import { Department } from "./department";
import { EmployeesQuantity } from "./employees-quantity";

export class Enterprise extends BaseEntity<Enterprise> {

    public name: string;
    public businessName: string;
    public ruc: string;
    public address: string;
    public department: Department;
    public photo: File;
    public photoPublicUrl: string;
    public photoFileName: string;
    public adminsQuantity: number;
    public employeesQuantity: EmployeesQuantity;

}
