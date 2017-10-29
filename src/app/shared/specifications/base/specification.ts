export abstract class Specification<T> {

    public isSatisfiedBy( entity: T ): boolean{
        return this.evaluate(entity);
    }

    protected abstract evaluate(entity: T): boolean;    

}