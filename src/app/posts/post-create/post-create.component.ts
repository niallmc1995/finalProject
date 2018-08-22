import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { Subscription } from '../../../../node_modules/rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
    //here I am adding the variables that will be used throuought this file
    enteredContent = ''; // this will be handling the text entered content for a post
    enteredTitle = ''; // this will be handling the title text content for a post
    enteredmemeLink = ''; // this will be handling the meme link for the content
    private mode = 'create'; //the create functionality
    private postId: string;
    private authStatusSub: Subscription;
    isLoading = false;
    form: FormGroup;
    post: Post;
    imagePreview: string;


    constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) { }

    //here I am applying some custom form validation for creating a post
    //such as requiring certain lengths that must be entered before creation of a post
    
    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
               this.isLoading = false; 
            });
        this.form = new FormGroup({
            'title': new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            content: new FormControl(null, {
                validators: [Validators.required]
            }),
            image: new FormControl(null, {
                validators: [Validators.required], asyncValidators: [mimeType]
            }),
            memeLink: new FormControl(null, {
                validators: [Validators.required]
            }),
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
                        imagePath: postData.imagePath,
                        memeLink: postData.memeLink,
                        creator: postData.creator
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath,
                        memeLink: this.post.memeLink
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

// this function is telling the web app that the information that will be recieved will be in file form
    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

// this function here is making sure that the file that is being uploaded is meeting the requirements that I have specified
// and is making sure that the file uploaded meets the requirements of only being an image format
    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image, this.form.value.memeLink);
        } else {
            this.postsService.updatePost(
                this.postId,
                this.form.value.title,
                this.form.value.content,
                this.form.value.image,
                this.form.value.memeLink
            );
        }
        this.form.reset();
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
