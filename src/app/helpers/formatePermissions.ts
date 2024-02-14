interface Permission {
    id: number;
    name: string;
}

interface Submodule {
    title: string;
    permissions: Permission[];
}

interface Module {
    id: number;
    title: string;
    submodules: Submodule[];
}

interface Base {
    [key: string]: string[]
}

interface Payload {
    role: string;
    permissions: Permission[]
}

export function FormatePermissionsToCreate(originalData: any): Module[] {
    const modules: Module[] = [];
    for (const key in originalData) {
        if (originalData.hasOwnProperty(key)) {
            const moduleData = originalData[key];
            const module: Module = {
                id: modules.length + 1,
                title: key,
                submodules: [],
            };

            for (const submoduleKey in moduleData) {
                if (moduleData.hasOwnProperty(submoduleKey)) {
                    const permissions = moduleData[submoduleKey].map((permission: string, index: number) => ({
                        id: index + 1,
                        name: permission,
                    }));
                    const submodule: Submodule = {
                        title: submoduleKey,
                        permissions: permissions,
                    };
                    module.submodules.push(submodule);
                }
            }
            modules.push(module);
        }
    }
    return modules
}


export function RemoveFirstPermission(array: any[]) {
    const resultado = array.map((elemento) => {
        const palabras = elemento.split(" ");
        palabras.shift();
        return palabras.join(" ");
    });

    return resultado;
}

export function FormatePermissionsToShow(obj: any, resultados: string[] = [], clavePadre?: string): string[] {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            FormatePermissionsToShow(obj[key], resultados, key);
        } else if (Array.isArray(obj[key]) && obj[key].includes('gestionar')) {
            // const clave = clavePadre ? `${key}` : key;
            const clave = clavePadre ? `${clavePadre} ${key}` : key;
            //             resultados.push(`${clave} gestionar`);
            resultados.push(`${clave} gestionar`);
        } else {
            const clave = clavePadre ? `${key}` : key;
            obj[key].forEach((item: any) => {
                resultados.push(`${clave} ${item}`);
            })

        }
    }
    return resultados;
}
export function FormatePermissionsToSend(roleName: string, selectedPermissions: any[]) {
    const payload: Payload = {
        role: "",
        permissions: []
    }
    const base: Base = {
        user: [],
        document_types: [],
        faculties: [],
        genders: [],
        headquarters: [],
        programs: [],
        categoria: [],
        tiposcapacitaciones: [],
        subcategoria: [],
        anuncio: [],
        detalles: [],
        pqrs: [],
        tipopqrs: [],
        asignacion: [],
        answer: [],
        tipomomento: [],
        question: [],
        eventosarea: [],
        tipoevento: [],
        subareaeventos: [],
        evento: [],
        asistencia: [],
        roles: []
    }

    selectedPermissions.forEach((permission: string) => {
        if (permission.split(' ').length === 2) {
            let submodule: string | undefined = permission.split(' ').shift();
            submodule !== undefined && base[submodule].push('gestionar');
        } else {
            let submodule: string | undefined = permission.split(' ').pop()?.toLocaleLowerCase();
            submodule !== undefined && base[submodule].push(permission);
        }
    });

    payload.role = roleName;
    for (const key in base) {
        let x: any = {}
        x[key] = base[key]
        payload.permissions.push(x)
    }

    const newPermissions: any = {};

    for (const key in base) {
        if (key === 'evento') {
            newPermissions['eventos'] = base[key];
        } else {
            newPermissions[key] = base[key];
        }
    }
    payload.permissions = newPermissions;
    return payload
}