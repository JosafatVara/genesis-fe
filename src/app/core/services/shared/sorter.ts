import { Sort } from "@angular/material";
import { EventEmitter } from "@angular/core";

export class Sorter {
    public sort: Sort;
    public sortEvent: EventEmitter<any>;
}
