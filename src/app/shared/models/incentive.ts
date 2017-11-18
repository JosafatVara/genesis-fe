import { BaseEntity } from "./base/base-entity";

export class Incentive extends BaseEntity<Incentive>{

    public concept: string;
    public ammount: number;
    public description: string;
}
