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
export interface EstadoEvento {
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
export interface UserEvento {
    id?: number;
    email: string;
    fullname: string;
    funcionario: boolean;
    graduado: boolean;
    phone: string;
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
    estado_actividad: EstadoEvento;
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

export interface MiActividad {
    actividad: Actividad[];
    confirmacion: boolean;
    asistencia: boolean;
    ponentes: {
        vinculacion: ResponsableVinculacion[],
        externos: Responsable[]
    };
}

export enum OptionAsistencia {
    MethodQr = 1,
    MethodSearch = 2
}