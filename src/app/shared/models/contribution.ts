import { BaseEntity } from "./base/base-entity";

export class Contribution extends BaseEntity<Contribution>{
    
    public concept: string;
    public ammount: number;
    public description: string;
    
}