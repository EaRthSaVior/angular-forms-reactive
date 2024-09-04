import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }
  onSubmit() {
    console.log(this.signupForm.value);
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
}
