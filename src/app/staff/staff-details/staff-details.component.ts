import { Component, OnInit, Input } from '@angular/core';
import { CrudComponent } from "../../shared/components/base/crud-component";
import { Employee } from "../../shared/models/employee";
import { EmployeesService } from "../../core/services/employees.service";
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AffiliationsService } from '../../core/services/affiliations.service';
import { Affiliation } from '../../shared/models/affiliation';
import { ImagesService } from '../../core/utils/images/images.service';
import { SimpleCrudService } from "../../core/utils/simple-crud/simple-crud.service";
import { BankAccount } from "../../shared/models/bank-account";

@Component({
  selector: 'gen-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent extends CrudComponent<Employee> implements OnInit{
  
  @Input('employee') employee: Employee;
  public title: string;
  public buttonLabel: string;
  affiliationList: Affiliation[];
  employeePhoto: any;
  frmEmployee: FormGroup;
  frmEmployeePhoto: FormGroup;
  frmPersonalInformation: FormGroup;
  frmWorkInformation: FormGroup;
  frmAffiliationInformation: FormGroup;
  frmBankAccounts: FormGroup;

  constructor(employees: EmployeesService, private affiliations: AffiliationsService, private simpleCrud: SimpleCrudService
    ,private images: ImagesService, private fb: FormBuilder) { 
    super(employees);
    this.affiliations.get().subscribe( as => {
      this.affiliationList = as;
    });
  }

  ngOnInit() {
    this.managedEntity = this.employee || new Employee();
    // if(this.mode!='create' && this.managedEntity.photoPublicUrl){
    //   this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe( image => {
    //     this.employeePhoto = image;
    //   });      
    // }
    this.employeePhoto = this.managedEntity.photo;
    this.createForms();
    this.fillFormsModels();
  }

  //#region FormManagement
  private createForms(){
    this.frmEmployeePhoto = this.fb.group({
      photoFlag: ['', this.photoIsNotEmptyValidator.bind(this)]
    });
    this.frmPersonalInformation = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      address: ['',[Validators.required]],
      dni: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['',[Validators.required, Validators.email]]
    });
    this.frmWorkInformation = this.fb.group({
      workPosition: ['',[Validators.required]],
      workFunctions: ['',[]],
      situation: ['',[Validators.required]]
    });
    this.frmAffiliationInformation = this.fb.group({
      affiliation: [undefined, [Validators.required]],
      pensionRegime: ['', [Validators.required]],
      cuspp: ['', [Validators.required]],
      pay: [0, [Validators.required,Validators.min(1)]],
      admissionDate: [new Date(), [Validators.required]]
    });  
    this.frmBankAccounts = this.fb.group({
      bankAccounts: this.fb.array([])
    });
    this.frmEmployee = this.fb.group({
      photo: [this.frmEmployeePhoto],
      personalInformation: [this.frmPersonalInformation],
      workInformation: [this.frmWorkInformation],
      affiliation: [this.frmAffiliationInformation],
      bankAccounts: [this.bankAccounts]
    });
  }

  photoIsNotEmptyValidator(control: FormControl){
      if( !this.employeePhoto && (!this.managedEntity.photoPublicUrl || this.managedEntity.photoPublicUrl == "" ) ){
        return { required: true };
      }
      return null;
  }


  private fillFormsModels(){
    this.frmPersonalInformation.patchValue(this.managedEntity);
    this.frmWorkInformation.patchValue(this.managedEntity);
    this.frmAffiliationInformation.patchValue(this.managedEntity);
    let affiliationInList = this.managedEntity.affiliation ? 
      this.affiliationList.find( a => a.id == this.managedEntity.affiliation.id):undefined;
    this.frmAffiliationInformation.patchValue({ affiliation: affiliationInList });
    let bankAccountsFGs = this.managedEntity.bankAccounts?this.managedEntity.bankAccounts.map( ba => {
      return this.fb.group({
        id: [ba.id],
        bankName: [ba.bankName,[Validators.required]],
        number: [ba.number,[Validators.required]],
        interbankNumber: [ba.interbankNumber, [Validators.required]]
      });
    }):[];
    this.frmBankAccounts.setControl('bankAccounts', this.fb.array(bankAccountsFGs));
  }

  protected fillDataModels(){
    Object.assign(this.managedEntity,this.frmPersonalInformation.value, this.frmWorkInformation.value,
      this.frmAffiliationInformation.value,this.frmBankAccounts.value);
  }

  get bankAccounts(): FormArray{
    return this.frmBankAccounts.get('bankAccounts') as FormArray;
  }

  removeBankAccount(index: number){
    this.bankAccounts.removeAt(index);
  }

  editBankAccount(index: number) {
    if (this.frmBankAccounts.valid) {
      let bankAccountFC = this.bankAccounts.controls[index];
      let dialogRef = this.simpleCrud.open<BankAccount>("Editar cuenta bancaria", [
        {
          label: 'Banco',
          name: 'bankName',
          type: 'text',
          control: this.fb.control(bankAccountFC.value.bankName, [Validators.required])
        },
        {
          label: 'Cuenta bancaria',
          name: 'number',
          type: 'text',
          control: this.fb.control(bankAccountFC.value.number, [Validators.required])
        },{
          label: 'Cuenta interbancaria',
          name: 'interbankNumber',
          type: 'text',
          control: this.fb.control(bankAccountFC.value.interbankNumber, [Validators.required])
        }
      ]);
      dialogRef.subscribe( result => {
        if(result){
          bankAccountFC.patchValue(result);
        }
      });      
    }
  }

  addBankAccount() {    
    if (this.frmBankAccounts.valid) {
      let dialogRef = this.simpleCrud.open<BankAccount>("Añadir cuenta bancaria", [
        {
          label: 'Banco',
          name: 'bankName',
          type: 'text',
          control: this.fb.control('', [Validators.required])
        },
        {
          label: 'Cuenta bancaria',
          name: 'number',
          type: 'text',
          control: this.fb.control('', [Validators.required])
        },{
          label: 'Cuenta interbancaria',
          name: 'interbankNumber',
          type: 'text',
          control: this.fb.control('', [Validators.required])
        }
      ]);
      dialogRef.subscribe( result => {
        if(result){
          this.bankAccounts.push(this.fb.group({
            bankName: [result.bankName, [Validators.required]],
            number: [result.number, [Validators.required]],
            interbankNumber: [result.interbankNumber, [Validators.required]]
          }));
        }
      });      
    }
  }

  allBankAccountsAreDisabled(){
    for( let bankAccount in this.bankAccounts.controls ){
      if( (this.bankAccounts.controls[bankAccount] as FormGroup).enabled ){
        return false;
      }
    }
    return true;
  }
  //#endregion 
  

  onChangePhoto(photo: Blob){
    if(photo){
      this.frmEmployeePhoto.setValue({photoFlag: 'OK'});
    }
  }

  protected validate(): boolean{
    this.managedEntity.photo = this.employeePhoto;
    this.managedEntity.photoFileName = this.employeePhoto? this.employeePhoto.name : undefined;
    return true;
  }
}
