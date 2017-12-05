import { Affiliation } from "../../../shared/models/affiliation";
import { Specification } from "./base/specification";

export abstract class AffiliationSpecification extends Specification<Affiliation>{

}

export class AffiliationsByChoiceSpecification extends AffiliationSpecification{

    constructor(public choice: string){
        super();
    }

    protected evaluate(entity: Affiliation): boolean {
        return entity.choice == this.choice;
    }

}