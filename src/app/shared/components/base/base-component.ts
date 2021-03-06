export class BaseComponent {

    protected error: boolean = false;

    public isLoading: boolean = false;

    protected loadingOn():void {this.isLoading=true;}

    protected loadingOff():void {this.isLoading=false;}

    protected errorOn(): void {this.error=true;}

    protected errorOff(): void {this.error=false;}

    public openDatePicker(datepicker:any):void{
      datepicker.open();
  }

}
