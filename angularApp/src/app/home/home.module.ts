import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth.guard';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PostContainerComponent } from './post-container/post-container.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendsComponent } from './trends/trends.component';
import { ToFollowComponent } from './to-follow/to-follow.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }])

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [HomeComponent, PersonalInfoComponent, PostContainerComponent, TrendsComponent, ToFollowComponent],
  providers: [AuthGuard]
})
export class HomeModule { }
