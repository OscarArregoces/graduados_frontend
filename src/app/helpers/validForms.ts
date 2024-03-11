import { FormGroup } from "@angular/forms";

export function ValidForm(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control instanceof FormGroup) {
            ValidForm(control);
        }
    });
}

export function ValidarDominioEmail(control: any) {
    const email = control.value;
    if (email && !/(.*@uniguajira.edu.co|.*@gmail.com)$/.test(email)) {
        return { dominioInvalido: true };
    }
    return null;
}

export function ValidarFechaPosterior(control: any) {
    const fechaControl = new Date(control.value);
    const fechaActual = new Date();

    if (fechaControl > fechaActual) {
        return { fechaPosterior: true };
    }
    return null;
}
export function ValidarFechaAnterior(control: any) {
    const fechaControl = new Date(control.value);
    const fechaActual = new Date();

    if (fechaControl < fechaActual) {
        return { fechaAnterior: true };
    }
    return null;
}