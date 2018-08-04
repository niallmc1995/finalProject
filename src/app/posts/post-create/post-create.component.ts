import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    enteredContent = '';
    enteredTitle = '';
    private mode = 'create';
    private postId: string;
    isLoading = false;
    form: FormGroup;
    post: Post;
    imagePreview: string;


    constructor(public postsService: PostsService, public route: ActivatedRoute) { }

    ngOnInit() {
        this.form = new FormGroup({
            'title': new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            content: new FormControl(null, {
                validators: [Validators.required]
            }),
            image: new FormControl(null, {
                validators: [Validators.required], asyncValidators: [mimeType]
            })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id,
                        title: postData.title,
                        content: postData.content,
                        imagePath: postData.imagePath
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath
                    });
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    // onAddPost() {
    //     if (this.form.invalid) {
    //         return;
    //     }

    //     this.postsService.addPost(this.form.value.title, this.form.value.content);
    //     this.form.reset();
    //     // const post: Post = {
    //     //   title: form.value.title,
    //     //   content:form.value.content };
    //     // this.postCreated.emit(post);
    //     // this.postsService.addPost(form.value.title, form.value.content);
    // }


    onImagePicked(event: Event) {
        //telling application that the input will be taking in files
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }


    onSavePost() {
        //this is checking if the image that will be uploaded is valid eg. not pdf or video etc
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
        } else {
            this.postsService.updatePost(
                this.postId,
                this.form.value.title,
                this.form.value.content,
                this.form.value.image
            );
        }
        this.form.reset();
    }
}
