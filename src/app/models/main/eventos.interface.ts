import { Sede } from "./Inicio.interface";

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

export interface Area {
    id: number;
    name: string;
}
export interface Subarea {
    id: number;
    area?: Area
    name: string;
}
export interface TipoActividad {
    id: number;
    name: string;
}
export interface ActividadTable {
    id: number;
    nombre_actividad: string;
    tipo_actividad: TipoActividad;
    dependencia: Dependencia;
    sede: Sede;
    modalidad: string;
}
export interface Actividad {
    id: number;
    area: Area;
    subarea: Subarea
    tipo_actividad: TipoActividad;
    servicios: Servicio[];
    dependencia: Dependencia;
    sede: Sede;
    userCreate: {
        person: {
            fullname: string;
        }
    }
    nombre_actividad: string;
    fecha_inicio: Date | string;
    fecha_final: Date | string;
    descripcion: string;
    objetivo: string;
    modalidad: string;
    enlace_reunion: string;
    direccion: string;
}

export interface ResponsableVinculacion {
    user: {
        fullname: string;
        email: string;
        phone: string;
    },
    rol: string;
    vinculacion: string;
    dedicacion: string;
}