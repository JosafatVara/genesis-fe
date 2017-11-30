import { BaseEntity } from "./base/base-entity";
import { Provider } from "./provider";
import { Rxh } from "./rxh";

export class ProviderPayment extends BaseEntity<ProviderPayment>{

    public provider: Provider;
    public rxhs: Rxh[];
    public month: number;
    public year: number;
    public creationDate: Date;

    public get total(): number{
        return this.rxhs.map( r => r.netTotalAmmount ).reduce( (prev,curr) => prev + curr );
    }

}
