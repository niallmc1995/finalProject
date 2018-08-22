import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

import { Post } from "./post.model";

// I have created a constant variable which can be used throughout this file for referring to a specific link
const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  //this function is for handling retrieving all of the posts regardless of author 
  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                memeLink: post.memeLink
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
       
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
      memeLink: string;
    }>(BACKEND_URL + id);
  }

  //this function is used when adding a new post, appending values to their respective fields
  //*REFERENCE*
  //I found out how to append a single field from Maximilian Schwarzmüller which I have referenced in the report,
  //which I then utilized to then add my other fields to be used throughout the web app
  //--https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/
  addPost(title: string, content: string, image: File, memeLink: string) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    postData.append("memeLink", memeLink);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  //this function is used to update a single post, it appends the new edited information and updates the original post information
  //*REFERENCE* */
  //I found out how to add this function and implement it from Maximilian Schwarzmüller which is referenced in the report 
  //After learning how to add a single field I then implemented it myself to suit the required fields that I would need
  updatePost(id: string, title: string, content: string, image: File | string, memeLink: string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
      postData.append("memeLink", memeLink);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        memeLink: memeLink,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }
//this function is for deleting a single post
  deletePost(postId: string) {
    return this.http
      .delete(BACKEND_URL + postId);
  }
}
