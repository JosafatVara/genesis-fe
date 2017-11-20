import { Specification } from "./base/specification";
import { Employee } from "../../../shared/models/employee";

export abstract class EmployeeSpecification extends Specification<Employee> {
}

export class EmployeesByNameSpecification extends EmployeeSpecification{
    
        constructor(private employeesName: string){
            super();
            if(!employeesName){
                this.employeesName = "";
            }
        }
    
        protected evaluate(entity: Employee): boolean {
            return entity.fullName.toLocaleLowerCase().includes(this.employeesName.toLocaleLowerCase());
        }
        
    }
