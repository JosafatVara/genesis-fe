import { trigger, transition, group, query, style, animate, animateChild } from "@angular/animations";

export class Routing {

    public static animation = trigger('routingAnimation',[
        transition('login => recovery-password',[
            group([
                query(':enter',[
                    style({transform: 'translate(300%,-50%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translate(0%,-50%)'})),
                    animateChild()
                ]),
                query(':leave',[
                    style({transform: 'translate(0%,-50%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translate(-300%,-50%)'})),
                    animateChild()
                ])
            ])
        ]),
        transition('recovery-password => login',[
            group([
                query(':enter',[
                    style({transform: 'translate(-300%,-50%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translate(0%,-50%)'})),
                    animateChild()
                ]),
                query(':leave',[
                    style({transform: 'translate(0%,-50%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translate(300%,-50%)'})),
                    animateChild()
                ])
            ])
        ])
    ])

}
