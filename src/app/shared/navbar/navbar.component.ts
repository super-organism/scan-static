import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastComponent } from '../toast/toast.component';
import { User } from '../user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser ={
    nickname:'',
    username:'',
    is_admin:false,
    group:'',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    public toast :ToastComponent
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.authService.getUser().subscribe(
      res => {this.currentUser = res},
      error=>{}
    );
  }

  logout() {
    this.authService.deleteToken();
    this.toast.setMessage('Message','you successfully logout ,going to login!', 'success');
    setTimeout(() => { this.router.navigate(['/auth','signin']); }, 2000);
  }
}
