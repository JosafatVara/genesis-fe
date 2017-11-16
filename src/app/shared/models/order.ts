import { BaseEntity } from "./base/base-entity";


export class Order extends BaseEntity<Order>{
    public clientName: string;
    public orderName: string
    public quantity: string;
}