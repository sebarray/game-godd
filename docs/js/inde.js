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
*/
let id=0
let preciototal
let juegosa=[]
const listaJuegos = document.getElementById("listaJuegos")
const btnComprar = document.getElementById('btn-comprar')
let agregarJuego=document.getElementById('gameNew');
let btnCarrito=document.querySelectorAll('.btnCarrito');
let eliminar=document.querySelectorAll('eliminar');

Sortable.create(listaJuegos,{
    animation:150
})

eliminar.forEach(delet=>{
    delet.addEventListener('click',eliminarCard,true) 
})
btnCarrito.forEach((añadir)=>{
    añadir.addEventListener('click', clickAñadir, true)
})
agregarJuego.addEventListener('click',juegonuevo)
btnComprar.addEventListener('click', compra,true)
























function compra(){
    const contlista= document.getElementsByClassName("offcanvas-body")
    const listaJuegos = document.getElementById("listaJuegos")
    const lista=document.createElement("div");
    lista.setAttribute("id","listaJuegos")

    listaJuegos.remove();
  
    
    preciototal=0


        for(i=0; i< juegosa.length;i++){
        preciototal+= parseInt( juegosa[i].preio)               
        juegosa[i].preio="0"
        juegosa[i].nombre=""
        juegosa[i].foto=""
        juegosa[i].id=0.2
 }
 id=0
  
    juegosa= juegosa.slice(0 , 0);
  
    alert(`el pago realizado fue de $${preciototal}` )
    console.log(juegosa)
    contlista[0].append(lista)
    document.getElementById('total').innerHTML="TOTAL 0";

}

function clickAñadir(event){
    let cont=0
    let i=0
    preciototal=0
    let total =document.getElementById('total');
    const listah= document.getElementById('listaJuegos')
    const button= event.target;
    const item= button.closest('.card');
    const tituloItem= item.querySelector('.card-title').textContent;
    const precioItem= item.querySelector('.precioItem').textContent;
    const imgItem= item.querySelector('.imgItem').src;
    let contenedor= document.createElement("div")
    contenedor.setAttribute("class","card_shop") 
    console.log(juegosa.length)
    if(juegosa.length >0){
    for(i=0; i<juegosa.length; i++ ){
    if(juegosa[i].nombre===tituloItem){
        console.log("entro al if")
     cont++;
    }}}
    if (cont == 0){
    juegosa.push({nombre:tituloItem, preio:precioItem, foto:imgItem, id:id})
    console.log(juegosa)
    contenedor.innerHTML=`
    <div class="card-body text-light"  id="${id}" draggable="true"  >
        <img  src="${juegosa[juegosa.length-1].foto}" class="tamcarrie ${juegosa[juegosa.length-1].nombre} ">     
        <h5  class="card-title ${juegosa[juegosa.length-1].nombre} nameItem">${juegosa[juegosa.length-1].nombre}</h5>
        <h5  class="card-title  precioItem">${juegosa[juegosa.length-1].preio} $</h5>
        <i class="fas fa-backspace  ${juegosa[juegosa.length-1].nombre} eliminar" id="btn${id}"></i>
    </div>
    `; 
     
    for (const games of juegosa){
        preciototal+=parseInt(games.preio)
    }
   console.log(preciototal)
    total.innerHTML=`TOTAL:$${preciototal}`
    listah.append(contenedor)
    btneliminar= document.getElementById("btn"+id)
    btneliminar.addEventListener('click', eliminarCard)
    id++

    console.log(btneliminar)
}
            
}



function juegonuevo(event){
    const button= event.target;
    const item= button.closest('.addGame')
    const name= item.querySelector('.enterName').value;
    const photo= item.querySelector('.enterPhoto').value;
    let contenedor= document.createElement("div")
    contenedor.setAttribute("Class", "card row  m-3 cardAncho ")
    contenedor.setAttribute("style","width: 18rem;")
    contenedor.innerHTML=`
    <img src="${photo}"
        class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
            the card's content.</p>
        <label for="" class="text-success text-xl-center">proximamente</label>
      
    </div>
    `;
    let principal= document.getElementById('filaCuatro');
  

    principal.append(contenedor)
    
}



function eliminarCard(event){
    const button= event.target;
    const item= button.closest('.card_shop');
    const cardd= item.querySelector('.card-body')
    const nameItem= item.querySelector('.nameItem').textContent
    const precioItem= item.querySelector('.precioItem').textContent
    preciototal=0;
    juegosa = juegosa.filter(x => x.nombre !=nameItem );
  
    for (const games of juegosa){
        preciototal+=parseInt(games.preio);
    }

     document.getElementById('total').innerHTML=`TOTAL: ${preciototal}`;
      
     cardd.remove();
}