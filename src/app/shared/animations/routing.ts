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
        transition('login => select-enterprise-to-manage',[
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
        ]),
        transition('authentication => dashboard',[
            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('0.5s', style({ opacity: 1 })),
                    animateChild()
                ],{ optional: true }),
                // group([
                    query( ':leave .authentication--left',[
                        style({ transform : 'translateX(0%)' }),
                        animate('0.5s ease-in-out', style({ transform : 'translateX(-100%)' }))
                    ],{ optional: true }),
                    query( ':leave .authentication--left *',[
                        style({ opacity : 1 }),
                        animate('0.5s ease-in-out', style({ opacity : 1 }))
                    ],{ optional: true }),
                    query( ':leave .authentication--right',[
                        style({ transform : 'translateX(0%)' }),
                        animate('0.5s ease-in-out', style({ transform : 'translateX(100%)' }))
                    ],{ optional: true }),
                // ]),
            ])
        ]),
        transition('dashboard => authentication',[
            group([
                query(':leave', [
                    style({ opacity: 1 }),
                    animate('0.5s', style({ opacity: 1 })),
                    animateChild()
                ],
                { optional: true }),
                // group([
                    query( ':enter .authentication--left',[
                        style({ transform : 'translateX(-100%)' }),
                        animate('0.5s ease-in-out', style({ transform : 'translateX(0%)' }))
                    ],{ optional: true }),
                    query( ':enter .authentication--right',[
                        style({ transform : 'translateX(100%)' }),
                        animate('0.5s ease-in-out', style({ transform : 'translateX(0%)' }))
                    ],{ optional: true }),
                // ]),
            ])
        ]),
    ])

}
