let pantalla = document.getElementById("resultado");

// sirve para reiniciar después del resultado
let reiniciar = false;

// revisa si es operador
function esOperador(valor){


return ["+","-","×","÷"].includes(valor);


}

// obtiene el número actual
function ultimoNumero(){


let texto = pantalla.value;

let partes = texto.split(/[+\-×÷]/);

return partes[partes.length - 1];


}

// agrega números y operadores
function agregar(valor){

if(reiniciar){

    pantalla.value = "0";

    reiniciar = false;
}

if(pantalla.value === "Error"){

    pantalla.value = "0";
}

let ultimoCaracter = pantalla.value.slice(-1);


// evita repetir el punto decimal
if(valor === "."){

    let actual = ultimoNumero();

    if(actual.includes(".")){

        return;
    }

    if(pantalla.value === "0"){

        pantalla.value = "0.";
        return;
    }
}


if(esOperador(valor)){

    if(pantalla.value === "0"){

        alert("El formato usado no es válido!");
        return;
    }

    if(esOperador(ultimoCaracter)){

        return;
    }
}


if(pantalla.value === "0" && valor !== "."){

    pantalla.value = valor;

}else{

    pantalla.value += valor;
}


}

// limpia toda la pantalla
function limpiar(){

pantalla.value = "0";


}

// elimina el último carácter
function borrar(){


if(pantalla.value.length === 1 || pantalla.value === "Error"){

    pantalla.value = "0";

}else{

    pantalla.value = pantalla.value.slice(0,-1);
}


}

// convierte el último número en porcentaje
function porcentaje(){


let partes = pantalla.value.split(/([+\-×÷])/);

let ultimo = partes[partes.length - 1];

if(ultimo === ""){

    return;
}

partes[partes.length - 1] = Number(ultimo) / 100;

pantalla.value = partes.join("");


}

// realiza el cálculo
function calcular(){

let ultimoCaracter = pantalla.value.slice(-1);

if(esOperador(ultimoCaracter)){

    return;
}

try{

    let expresion = pantalla.value
    .replace(/×/g,"*")
    .replace(/÷/g,"/");

    let resultado = eval(expresion);

    if(!isFinite(resultado)){

        throw new Error();
    }

    pantalla.value = resultado;

    reiniciar = true;

    setTimeout(function(){

        pantalla.value = "0";

    },2500);

}catch(error){

    pantalla.value = "Error";

    reiniciar = true;
}


}
