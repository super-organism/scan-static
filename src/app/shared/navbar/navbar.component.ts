import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser = {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast :ToastComponent
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
    this.toast.setMessage('you successfully logout ,going to login!', 'success');
    setTimeout(() => { this.router.navigate(['/auth']); }, 2000);
  }
}
