import { BaseEntity } from "./base/base-entity";

export class Rxh extends BaseEntity <Rxh>{
    public number: string;
    public ruc: string;
    public concept: string;
    public emissionDate: Date;
    public totalAmmout: number;
    public retentionAmmount: number;
    public netTotalAmmount: number;
}
