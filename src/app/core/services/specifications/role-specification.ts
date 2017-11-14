import { Specification } from "./base/specification";
import { Role } from "../../../shared/models/role";

export abstract class RoleSpecification extends Specification<Role> {
}

export class RolesByNameSpecification extends RoleSpecification{
    
        constructor(private roleName: string){
            super();
            if(!roleName){
                this.roleName = "";
            }
        }
    
        protected evaluate(entity: Role): boolean {
            return entity.name.toLocaleLowerCase() == this.roleName.toLocaleLowerCase();
        }
        
    }
