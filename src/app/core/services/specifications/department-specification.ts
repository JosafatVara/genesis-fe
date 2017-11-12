import { Department } from "../../../shared/models/department";
import { Specification } from "./base/specification";

export abstract class DepartmentSpecification extends Specification<Department>{
}

export class DepartmentsByNameSpecification extends DepartmentSpecification{

    constructor(private departmentName: string){
        super();
        if(!departmentName){
            this.departmentName = "";
        }
    }

    protected evaluate(entity: Department): boolean {
        return entity.name.toLocaleLowerCase() == this.departmentName.toLocaleLowerCase();
    }
    
}
