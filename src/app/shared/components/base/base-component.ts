export class BaseComponent {

    protected isLoading: boolean = false;

    protected loadingOn():void {this.isLoading=true;}

    protected loadingOff():void {this.isLoading=false;}

}
