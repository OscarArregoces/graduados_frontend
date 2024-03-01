export interface Pais {
    name: string;
}
export interface Ciudad {
    name: string;
}
export interface Departamento {
    name: string;
}
export interface Sede {
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
export interface Graduado {
    id: number;
    fullname: string;
    email: string;
    nationality: string;
    identification: string;
    gender_type: {
        id: number,
        name: string;
    };
}

export interface Persona {
    id: number;
    fullname: string;
    email: string;
    nationality: string;
    identification: string;
    gender_type: Genero;
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