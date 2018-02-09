import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['Stable', 'Critical', 'Finished'];
  signupForm: FormGroup;
  forbiddenProjectNames = ['Test', 'Result', 'test', 'result'];



  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'projectname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],
        this.forbiddenEmails),
      }),
      'gender': new FormControl('Stable')
    });

    this.signupForm.statusChanges.subscribe(
        (status) => console.log(status)
    );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout( () =>{
        if (control.value === 'test@gamail.com'){
          resolve({'emailForbidden': true});
        } else {
          resolve(null);
        }
      },1500)
    });
    return promise;
  }
}
