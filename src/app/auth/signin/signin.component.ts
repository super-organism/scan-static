import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  credentials: any;
  signInForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    this.validateEmail
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  validateEmail(c: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@yto.net.cn$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public toast: ToastComponent
  ) { }

  ngOnInit() {
    this.setForm()
  }

  setForm() {
    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
  submit() {
    this.credentials={
      username:this.signInForm.value.email,
      password:this.signInForm.value.password
    }
    this.authService.signIn(this.credentials).subscribe(
      res => {
        this.authService.saveToken(res.token);
        this.toast.setMessage('Message','you successfully login ,going to home!', 'success');
        setTimeout(() => { this.router.navigate(['/home','list']); }, 2000);
        
      },
      error => { 
        console.log(error)
        if (error.error instanceof Array) {
          for (let index = 0; index < error.error.length; index++) {
            const element = error.error[index];
            this.toast.setMessage('Message',element, 'danger')
          }
        } else {
          for (const key in error.error) {
            if (error.error.hasOwnProperty(key)) {
              const element = error.error[key];
              this.toast.setMessage(key,element, 'danger')
            }
          }
        }
      }
    );

  }
}
