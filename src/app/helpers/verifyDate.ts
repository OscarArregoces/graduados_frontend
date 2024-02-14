
export const verifyDate = (fecha: string, hora: string): boolean => {
    const focusDate = new Date(fecha + ' ' + hora);
    const currentDate = new Date();
    return focusDate <= currentDate
}