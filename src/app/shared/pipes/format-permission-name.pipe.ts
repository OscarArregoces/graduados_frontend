import { Pipe, PipeTransform } from '@angular/core';

interface BaseName {
  [key: string]: string;
}


@Pipe({
  name: 'formatPermissionName'
})
export class FormatPermissionNamePipe implements PipeTransform {
  transform(oldName: string): string {
    return baseName[oldName] || oldName;
  }

}

const baseName: BaseName = {
  auth_module: 'Autentificación',
  user: 'Usuarios',
  document_types: 'Tipo Documentos',
  faculties: 'Facultades',
  genders: 'Generos',
  headquarters: 'Sedes',
  programs: 'Programas',
  classified_advertisements: 'Clasificados',
  categoria: 'Categorias',
  tiposcapacitaciones: 'Tipo Capacitaciones',
  subcategoria: 'Subcategorias',
  anuncio: 'Emprendimientos',
  detalles: 'Verificar Emprendimiento',
  pqrs: 'PQRS',
  tipopqrs: 'Tipo PQRS',
  asignacion: 'Asignación',
  encuestas: 'Encuestas',
  answer: 'Llenar Encuestas',
  tipomomento: 'Tipo Momentos',
  question: 'Preguntas',
  eventos: 'Eventos',
  eventosarea: 'Areas',
  tipoevento: 'Tipo Eventos',
  subareaeventos: 'Subareas',
  asistencia: 'Asistencia',
  admin: 'Administrador',
  roles: 'Roles',
}