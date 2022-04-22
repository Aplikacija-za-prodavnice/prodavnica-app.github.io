import { Component,  OnInit} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter} from 'rxjs';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form:FormGroup | undefined;
  private readonly regex = "^(([^<>()[\]\\.,;:\s@\"]+)|([A-z0-9]+.[A-z0-9]+)*)@(([a-zA-Z\-0-9]+[\.])+[a-zA-Z]{2,4})$";
  public subscription;

  email:FormControl=new FormControl("",[Validators.required,Validators.pattern(this.regex)]);
  password:FormControl=new FormControl("",[Validators.required,Validators.minLength(8)]);
  constructor(fb:FormBuilder) {
    this.form=fb.group({
      "email":this.email,
      "password":this.password,
    });
    this.subscription =this.form.valueChanges
    .pipe(filter(ev=>(this.form?.valid===true)))
    .subscribe(data=>{console.log(JSON.stringify(data));document.getElementById("loginButton")?.setAttribute("disabled","false");},()=>{},()=>{console.log("completed")});
  }



  ngOnInit(): void {
  }

  funkcija(){
    this.subscription.unsubscribe();
    //Da li se ovako brise Observable ?
    const login=new RegisterComponent(new FormBuilder());
    login.subscription.unsubscribe();
  }
}
