import { Specification } from "./base/specification";
import { Provider } from "../../../shared/models/provider";


export abstract class ProviderSpecification extends Specification<Provider> {
}

export class ProvidersByNameSpecification extends ProviderSpecification{
    
    constructor(private freelancerName: string){
        super();
        if(!freelancerName){
            this.freelancerName = "";
        }
    }

    protected evaluate(entity: Provider): boolean {
        return entity.fullName.toLocaleLowerCase().includes(this.freelancerName.toLocaleLowerCase());
    }
    
}