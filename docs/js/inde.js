$(() => {
    console.log("dom completo")
});
listFav=[]
let j = 0
let id = 0;
let preciototal;
let juegosa = [];
const listaJuegos = document.getElementById("listaJuegos");
let btnCarrito = document.querySelectorAll('.btnCarrito');
let eliminar = document.querySelectorAll('eliminar');
const cardss = document.querySelectorAll('.card')
let btnFiltro = document.getElementById('filtrog')
let radiobt = document.querySelectorAll('.radiobt')
const recuperar = $("#btn-recuperar");
let search = $("#search")
const btnComprar = $('#btn-comprar');
let agregarJuego = $('#gameNew');
let shows = $('.shows');
let pokeClick = $("#pokeClick");
let url = "https://pokeapi.co/api/v2/pokemon/"
const pres =document.querySelectorAll('.precioItem')
btnclear = document.querySelector("#limpiar")
 let rangemin= document.getElementById("rangemin")
 let outmin=document.getElementById('outmin')
 let outmax = document.getElementById('outmax')
 let rangemax = document.getElementById('rangemax')
let urli
for (j = 1; j < 8; j++) {
    urli = url + j
    pokepaint(urli)
}
rangemin.onchange=() =>{
    outmin.innerHTML=rangemin.value
}

rangemax.onchange=()=>{
    outmax.innerHTML=rangemax.value
}


btnclear.addEventListener('click', ()=>{
    for(j=0; i<cardss.length; j++){
        cardss[j].classList.remove("oc")
    }
})

btnFiltro.addEventListener('click', (e) => {
   
    let cardv
    rmax = parseInt(document.getElementById('outmax').value)
    rmin = parseInt(document.getElementById('outmin').value)
    for (i = 0; i < radiobt.length; i++) {
        if (radiobt[i].checked) {
            for(j=0; j< cardss.length;j++){
                cardv=parseInt(pres[j].innerText)
                cardss[j].textContent.toLowerCase().includes(radiobt[i].value) && cardv <= rmax && cardv >= rmin ? cardss[j].classList.remove("oc") : cardss[j].classList.add("oc")
         
            }

        }
    }
}, true)



pokeClick.on('click', pokeAD)
shows.on('click', (event) => {
    const button = event.target;
    const item = button.closest('.card');
    tx = item.querySelector('.card-text')
    $('show')
    $(tx).toggle("fast");
})




agregarJuego.on('click', juegonuevo);
recuperar.on('click', recuperarJuego);
eliminar.forEach(delet => {
    delet.on('click', eliminarCard)
});


search.on('keyup', (e) => {

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





function pokeAD() {
    let nombre = document.getElementById("pokeAdd").value
    nombre = nombre.toLowerCase();
    url = "https://pokeapi.co/api/v2/pokemon/" + nombre
    pokepaint(url)

}





function pokepaint(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            poke = document.getElementsByClassName('poke')
            conte = document.createElement('div');
            conte.setAttribute('class', 'w-auto')
            conte.innerHTML = `
     <div class="card bg-dark mb-4" style="width: 18rem;">
  <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
  <div class="card-body mb-4">
    <h3 class="text-white cen">${data.name}  </h3>
  </div>

</div>
      `
            poke[0].appendChild(conte)
           
                    
        
        })
    

}





function recuperarJuego() {
    juegosa = JSON.parse(localStorage.getItem('lista'));
    total = 0
    //traigo el contenido del localStorage

    for (game of juegosa) {
        total = parseInt(game.preio) + total
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

    swal({
        title: "Good job!",
        text: `el pago realizado fue de $${preciototal}`,
        icon: "success",
        button: "ok",
    });



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
    if (juegosa.length > 0) {
        for (i = 0; i < juegosa.length; i++) {
            if (juegosa[i].nombre === tituloItem) {

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
    let cb = item.querySelector('.card-body')
    const cd = button.closest('.card-body')
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