import { Component, OnInit, Input } from '@angular/core';
import { ProviderPayment } from '../../shared/models/provider-payment';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProvidersPaymentsService } from '../../core/services/providers-payments.service';
import { ProviderService } from '../../core/services/providers.service';
import { ToastService } from '../../core/utils/toast/toast.service';
import { Observable } from 'rxjs/Observable';
import { Provider } from '../../shared/models/provider';
import { ProvidersByNameSpecification } from '../../core/services/specifications/provider-specification';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'gen-provider-payment-details',
  templateUrl: './provider-payment-details.component.html',
  styleUrls: ['./provider-payment-details.component.scss']
})
export class ProviderPaymentDetailsComponent extends CrudComponent<ProviderPayment> implements OnInit {

  @Input('providerPayment') freelancerPayment: ProviderPayment;
  
  public get title(): string{
    return 'Datos del pago a proveedor'
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
  public frmProviderPayment: FormGroup;
  public providerList: Provider[] = [];

  constructor(freelancersPayments: ProvidersPaymentsService, private providers: ProviderService, 
    private fb: FormBuilder, private toast: ToastService) { 
    super(freelancersPayments);    
  }

  ngOnInit() {
    this.managedEntity = this.mode != 'create'? this.freelancerPayment :
      new ProviderPayment({ 
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1
      });
    this.createForms();  
    this.fillFormsModels();
    this.createFormsListeners();
  }

  createForms(){
    this.frmProviderPayment = this.fb.group({
      provider: [undefined, [Validators.required]],
      rxhs: this.fb.array([]),
      year: [0,[Validators.required]],
      month: [0, [Validators.required]]
    });
  }

  createFormsListeners(){
    this.frmProviderPayment.get('provider')
      .valueChanges.debounceTime(500).subscribe( name => {
        if( !(name instanceof Provider) ){
          this.providers.get(new ProvidersByNameSpecification(name))
          .subscribe( lists => {
            this.providerList = lists;
          });
        }else{
          this.providerList = [];
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
      this.frmProviderPayment.setControl('rxhs',this.fb.array(rxhFGs));
    }
    this.frmProviderPayment.patchValue({ year: this.managedEntity.year, month: this.managedEntity.month });
    // this.providers.get().subscribe( fs => {
    //   if(fs.length<=0) return;
    //   if(this.mode != 'create'){
    //     this.frmProviderPayment.patchValue({ freelancer: 
    //       this.managedEntity.provider? fs.find( f => f.id == this.managedEntity.provider.id ) : undefined });
    //   }
    // });
  }

  fillDataModels(){

  }

  get rxhs(): FormArray{
    return this.frmProviderPayment.controls['rxhs'] as FormArray;
  }

  addRxh(){
    if(!this.frmProviderPayment.valid && this.rxhs.length != 0){
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

  displayProviderFn(provider: Provider){
    return provider ? provider.fullName : '';
  }

  get providerSelected() : boolean{
    return this.frmProviderPayment.get('provider').value instanceof Provider;
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
