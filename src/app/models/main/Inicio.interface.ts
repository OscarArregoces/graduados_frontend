export interface Pais {
    id: number;
    name: string;
    sap: string;
}
export interface Departamento {
    id: number;
    name: string;
    pais: number;
}
export interface Ciudad {
    id: number;
    sap: string;
    name: string;
    departamento: number;
    pais?: number;
}

export interface Sede {
    id?: number;
    name: string;
}
export interface CondicionVulnerable {
    id?: number;
    name: string;
}
export interface Genero {
    id?: number;
    name: string;
}
export interface TipoDocumento {
    id?: number;
    name: string;
}
export interface Rol {
    id: number;
    name: string;
}
export interface InfoCarrera {
    programa: string;
    fecha_grado: Date | null;
    modalidad_grado: string;
    proyecto_grado: string;
    periodo_grado: string;
    numero_acta: string;
    numero_folio: string;
    sede: string;
    direccion_intitucional: string;
}
export interface CarreraTable {
    id?: number;
    programa: string;
}
export interface Graduado {
    id: number;
    fullname: string;
    nationality: string;
    identification: string;
    carreras: CarreraTable
}

export interface Persona {
    id: number;
    fullname: string;
    email: string;
    nationality: string;
    identification: string;
    gender_type: Genero;
    phone?: string;
}

export interface UserInternal {
    id: number;
    email: string;
    persona: Persona;
    groups: [{ name: string, id: number }]
}

export interface Funcionario {
    persona: Persona;
    roles: Rol[]
}
