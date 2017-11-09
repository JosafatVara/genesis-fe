import { Component, OnInit, Input } from '@angular/core';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Freelancer } from '../../shared/models/freelancer';
import { Affiliation } from '../../shared/models/affiliation';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FreelancersService } from '../../core/services/freelancers.service';
import { AffiliationsService } from '../../core/services/affiliations.service';
import { ImagesService } from '../../core/utils/images.service';

@Component({
  selector: 'gen-freelancer-details',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.scss']
})
export class FreelancerDetailsComponent extends CrudComponent<Freelancer> implements OnInit {

  @Input('freelancer') freelancer: Freelancer;
  protected title: string;
  protected buttonLabel: string;
  affiliationList: Affiliation[];
  freelancerPhoto: any;
  frmFreelancerPhoto: FormGroup;
  frmPersonalInformation: FormGroup;
  frmWorkInformation: FormGroup;
  frmAffiliationInformation: FormGroup;
  frmBankAccounts: FormGroup;

  constructor(freelancers: FreelancersService, private affiliations: AffiliationsService, 
    private images: ImagesService, private fb: FormBuilder) { 
    super(freelancers);
    this.createForms();
    this.affiliations.get().subscribe( as => {
      this.affiliationList = as;
    });
  }

  ngOnInit() {
    this.managedEntity = this.freelancer || new Freelancer();
    if(this.mode!='create' && this.managedEntity.photoPublicUrl){
      this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe( image => {
        this.freelancerPhoto = image;
      });      
    }
    this.fillFormsModels();
  }

  //#region FormManagement
  private createForms(){
    this.frmFreelancerPhoto = this.fb.group({
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
      this.frmFreelancerPhoto.setValue({photoFlag: 'OK'});
    }
  }

}
