import { FormGroup } from "@angular/forms";

export function ValidForm(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control instanceof FormGroup) {
            ValidForm(control);
        }
    });
}