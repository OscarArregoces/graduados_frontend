
export const formateDateInput= (date: String): Date => {
    
    return new Date(`${date}T00:00:00`)
}
export const formateDateOutPut = (date: Date): string => {
    const day = date.getDate();
    const moth = date.getMonth() + 1;
    const year = date.getFullYear();
    let fullDate = `${year}-${moth}-${day}`;
    return fullDate;
}