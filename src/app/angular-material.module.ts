import { NgModule } from "@angular/core";
import { MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

@NgModule({

exports: [
    MatProgressSpinnerModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
]
})

export class AngularMaterialModule {}

// this file is for handling all of the imports that any styling that is applied throughout the web application