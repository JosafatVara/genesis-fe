import { Component, OnInit, Input } from '@angular/core';
import { CrudComponent } from "../../shared/components/base/crud-component";
import { Employee } from "../../shared/models/employee";
import { EmployeesService } from "../../core/services/employees.service";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { AffiliationsService } from '../../core/services/affiliations.service';
import { Affiliation } from '../../shared/models/affiliation';
import { ImagesService } from '../../core/utils/images/images.service';

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
  frmEmployeePhoto: FormGroup;
  frmPersonalInformation: FormGroup;
  frmWorkInformation: FormGroup;
  frmAffiliationInformation: FormGroup;
  frmBankAccounts: FormGroup;

  constructor(employees: EmployeesService, private affiliations: AffiliationsService, 
    private images: ImagesService, private fb: FormBuilder) { 
    super(employees);
    this.createForms();
    this.affiliations.get().subscribe( as => {
      this.affiliationList = as;
    });
  }

  ngOnInit() {
    this.managedEntity = this.employee || new Employee();
    if(this.mode!='create' && this.managedEntity.photoPublicUrl){
      this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe( image => {
        this.employeePhoto = image;
      });      
    }
    this.fillFormsModels();
  }

  //#region FormManagement
  private createForms(){
    this.frmEmployeePhoto = this.fb.group({
      photoFlag: ['', Validators.required]
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
      workFunctions: ['',[Validators.required]]
    });
    this.frmAffiliationInformation = this.fb.group({
      affiliation: [undefined, [Validators.required]],
      affiliationName: ['', [Validators.required]],
      pay: [0, [Validators.required,Validators.min(1)]],
      admissionDate: [new Date(), [Validators.required]]
    });  
    this.frmBankAccounts = this.fb.group({
      bankAccounts: this.fb.array([])
    });
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

  toogleEditBankAccount(index: number){
    let FGBankAcount = this.bankAccounts.controls[index] as FormGroup;
    if(FGBankAcount.valid || FGBankAcount.disabled){
      if(FGBankAcount.disabled){
        FGBankAcount.enable();
      }else{
        FGBankAcount.disable();
      }
    }else{
      for(let formControl in FGBankAcount.controls){
        FGBankAcount.controls[formControl].markAsTouched();
        FGBankAcount.updateValueAndValidity();
      }
    }  
  }

  addBankAccount(){
    if(this.frmBankAccounts.valid || this.allBankAccountsAreDisabled()){
      this.bankAccounts.push(this.fb.group({
        bankName: ['',[Validators.required]],
        number: ['',[Validators.required]],
        interbankNumber: ['',[Validators.required]]
      }));
    }else{
      let FGBankAccount: FormGroup;
      for(let control in this.bankAccounts.controls){
        FGBankAccount = this.bankAccounts.controls[control] as FormGroup;
        for( let bankAccountControl in FGBankAccount.controls){
          FGBankAccount.controls[bankAccountControl].markAsTouched();
          FGBankAccount.controls[bankAccountControl].updateValueAndValidity();
        }        
      }
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
}
