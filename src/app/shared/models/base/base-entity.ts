export abstract class BaseEntity<T> {

    public id?: number;

    constructor(partial?:Partial<T>){
        Object.assign(this,partial);
    }
}
