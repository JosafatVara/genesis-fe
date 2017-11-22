import { Specification } from "./base/specification";
import { Freelancer } from "../../../shared/models/freelancer";

export abstract class FreelancerSpecification extends Specification<Freelancer> {
}

export class FreelancersByNameSpecification extends FreelancerSpecification{
    
        constructor(private freelancerName: string){
            super();
            if(!freelancerName){
                this.freelancerName = "";
            }
        }
    
        protected evaluate(entity: Freelancer): boolean {
            return entity.fullName.toLocaleLowerCase().includes(this.freelancerName.toLocaleLowerCase());
        }
        
    }
