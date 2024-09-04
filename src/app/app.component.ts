import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNames = ['aaac', 'bbb'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNamesValidator.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbiddenEmailsValidator]
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    // this.signupForm.statusChanges.subscribe((value) => console.log(value));
    this.signupForm.setValue({
      userData: {
        username: 'asdd',
        email: 'assda@dasd.com',
      },
      gender: 'male',
      hobbies: [],
    });
    this.signupForm.patchValue({
      userData: {
        username: 'patch username',
      },
    });
  }
  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

  onAddHobby() {
    const hobbyCtrl = new FormControl(null, Validators.required);
    this.hobbiesControls.push(hobbyCtrl);
  }
  get hobbiesControls(): FormArray {
    return this.signupForm.get('hobbies') as FormArray;
  }
  forbiddenNamesValidator(formCtrl: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(formCtrl.value) !== -1) {
      return { isForbiddenName: true };
    } else {
      return null;
    }
  }
  forbiddenEmailsValidator(
    formCtrl: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (formCtrl.value === 'test@gmail.com') {
          resolve({ isForbiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
}
