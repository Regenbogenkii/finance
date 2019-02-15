import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  signupForm: FormGroup
  userProfile
  errorMessage
  successSignupMessage
  successLoginMessage
  userUid = []
  hide = true
  constructor(private dataService: ServiceService, private router: Router) { }

  ngOnInit() {
    $('.no-paste').on("paste", function(e){
      e.preventDefault();
    })

    this.createForm()
  }

  createForm() {
      this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
      })
  }



  async onSignIn(val) {
    let temp = {
      'email': val.email,
      'password': val.password
    }
    await this.dataService.onSignIn(temp).then(res => {
      let dataUser = res.user
     // console.log("res sign in", res);
      this.errorMessage = "";
      this.successLoginMessage = "You Log in successfully";
      //console.log("res sign in uid", res.user.uid);
      this.dataService.onGetUserProfileByUid(res.user.uid).then(res => {
      //  console.log("sign in uid", res.uid);
        this.dataService.onSetUid(res.uid)
        this.router.navigate(['/finance']);
      })

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successLoginMessage = "";
    })
  }


}
