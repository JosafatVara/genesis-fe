import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatFormFieldModule, MatInputModule, MatHorizontalStepper, MatStep } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quotation, QuotationDetail } from '../../shared/models/quotation';
import { FormArray, FormControl } from '@angular/forms/src/model';
import { Customer } from '../../shared/models/customer';
import { CustomerService } from '../../core/services/customers.service';
import { QuotationsService } from '../../core/services/quotations.service';
import { CustomersSearchPagedSpecification } from '../../core/services/specifications/customer-specification';
import { SimpleCrudService } from '../../core/utils/simple-crud/simple-crud.service';

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

    constructor(private customers: CustomerService, private quotations: QuotationsService
        , private simpleCrud: SimpleCrudService,
         private fb: FormBuilder, public thisDialogRef: MatDialogRef<ModalCrudComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { quotation: Quotation}) {
        this.quotation = data.quotation;
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
            subtotal: 0,
            igv: 0,
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
            this.details.push( this.quotationDetailAsFormArray( result as QuotationDetail ) );
        });
    }

    confirm() {
        this.thisDialogRef.close('confirm');
    }
}
