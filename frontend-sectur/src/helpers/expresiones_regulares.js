export const expresiones = {
    numeros: /^(?=(?:\D*\d){7,14}$)[\d\s]+$/,//acepta numeros con espacios con un rango de numeros del 7 al 14
    texto: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]+$/,//permite letras, mayusculas, acentos, espacios y saltos de linea
    latitud: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,17}$/,
    longitud: /^-?((1[0-7]|[1-9])?\d{1}|0\d{1})\.{1}\d{1,17}$/,
}