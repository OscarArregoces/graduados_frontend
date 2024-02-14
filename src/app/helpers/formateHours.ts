export const formateHours12 = (fullHours: any) => {
    const hour = fullHours.getHours();
    const minute = fullHours.getMinutes();
    let fullHour24 = `${hour}:${minute}`;
    const [hora, minutos] = fullHour24.split(':');
    let hora12 = parseInt(hora, 10);
    const sufijo = hora12 >= 12 ? 'PM' : 'AM';
    if (hora12 > 12) {
        hora12 -= 12;
    }
    if (hora12 === 0) {
        hora12 = 12;
    }
    const horaFormato12 = `${hora12}:${minutos} ${sufijo}`;
    return horaFormato12;
}