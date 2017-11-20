import { Rxh } from "./rxh";
import { Freelancer } from "./freelancer";
import { BaseEntity } from "./base/base-entity";

export class FreelancerPayment extends BaseEntity<FreelancerPayment>{
    public freelancer: Freelancer;
    public rxhs: Rxh[];
    public month: number;
    public year: number;
    public creationDate: Date;

    public get total(): number{
        return this.rxhs.map( r => r.netTotalAmmount ).reduce( (prev,curr) => prev + curr );
    }
}
