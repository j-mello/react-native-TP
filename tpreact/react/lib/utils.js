export const addMissingZeros = (number, n = 2) => {
    if (typeof (number) == "number")
        number = number.toString();

    while (number.length < n) {
        number = '0' + number;
    }
    return number;
}

export const formatDateEn = (date) => {
    return addMissingZeros(date.getFullYear())+"-"+addMissingZeros(date.getMonth()+1)+"-"+addMissingZeros(date.getDate())
}

export const formatDateFr = (date) => {
    return addMissingZeros(date.getDate())+"/"+addMissingZeros(date.getMonth() + 1)+"/"+addMissingZeros(date.getFullYear());
}

export const newId = list => {
    let id = 1;
    while (list.find(subItem => subItem.id === id)) {
        id += 1;
    }
    return id;
}
