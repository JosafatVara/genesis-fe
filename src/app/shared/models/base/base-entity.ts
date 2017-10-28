export abstract class BaseEntity<T> {

    protected Id: number;

    constructor(partial?:Partial<T>){
        Object.assign(this,partial);
    }

}
