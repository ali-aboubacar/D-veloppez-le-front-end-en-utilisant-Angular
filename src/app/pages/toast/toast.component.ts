import { Component, OnInit } from "@angular/core";
import { ToastType } from "src/app/core/models/toast";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit{
    private messageField: string = '';
    private toastTypeField: ToastType = 'info'

    constructor(private toastService: ToastService){

    }
    ngOnInit(): void {
        this.toastService.toastEvent.pipe().subscribe((data) => {
            this.messageField = data.message;
            this.toastTypeField = data.type
        }) 
    }

    public get message(){
        return this.messageField;
    }

    public get toastType(){
        return this.toastTypeField
    }
}