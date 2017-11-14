import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffPayment } from '../../shared/models/staff-payment';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Employee } from '../../shared/models/employee';
import { StaffPaymentsService } from '../../core/services/staff-payments.service';
import { EmployeesService } from '../../core/services/employees.service';
import { EmployeesByNameSpecification } from "../../core/services/specifications/employee-specification";

@Component({
  selector: 'gen-staff-payment-details',
  templateUrl: './staff-payment-details.component.html',
  styleUrls: ['./staff-payment-details.component.scss']
})
export class StaffPaymentDetailsComponent extends CrudComponent<StaffPayment> implements OnInit {

  staffPaymentForm: FormGroup;
  plameForm: FormGroup;
  paymentForm: FormGroup;
  
  @Input('payment') payment: StaffPayment;
  public employeeList: Array<Employee>;
  private payments: StaffPaymentsService;

  constructor(payments: StaffPaymentsService, private employees: EmployeesService, private fb: FormBuilder){ 
    super(payments);
    this.managedEntity = new StaffPayment();
    this.payments = payments;
    this.createForms();
  } 

  ngOnInit() {
    this.validateMode();
    this.managedEntity = this.mode == 'create' ? new StaffPayment({year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1}) : this.payment;
    this.createFormsListeners();
    this.fillFormsModels();
    this.disableFormsControls();
  }

  //#region FormManagement
  createForms(){
    this.staffPaymentForm = this.fb.group({
      employee: [undefined, [Validators.required]],
      year: [0,[Validators.required]],
      month: [0, [Validators.required]],
      plame: this.plameForm,
      payment: this.paymentForm
    })
    this.plameForm = this.fb.group({});
    this.paymentForm = this.fb.group({
      basePay: [0,[Validators.required]],      
      netTotalAmmount: [0,[Validators.required]],
      incentives: this.fb.array([]),
      discounts: this.fb.array([])
    });
  }

  private disableFormsControls(){
  }

  createFormsListeners(){
    this.staffPaymentForm.get('employee')
      .valueChanges.debounceTime(500).subscribe( name => {
        if( !(name instanceof Employee) ){
          this.employees.get(new EmployeesByNameSpecification(name))
          .subscribe( es => {
            this.employeeList = es;
          });
        }else{
          this.employeeList = [];
        }
      });
  }

  displayEmployeeFn(employee: Employee){
    return employee ? employee.fullName : '';
  }

  get employeeSelected() : boolean{
    return this.staffPaymentForm.get('employee').value instanceof Employee;
  }

  private fillFormsModels(){
    this.staffPaymentForm.patchValue({ year: this.managedEntity.year, month: this.managedEntity.month });
  }
  //#endregion  

  protected fillDataModels(){
    this.managedEntity = this.paymentForm.value;
  }

  private fillSelects(): void{
    // if(this.mode=='create'){
    //   this.paymentForm.get('employee').setValue(this.employeeList[0]);
    // }else{
    //   this.paymentForm.get('employee').setValue(
    //     this.managedEntity.employee? this.employeeList.find( r => r.id == this.managedEntity.employee.id):undefined );
    // }
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
