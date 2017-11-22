import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { MatExpansionPanel } from "@angular/material";

import { CrudComponent } from "../../shared/components/base/crud-component";
import { FreelancerPayment } from "../../shared/models/freelancer-payment";
import { FreelancersPaymentsService } from "../../core/services/freelancers-payments.service";
import { FreelancersService } from "../../core/services/freelancers.service";
import { Freelancer } from "../../shared/models/freelancer";
import { FreelancersByNameSpecification } from "../../core/services/specifications/freelancer-specification";
import { ToastService } from "../../core/utils/toast/toast.service";

@Component({
  selector: 'gen-freelancer-payment-details',
  templateUrl: './freelancer-payment-details.component.html',
  styleUrls: ['./freelancer-payment-details.component.scss']
})
export class FreelancerPaymentDetailsComponent extends CrudComponent<FreelancerPayment> implements OnInit {
  
  @Input('freelancerPayment') freelancerPayment: FreelancerPayment;
  
  public get title(): string{
    return 'Datos del pago RxH'
  }
  public get buttonLabel(): string{
    switch(this.mode){
      case "create":
        return "Crear Pago";
      case "update":
        return "Actualizar Pago";
      default: 
        return "--";
    }
  }
  public frmFreelancerPayment: FormGroup;
  public freelancerList: Freelancer[] = [];

  constructor(freelancersPayments: FreelancersPaymentsService, private freelancers: FreelancersService, 
    private fb: FormBuilder, private toast: ToastService) { 
    super(freelancersPayments);    
  }

  ngOnInit() {
    this.managedEntity = this.mode != 'create'? this.freelancerPayment :
      new FreelancerPayment({ 
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1
      });
    this.createForms();  
    this.fillFormsModels();
    this.createFormsListeners();
  }

  createForms(){
    this.frmFreelancerPayment = this.fb.group({
      freelancer: [undefined, [Validators.required]],
      rxhs: this.fb.array([]),
      year: [0,[Validators.required]],
      month: [0, [Validators.required]]
    });
  }

  createFormsListeners(){
    this.frmFreelancerPayment.get('freelancer')
      .valueChanges.debounceTime(500).subscribe( name => {
        if( !(name instanceof Freelancer) ){
          this.freelancers.get(new FreelancersByNameSpecification(name))
          .subscribe( fs => {
            this.freelancerList = fs;
          });
        }else{
          this.freelancerList = [];
        }
      });
  }

  fillFormsModels(){
    if(this.mode != 'create'){
      let rxhFGs = this.managedEntity.rxhs.map( rxh => {
        return this.fb.group({
          number: [rxh.number, [Validators.required]],
          ruc: [rxh.ruc, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
          concept: [rxh.concept, Validators.required],
          emissionDate: [rxh.emissionDate, Validators.required],
          totalAmmount: [rxh.totalAmmout, Validators.required],
          retentionAmmount: [rxh.retentionAmmount, Validators.required],
          netTotalAmmount: [rxh.netTotalAmmount, Validators.required],
          confirmed: [true]
        });
      });
      this.frmFreelancerPayment.setControl('rxhs',this.fb.array(rxhFGs));
    }
    this.frmFreelancerPayment.patchValue({ year: this.managedEntity.year, month: this.managedEntity.month });
    this.freelancers.get().subscribe( fs => {
      if(fs.length<=0) return;
      if(this.mode != 'create'){
        this.frmFreelancerPayment.patchValue({ freelancer: 
          this.managedEntity.freelancer? fs.find( f => f.id == this.managedEntity.freelancer.id ) : undefined });
      }
    });
  }

  fillDataModels(){

  }

  get rxhs(): FormArray{
    return this.frmFreelancerPayment.controls['rxhs'] as FormArray;
  }

  addRxh(){
    if(!this.frmFreelancerPayment.valid && this.rxhs.length != 0){
      let FGRxh: FormGroup;
      for(let rxh in this.rxhs.controls){
        FGRxh = this.rxhs.controls[rxh] as FormGroup;
        for(let control in FGRxh.controls){
          FGRxh.controls[control].markAsTouched();
          FGRxh.controls[control].updateValueAndValidity();
        }
      }
      return;
    };
    this.rxhs.push(this.fb.group({
      number: ['', [Validators.required]],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      concept: ['', Validators.required],
      emissionDate: [undefined, Validators.required],
      totalAmmount: [0, Validators.required],
      retentionAmmount: [0, Validators.required],
      netTotalAmmount: [0, Validators.required],
      confirmed: [false]
    }));
  }

  confirmRxh(index: number, panel: MatExpansionPanel){
    let FGRxh: FormGroup = this.rxhs.controls[index] as FormGroup;
    if(FGRxh.valid){
      (this.rxhs.controls[index] as FormGroup).patchValue({confirmed: true});
      panel.close();
    }else{
      for(let control in FGRxh.controls){
        FGRxh.controls[control].markAsTouched();
        FGRxh.controls[control].updateValueAndValidity();
      }
    }

  }

  removeRxh(index: number){
    this.rxhs.removeAt(index);
  }

  displayFreelancerFn(freelancer: Freelancer){
    return freelancer ? freelancer.fullName : '';
  }

  get freelancerSelected() : boolean{
    return this.frmFreelancerPayment.get('freelancer').value instanceof Freelancer;
  }

  validate(): boolean{
    if(this.rxhs.length<=0){
      this.toast.warning('Debe ingresar por lo menos un recibo');
      return false;
    }
    if( !this.rxhs.controls.map( c => c.get('confirmed').value as boolean ).reduce( (prev,curr) => prev && curr  ) ){
      this.toast.warning('Debe confirmar los recibos ingresados');
      return false;
    }
    return true;
  }
}
