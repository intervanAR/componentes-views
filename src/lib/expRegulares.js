//export const reNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
export const reNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ'])?$/;

//Patente nueva (> 2016) ó patente vieja (< 2016)
export const rePatente = /^[a-z-A-Z]{2}[0-9]{3}[a-z-A-Z]{2}|[a-z-A-Z]{3}[0-9]{3}|[0-9]{3}[a-z-A-Z]{3}|[a-z-A-Z]{1}[0-9]{3}[a-z-A-Z]{3}$/;

export const reIntegerPos = /^[0-9]+$/;
