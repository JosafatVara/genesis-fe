import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupService } from '../../core/services/groups.service'
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { Group } from "../../shared/models/group";

@Component({
    moduleId: module.id,
    selector: 'group-modal-crud',
    templateUrl: 'group-modal-crud.component.html',
    styleUrls: ['group-modal-crud.component.scss']
})
export class GroupModalCrudComponent {

    public currentEnterprise: Enterprise;
    loader: boolean;
    btnLabel: string;
    groupForm: FormGroup;
    constructor(
        public thisDialogRef: MatDialogRef<GroupModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, group: Group },
        private fb: FormBuilder,
        private groupService: GroupService,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    }
    ngOnInit() {
        this.setValidateForm();
        this.setBtnLabel();
    }

    cancel() {
        this.thisDialogRef.close({ cancelled: true })
    }

    validateForm(data) {
        this.groupForm = this.fb.group({
            name: [data, Validators.required]
        });
    }

    setBtnLabel() {
        switch (this.data.action) {
            case 'create': this.btnLabel = 'crear'; break;
            case 'update': this.btnLabel = 'guardar'; break;
            default: break;
        }
    }

    setValidateForm() {
        this.data.action == 'update' ? this.validateForm(this.data.group.name) : this.validateForm('');
    }

    doAction() {
        switch (this.data.action) {
            case 'create':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    this.groupService.create(value, this.currentEnterprise.id).subscribe(res => this.thisDialogRef.close({ cancelled: false }))
                }
                break;
            case 'update':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    this.groupService.update(value, this.data.group.id).subscribe(res => this.thisDialogRef.close({ cancelled: false }))
                }
                break;
            default:
                break;
        }
    }

}
