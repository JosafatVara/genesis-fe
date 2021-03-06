import { Component, OnInit, Input } from '@angular/core';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Freelancer } from '../../shared/models/freelancer';
import { Affiliation } from '../../shared/models/affiliation';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FreelancersService } from '../../core/services/freelancers.service';
import { AffiliationsService } from '../../core/services/affiliations.service';
import { ImagesService } from '../../core/utils/images/images.service';
import { SimpleCrudService } from "../../core/utils/simple-crud/simple-crud.service";
import { BankAccount } from "../../shared/models/bank-account";

@Component({
  selector: 'gen-freelancer-details',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.scss']
})
export class FreelancerDetailsComponent extends CrudComponent<Freelancer> implements OnInit {

  @Input('freelancer') freelancer: Freelancer;
  public title: string;
  public buttonLabel: string;
  freelancerPhoto: any;
  frmFreelancerPhoto: FormGroup;
  frmPersonalInformation: FormGroup;
  frmWorkInformation: FormGroup;
  frmBankAccounts: FormGroup;

  constructor(freelancers: FreelancersService, private images: ImagesService, private fb: FormBuilder,
    private simpleCrud: SimpleCrudService) {
      
    super(freelancers);
    this.createForms();
    
  }

  ngOnInit() {
    console.log(this.freelancer,"hola gola");
    console.log(this.freelancer);
    
    this.managedEntity = this.freelancer || new Freelancer();
    if (this.mode != 'create' && this.managedEntity.photoPublicUrl) {
      this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe(image => {
        this.freelancerPhoto = image;
      });
    }
    this.fillFormsModels();
  }

  //#region FormManagement
  private createForms() {
    this.frmFreelancerPhoto = this.fb.group({
      photoFlag: ['', Validators.required]
    });
    this.frmPersonalInformation = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.frmWorkInformation = this.fb.group({
      workPosition: ['', [Validators.required]],
      workFunctions: ['', []]
    });
    this.frmBankAccounts = this.fb.group({
      bankAccounts: this.fb.array([])
    });
  }

  private fillFormsModels() {
    this.frmPersonalInformation.patchValue(this.managedEntity);
    this.frmWorkInformation.patchValue(this.managedEntity);
    let bankAccountsFGs = this.managedEntity.bankAccounts ? this.managedEntity.bankAccounts.map(ba => {
      return this.fb.group({
        bankName: [ba.bankName, [Validators.required]],
        number: [ba.number, [Validators.required]],
        interbankNumber: [ba.interbankNumber, [Validators.required]]
      });
    }) : [];
    this.frmBankAccounts.setControl('bankAccounts', this.fb.array(bankAccountsFGs));
  }

  protected fillDataModels() {
    Object.assign(this.managedEntity, this.frmPersonalInformation.value, this.frmWorkInformation.value,
       this.frmBankAccounts.value);
  }

  get bankAccounts(): FormArray {
    return this.frmBankAccounts.get('bankAccounts') as FormArray;
  }

  removeBankAccount(index: number) {
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
  //#endregion

  onChangePhoto(photo: Blob) {
    if (photo) {
      this.frmFreelancerPhoto.setValue({ photoFlag: 'OK' });
    }
  }

}
