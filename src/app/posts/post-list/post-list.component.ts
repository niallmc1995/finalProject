import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { PageEvent } from '../../../../node_modules/@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title: 'First Post', content: 'This is the first post\'s content'},
    //     {title: 'Second Post', content: 'This is the second post\'s content'},
    //     {title: 'Third Post', content: 'This is the third post\'s content'},
    // ];

    //here I am declaring all of the variables that will be needed for the post list
    posts: Post[] = []; //the posts/post
    isLoading = false; //the loading spinner
    totalPosts = 0;
    postsPerPage = 5; //specifying the amount of posts that will be displayed per page
    currentPage = 1; // specifying the page that will be started on
    pageSizeOptions = [1, 2, 5, 10]; //specifying the options for the amount of posts to be viewed per page
    userIsAuthenticated = false; //automatically setting any users authentication to be false as they will be required to log in
    userId: string; //the users unique id given to then after they sign up and login
    private postsSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public postsService: PostsService, private authService: AuthService) { }

    /*this function is applying our variables for:
     * the posts per page
     * making sure that the user is authenticated
     * firing the action to ru the spinner when required to do so
     * retreiving the posts on the posts list page

    */
    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, 1);
        this.userId = this.authService.getUserId();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((postData: { posts: Post[], postCount: number }) => {
                this.isLoading = false;
                this.totalPosts = postData.postCount;
                this.posts = postData.posts;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();

            });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }


    onDelete(postId: string) {
        this.isLoading = true;
        this.postsService.deletePost(postId).subscribe(() => {
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        }, () => {
            this.isLoading = false;
        });
    }


    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }
}
