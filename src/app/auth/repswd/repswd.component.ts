import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { User } from '../../shared/user.model';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-repswd',
  templateUrl: './repswd.component.html',
  styleUrls: ['./repswd.component.scss']
})
export class RepswdComponent implements OnInit {
  rePswdForm: FormGroup;
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  repassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('repassword').value
      ? null : { 'mismatch': true };
  };
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
    this.rePswdForm = this.formBuilder.group({
      password: this.password,
      repassword: this.repassword
    },
      { validator: this.passwordMatchValidator }
    )
  }
  submit() {
    this.authService.reSetPasswd(this.rePswdForm.value.password).subscribe(
      res => {
        this.authService.saveToken(res.token);
        this.toast.setMessage('Message','you successfully registered!', 'success');
        this.router.navigate(['/home']);
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
