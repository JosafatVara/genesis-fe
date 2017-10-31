import { Input, Output, EventEmitter } from "@angular/core";
import { BaseEntity } from "../../models/base/base-entity";
import { AsyncCrudService } from "../../../core/services/contracts/async-crud-service";
import { FormControl } from "@angular/forms";

export abstract class CrudComponent<T extends BaseEntity<T>> {

    protected crudService: AsyncCrudService<T>;

    constructor(crudService: AsyncCrudService<T>){
        this.crudService = crudService;
        this.onFinish = new EventEmitter<T>();
    }

    @Input('mode') mode: string = "read";    
    @Output('onFinish') onFinish: EventEmitter<T>;
    @Input('doChangesOnFinish') doChangesOnFinish: boolean;
    public managedEntity: T;

    public finish(form: FormControl){
        if((form==undefined || (form && form.valid)) && this.validate()){
            switch(this.mode){
                case 'create':
                    this.create();
                    break;
                case 'update':
                    this.update();
                    break;
                case 'delete':
                    this.delete();
                    break;
                case 'read':
                    break;
                default:
                    alert('crud mode not supported');
                    break;
            }
            this.afterFinish();
        }
    }

    protected create(): void{
        if(this.doChangesOnFinish){
            this.crudService.create(this.managedEntity);
        }
        this.onFinish.emit(this.managedEntity);
    }

    protected update(): void{
        if(this.doChangesOnFinish){
            this.crudService.update(this.managedEntity);
        }
        this.onFinish.emit(this.managedEntity);
    }

    protected delete(): void{
        if(this.doChangesOnFinish){
            this.crudService.delete(this.managedEntity);
        }
        this.onFinish.emit(this.managedEntity);
    }

    protected afterFinish(): void{
    }
    
    protected validate(): boolean{
        return true;
    }

    protected abstract get title(): string;

    protected abstract get buttonLabel(): string;
}