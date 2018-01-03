import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { Group } from '../../shared/group.model';
import { User } from '../../shared/user.model';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  groups: Group[];
  user :User;
  signUpForm: FormGroup;
  passwordGroup: FormGroup;
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
  repassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  nickname = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  usergroup = new FormControl('1', [
    Validators.required
  ]);

  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public toast: ToastComponent

  ) { }


  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('repassword').value
      ? null : { 'mismatch': true };
  }
  validateEmail(c: FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@yto.net.cn$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  ngOnInit() {
    this.getUserGroup()
    this.setForm();
  }

  setForm() {
    this.passwordGroup = this.formBuilder.group({
      password: this.password,
      repassword: this.repassword
    },
    { validator: this.passwordMatchValidator }
    )
    this.signUpForm = this.formBuilder.group({
      nickname: this.nickname,
      email: this.email,
      passwordGroup: this.passwordGroup,
      usergroup :this.usergroup
    });
  }

  getUserGroup() {
    this.authService.getGroup().subscribe(
      res => this.groups = res 
    );
  }

  submit() {
    this.user ={
      nickname:this.signUpForm.value.nickname,
      username:this.signUpForm.value.email,
      password: this.signUpForm.value.passwordGroup.password,
      group:this.signUpForm.value.usergroup
    }
    this.authService.signUp(this.user).subscribe(
      res => {
        this.authService.saveToken(res.token);
        this.toast.setMessage('Message','you successfully registered ,going to home!', 'success');
        setTimeout(() => { this.router.navigate(['/home','list']); }, 2000);
      },
      error => { 
        if (error.error instanceof Array) {
          for (let index = 0; index < error.length; index++) {
            const element = error[index];
            this.toast.setMessage('Message', element, 'danger')
          }
        }else{
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
