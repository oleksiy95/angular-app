import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { User, Post } from '../models';

@Injectable()
export class UserService {
    constructor (private apiService: ApiService) {}
    
    getUsers(): Observable<User[]> {
        return this.apiService.get('/users');
    }
    
    getUser(id): Observable<User> {
        return this.apiService.get(`/users/${id}`);
    }

    getUserPosts(id): Observable<Post[]> {
        return this.apiService.get(`/users/${id}/posts`);
    }

    makePost(userId, post: Post): Observable<Post> {
        return this.apiService.post(`/users/${userId}/posts`, post);
    }

    suggestUsersToFollow(userId): Observable<User[]> {
        return this.apiService.get(`/users/${userId}/follow`);
    }

    followTo(userId, followId): Observable<boolean> {
        return this.apiService.get(`/users/${userId}/follow/${followId}`);
    }
}