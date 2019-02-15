import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup
  errorMessage
  successSignupMessage
  userProfile
  userUid = []
  hide = true
  invalidEmail = false
  invalidConfirmEmail = false
  constructor(private dataService: ServiceService, private router: Router) { }

  ngOnInit() {
    $('.no-paste').on("paste", function(e){
      e.preventDefault();
    })
   
    this.createForm()
    this.onGetUserProfile()
  }

  createForm() {
    this.signupForm = new FormGroup({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required)
    })

  }


  onGetUserProfile() {
    this.dataService.onGetUserProfile().then(res => {
      console.log("get user profile", res);
      this.userProfile = res
      this.userProfile.forEach(ele => {
        this.userUid.push(ele.uid)
      })
      console.log("user uid", this.userUid);
    })
  }

  onSignUp(val) {
    let tempSignupData = {
      email: val.email,
      password: val.password,
    }
    this.dataService.onSignUp(tempSignupData).then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successSignupMessage = "Your account has been created";
      let dataUser = res.user
      let tempUser = {
        firstname: val.firstname,
        lastname: val.lastname,
        email: dataUser.email,
        uid: dataUser.uid
      }
      // this.userUid.forEach(ele => {
      // if (tempUser.uid != ele) {
      this.dataService.onCreateUserProfile(tempUser).then(res => {
      })
      // this.router.navigate(['/finance']);
      //  } else console.log("it is already existed");
      //})
      console.log("create user profile1: ", tempUser);

      //this.onGetUserProfile()
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successSignupMessage = "";
    })
  }

  onValidateEmail(el) {
    let str = el
    let checkAt = str.split('@')
    let checkDot = str.split('.')
    if(checkAt.length == 2 && checkDot.length == 2) this.invalidEmail = false
    else  this.invalidEmail = true
    // if(checkDot.length != 2 ) this.invalidEmail = true
    // else  this.invalidEmail = false
  console.log(checkAt.length , '-at-',   checkAt);
  console.log(checkDot.length , '-dot-',   checkDot);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  console.log("password::", group);
  // let pass = group.controls['password'].value;
  // let confirmPass = group.controls['confirmPassword'].value;
  let pass = group.value.password;
  let confirmPass = group.value.confirmPassword;
console.log("password::", pass);
console.log("confirmPass::", confirmPass);
if (pass === confirmPass) this.invalidConfirmEmail = false
else this.invalidConfirmEmail = true
  //return pass === confirmPass ? null : { notSame: true }     
}

}
