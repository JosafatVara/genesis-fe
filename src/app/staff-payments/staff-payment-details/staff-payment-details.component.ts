import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffPayment } from '../../shared/models/staff-payment';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Employee } from '../../shared/models/employee';
import { StaffPaymentsService } from '../../core/services/staff-payments.service';
import { EmployeesService } from '../../core/services/employees.service';

@Component({
  selector: 'gen-staff-payment-details',
  templateUrl: './staff-payment-details.component.html',
  styleUrls: ['./staff-payment-details.component.scss']
})
export class StaffPaymentDetailsComponent extends CrudComponent<StaffPayment> implements OnInit {

  plameForm: FormGroup;
  paymentForm: FormGroup;
  
  @Input('payment') payment: StaffPayment;
  public employeeList: Array<Employee>;
  private payments: StaffPaymentsService;

  constructor(payments: StaffPaymentsService, private employees: EmployeesService, private fb: FormBuilder){ 
    super(payments);
    this.managedEntity = new StaffPayment();
    this.employeeList = [new Employee({firstName: '---', lastName: '---'})];
    this.payments = payments;
    this.createForms();
  } 

  ngOnInit() {
    this.validateMode();
    this.managedEntity = this.payment || this.managedEntity;
    this.fillFormsModels();
    this.employees.get().subscribe( results => {
      this.employeeList = results;
      this.fillSelects();
    });
    this.disableFormsControls();
  }

  //#region FormManagement
  createForms(){
    this.plameForm = this.fb.group({});
    this.paymentForm = this.fb.group({
      paymentDate: [new Date(),Validators.required],
      employee: [undefined,Validators.required],
      basePay: [0,[Validators.required]],
      payPerFamiliar: [0,[Validators.required]],
      bonus: [0,[Validators.required]],
      remuneration: [0,[Validators.required]],
      AFPAmmount: [0,[Validators.required]],
      insurance: [0,[Validators.required]],
      commission: [0,[Validators.required]],
      gratification: [0,[Validators.required]],
      mobility: [0,[Validators.required]],
      prepayment: [0,[Validators.required]],
      loan: [0,[Validators.required]],
      totalDiscount: [0,[Validators.required]],
      salaryToPay: [0,[Validators.required]],
      essalud: [0,[Validators.required]],
      totalContributions: [0,[Validators.required]]
    });
  }

  private disableFormsControls(){
    this.paymentForm.get('basePay').disable();
    this.paymentForm.get('remuneration').disable();
    this.paymentForm.get('AFPAmmount').disable();
    this.paymentForm.get('totalDiscount').disable();
    this.paymentForm.get('salaryToPay').disable();
    this.paymentForm.get('essalud').disable();
    this.paymentForm.get('totalContributions').disable();
  }

  private fillFormsModels(){
    this.paymentForm.patchValue(this.payment);
  }
  //#endregion  

  protected fillDataModels(){
    this.managedEntity = this.paymentForm.value;
  }

  private fillSelects(): void{
    if(this.mode=='create'){
      this.paymentForm.get('employee').setValue(this.employeeList[0]);
    }else{
      this.paymentForm.get('employee').setValue(
        this.managedEntity.employee? this.employeeList.find( r => r.id == this.managedEntity.employee.id):undefined );
    }
  }

  public get title(): string{
    // switch (this.mode){
    //   case 'create': return 'Crear pago';
    //   case 'update': return 'Actualizar pago';
    //   case 'read': return 'Este pago...';
    // }
    return 'Datos del pago a Planilla';
  }

  public get buttonLabel(): string{
    let lbl = "";
    switch (this.mode){
      case 'create': lbl = 'Crear pago'; break;
      case 'update': lbl = 'Actualizar pago'; break;
      case 'read': lbl = 'OK'; break;
      default: lbl = '---'; break;
    }
    return lbl;
  }


}
