import { EmployeesQuantity } from "../../../shared/models/employees-quantity";
import { Specification } from "./base/specification";

export abstract class EmployeesQuantitySpecification extends Specification<EmployeesQuantity>{
}

export class EmployeesQuantitiesByDescriptionSpecification extends EmployeesQuantitySpecification{

    constructor(private employeesQuantityDescription: string){
        super();
        if(!employeesQuantityDescription){
            this.employeesQuantityDescription = "";
        }
    }

    protected evaluate(entity: EmployeesQuantity): boolean {
        return entity.quantityDescription.toLocaleLowerCase() == this.employeesQuantityDescription.toLocaleLowerCase();
    }
    
}
