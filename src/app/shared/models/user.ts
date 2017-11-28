import { BaseEntity } from "./base/base-entity";
import { Role } from "./role";

export class User extends BaseEntity<User> {

    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: Role;
    public lastConnection: Date;
    public photo: any;
    public photoPublicUrl: string;
    public photoFileName: string;
    public enterprisesQuantity: number;
}
