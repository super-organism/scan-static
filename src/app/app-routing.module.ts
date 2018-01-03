import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardLogin } from './core/auth-guard-login.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: 'app/tasks/tasks.module#TasksModule', canActivate: [AuthGuardLogin] },
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
