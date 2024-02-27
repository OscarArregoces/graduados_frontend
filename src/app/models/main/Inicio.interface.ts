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
    name: string;
}
export interface Genero {
    name: string;
}
export interface TipoDocumento {
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
