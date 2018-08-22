import { Component, Inject } from "../../../node_modules/@angular/core";
import { MAT_DIALOG_DATA } from "../../../node_modules/@angular/material";

@Component({
    templateUrl: './error.component.html',
    selector: "app-error",
})
// this is for a standard functionality for displaying a message for the case of an error message to be displayed
// also styling the component that is dispayed by using angular material components and styilng
export class ErrorComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}){}
}