import { BaseEntity } from "./base/base-entity";

export class Group extends BaseEntity<Group>{
    public name: string;
    public numProviders?: number;

}