import { BaseEntity } from "./base/base-entity";

export class User extends BaseEntity<User> {

    public firstName: string;
    public lastName: string;
    public email: string;

}
