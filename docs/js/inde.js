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




/*for(nom of nombres){
    console.log(nom.innerHTML)   
   }   
const nombres = document.getElementsByClassName('card-title')
console.log(nombres)
*/
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


 for (const producto of lista) {
    let contenedor = document.createElement("div");
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<div class="container bg-dark rounded col-lg-12 text-light">
                            <h3> genero: ${producto.genero}</h3>
                            <p>  Producto: ${producto.nombre}</p>
                            <b> $ ${producto.precio}</b>
                            </div>`;
    document.body.appendChild(contenedor);
}








