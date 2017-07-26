import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Post } from '../models';

@Injectable()
export class PostService {
    constructor (private apiService: ApiService) {}
    
    deletePost(id): Observable<boolean> {
        return this.apiService.delete(`/posts/${id}`);
    }
}