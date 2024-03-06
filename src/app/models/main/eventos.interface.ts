
export interface Modalidad {
    id: number;
    name: string;
}
export interface Dependencia {
    id: number;
    name: string;
}
export interface Servicio {
    id: number;
    name: string;
}
export interface Responsable {
    id?: number;
    fullname: string;
    phone: string;
    email: string;
    document: string;
    rol: string;
    dedicacion: string;
    vinculacion: string;
}