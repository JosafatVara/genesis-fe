import { Input, Output, EventEmitter } from "@angular/core";
import { BaseEntity } from "../../models/base/base-entity";
import { CrudService } from "../../../core/services/contracts/crud-service";
import { FormControl, FormGroup } from "@angular/forms";
import { BaseComponent } from "./base-component";

export abstract class CrudComponent<T extends BaseEntity<T>> extends BaseComponent {

    protected crudService: CrudService<T>;

    constructor(crudService: CrudService<T>){
        super();
        this.crudService = crudService;
        this.onFinish = new EventEmitter<T>();
    }

    @Input('mode') mode: string;    
    @Output('onFinish') onFinish: EventEmitter<T>;
    @Input('doChangesOnFinish') doChangesOnFinish: boolean;
    public managedEntity: T;

    public finish(form: FormGroup){
        this.fillDataModel();
        if( (form && form.valid) && this.validate()){
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

    protected fillDataModel(){

    }

    protected validateMode(){
        if(!['create','update','read','delete'].includes(this.mode)){
            throw new Error('Crud mode not supporte');
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
