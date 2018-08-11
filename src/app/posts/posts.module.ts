import { NgModule } from "@angular/core";
import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "../../../node_modules/@angular/common";
import { RouterModule } from "../../../node_modules/@angular/router";

@NgModule({
declarations: [
    PostCreateComponent,
    PostListComponent
],

imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
]
})

export class PostsModule {}