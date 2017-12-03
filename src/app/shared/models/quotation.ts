import { BaseEntity } from "./base/base-entity";
import { Customer } from "./customer";

export class Quotation extends BaseEntity<Quotation>{

    public customer: Customer;
    public created: Date;
    public details:  QuotationDetail[];
    public state: QuotationState;

    public get subtotal(): number{
        return this.details.map( d => d.ammount ).reduce( (prev,curr) => prev + curr );
    }

    public get igv(): number{
        return this.subtotal * 0.19;
    }

    public get totalAmmount(): number{
        return this.subtotal + this.igv;
    }

}

export class QuotationDetail extends BaseEntity<QuotationDetail>{

    public productQuantity: number;
    public productName: string;
    public ammount: number;

}

export class QuotationState extends BaseEntity<QuotationState>{

    public name: string;

}