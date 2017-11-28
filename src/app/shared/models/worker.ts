import { BaseEntity } from "./base/base-entity";

export abstract class Worker extends BaseEntity<Worker>{
    public firstName: string;
    public lastName: string;
    public address: string;
    public dni: string;
    public email: string;

    public abstract get type(): string;
}