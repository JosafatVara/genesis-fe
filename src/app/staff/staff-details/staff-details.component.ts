import { Component, OnInit, Input } from '@angular/core';
import { CrudComponent } from "../../shared/components/base/crud-component";
import { Employee } from "../../shared/models/employee";
import { EmployeesService } from "../../core/services/employees.service";
import { ImagesService } from "../../core/utils/images.service";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { AffiliationsService } from '../../core/services/affiliations.service';
import { Affiliation } from '../../shared/models/affiliation';

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
      dni: ['',[Validators.required]],
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

  addBankAccount(){
    if(this.frmBankAccounts.valid){
      this.bankAccounts.push(this.fb.group({
        bankName: ['',[Validators.required]],
        number: ['',[Validators.required]],
        interbankNumber: ['',[Validators.required]]
      }));
    }else{
      let FABankAccounts: FormArray = this.frmBankAccounts.get('bankAccounts') as FormArray;
      let FGBankAccount: FormGroup;
      for(let control in FABankAccounts.controls){
        FGBankAccount = FABankAccounts.controls[control] as FormGroup;
        for( let bankAccountControl in FGBankAccount.controls){
          FGBankAccount.controls[bankAccountControl].markAsTouched();
          FGBankAccount.controls[bankAccountControl].updateValueAndValidity();
        }        
      }
    }
  }
  //#endregion

  onChangePhoto(photo: Blob){
    if(photo){
      this.frmEmployeePhoto.setValue({photoFlag: 'OK'});
    }
  }
}
