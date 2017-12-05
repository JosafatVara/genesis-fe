export class SelectDialogOption{
    value: any;
    label: string;
    color: string;
    bkColor: string;

    constructor(partial: Partial<SelectDialogOption>){
        Object.assign(this,partial);
        this.color = this.color || 'black';
        this.bkColor = this.bkColor || 'grey';
    }
}