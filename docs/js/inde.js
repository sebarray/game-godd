class game {
    constructor() {}
    create() {
        this.nombre = prompt(" ingresar nombre del juego")
        this.genero = prompt("ingresar genero accion, deporte o aventura").trim()
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




let i
let contrador
const listaJuegos = []
const juegos = new game()
edadverif();
contrador = prompt("cuantos juegos desea ingresar ")
const lista=createLista(i, contrador,listaJuegos,juegos)
lista.sort((a,b) =>{
    if(a.precio>b.precio){
       return -1}
        else{ if(a.precio<b.precio){       
             return 1 }
            else{ return 0 }}
})
 console.log(lista);









function createLista(i, contrador,  listaJuegos, juegos ){

    for (i = 0; i < contrador; i++) {
        do{
        juegos.create()
        listaJuegos.push({
            nombre:juegos.nombre,
            genero:juegos.genero,
            precio:juegos.precio
        })
        listaJuegos[i].genero.trim()
        }while( generoFiltro(listaJuegos[i].genero))
    }
    return listaJuegos
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

