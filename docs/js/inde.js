$(() => {
    console.log("dom completo")
});
let  j
let id = 0;
let preciototal;
let juegosa = [];
const listaJuegos = document.getElementById("listaJuegos");
let btnCarrito = document.querySelectorAll('.btnCarrito');
let eliminar = document.querySelectorAll('eliminar');
let cardss = document.querySelectorAll('.card')
const recuperar = $("#btn-recuperar");
let search = $("#search")
const btnComprar = $('#btn-comprar');
let agregarJuego = $('#gameNew');
let shows = $('.shows');

    shows.on('click',(event)=>{
        const button = event.target;
        const item = button.closest('.card');
        tx= item.querySelector('.card-text')
        $('show')
        $(tx).toggle("fast");
    })




agregarJuego.on('click', juegonuevo);
recuperar.on('click', recuperarJuego);
eliminar.forEach(delet => {
    delet.on('click', eliminarCard)
});


search.on('keyup', (e) => {
    console.log(e.target.value)
    cardss.forEach(function (c) {
        c.textContent.toLowerCase().includes(e.target.value) ? c.classList.remove("oc") : c.classList.add("oc")
    })



});

btnComprar.on('click', compra);

Sortable.create(listaJuegos, {
    animation: 150
});


btnCarrito.forEach((añadir) => {
    añadir.addEventListener('click', clickAñadir, true)
});


















function recuperarJuego() {
    juegosa = JSON.parse(localStorage.getItem('lista'));
    total = 0
    //traigo el contenido del localStorage
    console.log(juegosa)
    for (game of juegosa) {
        total = parseInt(game.preio) + total
        console.log(total)
        pintar(game);
    }

    $('#total')[0].innerHTML = "TOTAL:" + total




}




function pintar(game) {

    const listah = document.getElementById('listaJuegos')
    let contenedor = document.createElement("div")
    contenedor.setAttribute("class", "card_shop")
    contenedor.innerHTML = `
    <div class="card-body text-light"  id="${id}" draggable="true"  >
        <img  src="${game.foto}" class="tamcarrie ${game.nombre} ">     
        <h5  class="card-title ${game.nombre} nameItem">${game.nombre}</h5>
        <h5  class="card-title  precioItem"> ${game.preio}$ $</h5>
        <i class="fas fa-backspace  ${juegosa[juegosa.length-1].nombre} eliminar" id="btn${game.id}"></i>
    </div>
    `;
    listah.append(contenedor)
    btneliminar = document.getElementById("btn" + game.id)
    btneliminar.addEventListener('click', eliminarCard)
}








function compra() {
    const contlista = document.getElementsByClassName("offcanvas-body")
    const listaJuegos = document.getElementById("listaJuegos")
    const lista = document.createElement("div");
    lista.setAttribute("id", "listaJuegos")

    listaJuegos.remove();


    preciototal = 0


    for (i = 0; i < juegosa.length; i++) {
        preciototal += parseInt(juegosa[i].preio)
        juegosa[i].preio = "0"
        juegosa[i].nombre = ""
        juegosa[i].foto = ""
        juegosa[i].id = 0.2
    }
    id = 0

    juegosa = juegosa.slice(0, 0);

    alert(`el pago realizado fue de $${preciototal}`)
    console.log(juegosa)
    contlista[0].append(lista)
    document.getElementById('total').innerHTML = "TOTAL 0";

}

function clickAñadir(event) {
    let cont = 0
    let i = 0
    preciototal = 0
    let total = document.getElementById('total');
    const listah = document.getElementById('listaJuegos')
    const button = event.target;
    const item = button.closest('.card');
    const tituloItem = item.querySelector('.card-title').textContent;
    const precioItem = item.querySelector('.precioItem').textContent;
    const imgItem = item.querySelector('.imgItem').src;
    let contenedor = document.createElement("div")
    contenedor.setAttribute("class", "card_shop")
    console.log(juegosa.length)
    if (juegosa.length > 0) {
        for (i = 0; i < juegosa.length; i++) {
            if (juegosa[i].nombre === tituloItem) {
                console.log("entro al if")
                cont++;
            }
        }
    }
    if (cont == 0) {
        juegosa.push({
            nombre: tituloItem,
            preio: precioItem,
            foto: imgItem,
            id: id
        })
        console.log(juegosa)
        contenedor.innerHTML = `
    <div class="card-body text-light"  id="${id}" draggable="true"  >
        <img  src="${juegosa[juegosa.length-1].foto}" class="tamcarrie ${juegosa[juegosa.length-1].nombre} ">     
        <h5  class="card-title ${juegosa[juegosa.length-1].nombre} nameItem">${juegosa[juegosa.length-1].nombre}</h5>
        <h5  class="card-title  precioItem">${juegosa[juegosa.length-1].preio} $</h5>
        <i class="fas fa-backspace  ${juegosa[juegosa.length-1].nombre} eliminar" id="btn${id}"></i>
    </div>
    `;
        localStorage.setItem('lista', JSON.stringify(juegosa));
        //localstorage

        for (const games of juegosa) {
             const item = button.closest('.card');
            preciototal += parseInt(games.preio)
        }
        console.log(preciototal)
        total.innerHTML = `TOTAL:$${preciototal}`
        listah.append(contenedor)
        btneliminar = document.getElementById("btn" + id)
        btneliminar.addEventListener('click', eliminarCard)
        id++


    }

}



function juegonuevo(event) {
    const button = event.target;
    const item = button.closest('.addGame')
    const name = item.querySelector('.enterName').value;
    const photo = item.querySelector('.enterPhoto').value;
    let contenedor = document.createElement("div")
    contenedor.setAttribute("Class", "card row  m-3 cardAncho ")
    contenedor.setAttribute("style", "width: 18rem;")
    contenedor.innerHTML = `
    <img src="${photo}"
        class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
            the card's content.</p>
        <label for="" class="text-success text-xl-center">proximamente</label>
      
    </div>
    `;
    let principal = document.getElementById('filaUno');


    principal.append(contenedor)

}



function eliminarCard(event) {
    const button = event.target;
    const item = button.closest('.card_shop');
    const cardd = item.querySelector('.card-body')
    const nameItem = item.querySelector('.nameItem').textContent
    const precioItem = item.querySelector('.precioItem').textContent
    let cb= item.querySelector('.card-body')
    const cd =button.closest('.card-body')
    $(cd).parent().slideUp("slow");
    preciototal = 0;
    juegosa = juegosa.filter(x => x.nombre != nameItem);


    for (const games of juegosa) {
        preciototal += parseInt(games.preio);
    }

    document.getElementById('total').innerHTML = `TOTAL: ${preciototal}`;
    localStorage.setItem('lista', JSON.stringify(juegosa));
   // cardd.remove();
}