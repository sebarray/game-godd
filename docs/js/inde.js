class game {
    constructor() {}
    create() {
        this.nombre = prompt(" ingresar nombre")
        this.genero = prompt("ingresar genero").trim()
        this.precio = parseFloat(prompt("ingresar precio"))

    }
}



function edadverif() {
    let edad = parseInt(prompt("cual es tu edad"));
    if (edad > 182) {
        alert("bievenid@")
    } else {
        alert("para comprar asegurate de estar con un mayor")
    }

}

function generoFiltro(genero){
    switch(genero){
        case"accion":{
            return false
        }
        case"aventura":{
            return false

        }
        case"deporte":{
            return false
        }
        default:{
            console.log("el genero ingresado no es valido")
            return true
        }

    }

}


let i
let contrador
const listaJuegos = []
const juegos = new game()
edadverif();
contrador = prompt("cuanto juegos desea ingresar ")


for (i = 0; i < contrador; i++) {
    do{
    juegos.create()
    listaJuegos[i] = juegos
    listaJuegos[i].genero.trim()
    }while( generoFiltro(listaJuegos[i].genero))
    console.log(listaJuegos[i])
    alert(listaJuegos[i])
}




