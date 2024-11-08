import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      comments: ['', Validators.maxLength(500)], 
      gender: ['', Validators.required], 
      preferences: this.fb.array([], Validators.required),
      country: ['', Validators.required],
    });
  }

  get preferences(): FormArray {
    return this.userForm.get('preferences') as FormArray;
  }

  togglePreference(preference: string): void {
    const index = this.preferences.controls.findIndex((control) => control.value === preference);
    if (index !== -1) {
      this.preferences.removeAt(index);
    } else {
      this.preferences.push(this.fb.control(preference));
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please complete all required fields.');
    }
  }
}
