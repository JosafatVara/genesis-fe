import { BaseEntity } from "./base/base-entity";

export class Discount extends BaseEntity<Discount>{

    public concept: string;
    public ammount: number;

}
