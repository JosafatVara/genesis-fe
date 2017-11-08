import { AbstractControl } from "@angular/forms";

export function Alphanumeric(control: AbstractControl){
    let value = control.value;
    if( !value || value == "" ){
        return null;
    }
    if(!/^[a-z0-9]+$/i.test(value)){
        return {alphanumeric:true};
    }else if(!/.*[0-9].*/.test(value)){
        return {alphanumeric:true};
    }else if(!/.*[a-z].*/i.test(value)){
        return {alphanumeric:true};
    }else{
        return null;
    }
}