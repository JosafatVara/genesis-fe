import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { MatFormFieldModule, MatInputModule, MatHorizontalStepper, MatStep } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quotation, QuotationDetail } from '../../shared/models/quotation';
import { FormArray, FormControl } from '@angular/forms/src/model';
import { Customer } from '../../shared/models/customer';
import { CustomerService } from '../../core/services/customers.service';
import { QuotationsService } from '../../core/services/quotations.service';
import { CustomersSearchPagedSpecification } from '../../core/services/specifications/customer-specification';
import { SimpleCrudService } from '../../core/utils/simple-crud/simple-crud.service';
import { CustomerModalCrudComponent } from '../../customers/customer-modal-crud/customer-modal-crud.component';
import { Observable } from "rxjs/Observable";
import { UsersService } from "../../core/services/users.service";

@Component({
    moduleId: module.id,
    selector: 'modal-crud',
    templateUrl: 'modal-crud.component.html',
    styleUrls: ['modal-crud.component.scss']
})
export class ModalCrudComponent {
    customerList: Customer[] = [];
    quotation: Quotation;
    quotationInformationFG: FormGroup;
    quotationDetailsFG: FormGroup;
    isAdmin: boolean;

    constructor(private customers: CustomerService, private quotations: QuotationsService
        , private simpleCrud: SimpleCrudService, private matDialog: MatDialog,
         private fb: FormBuilder, public thisDialogRef: MatDialogRef<ModalCrudComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { quotation: Quotation},
        private users: UsersService) {
        this.quotation = data.quotation;
        Observable.zip( this.users.getCurrentUser(), this.users.get() ).subscribe( rs => {
            let myRole = rs[1].find( u => u.id == rs[0].id).role.name;
            this.isAdmin = myRole.toLowerCase() == 'administrador';
        });
    }

    ngOnInit() {
        this.createForms();
        this.initializeFormsListeners();
        this.fillFormsModels();
    }

    createForms(){
        this.quotationInformationFG = this.fb.group({
            customer: [undefined, [Validators.required, this.customerMustBeCustomerValidation]],
            created: [undefined, [Validators.required]],
            
        });
        this.quotationDetailsFG = this.fb.group({
            details: this.fb.array([]),
            totalAmmount: 0
        });
    }

    initializeFormsListeners(){
        this.quotationDetailsFG.get('details').valueChanges.subscribe( () => {
            // let helperQuotation: Quotation = new Quotation({ details: this.details.value })
            // this.quotationDetailtsFG.patchValue({
            //     subtotal: helperQuotation.subtotal,
            //     igv: helperQuotation.igv,
            //     totalAmmount: helperQuotation.totalAmmount
            // });
        });
        this.quotationInformationFG.get('customer').valueChanges.debounceTime(500).subscribe( cust => {
            if(cust instanceof Customer || cust == "") {
                this.customerList = [];
            }else{
                this.customers.getList(new CustomersSearchPagedSpecification(cust, 1, 10)).subscribe( custs => {
                    this.customerList = custs;
                })
            }
        });
    }

    customerMustBeCustomerValidation(customerControl: FormControl){
        if(customerControl.value instanceof Customer) return null;
        else return { required: true };
    }

    fillFormsModels(){
        if(this.quotation){
            this.quotationInformationFG.patchValue(this.quotation);
            let quotationDetailsFAs: FormArray[] = this.quotation.details.map( d => this.quotationDetailAsFormArray(d) );
            this.quotationDetailsFG.setControl('details', this.fb.array(quotationDetailsFAs));
        }
    }

    quotationDetailAsFormArray(detail: QuotationDetail){
        let fg = detail.map( field => this.fb.group({ label: field.label, value: field.value }));
        return this.fb.array(fg);
    }

    fillDataModels(){

    }

    get details(): FormArray{
        return this.quotationDetailsFG.get('details') as FormArray;
    }

    displayCustomerFn(customer: Customer): string{
        return customer? customer.businessName : '';
    }

    addDetail(){
        this.simpleCrud.openManual('Agregar detalle a cotización')
        .subscribe( result => {
            if(!result) return;
            this.details.push( this.quotationDetailAsFormArray( result as QuotationDetail ) );
            
        });
    }

    editDetail(index: number){
        let detail = this.details.controls[index].value as QuotationDetail;
        this.simpleCrud.openManual('Editar detalle de cotización', detail)
        .subscribe( result => {
            if(!result) return;
            this.details.setControl(index, this.quotationDetailAsFormArray(result as QuotationDetail));
        });
    }

    removeDetail(index: number){
        this.details.removeAt(index);
    }

    createCustomer(){
        let dialogRef = this.matDialog.open(CustomerModalCrudComponent, {
            width: '800px',
            data: {
                action: 'create',
                customer: {}
            }
        });
        dialogRef.afterClosed().subscribe((result: Customer) => {
            if(result){
                debugger;
                this.quotationInformationFG.get('customer').setValue(result);
            }
        })
    }

    confirm() {
        this.thisDialogRef.close('confirm');
    }
}
