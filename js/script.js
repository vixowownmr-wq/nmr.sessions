const form = document.querySelector("#sessionForm");
const sessionsContainer = document.querySelector("#sessionsContainer");
const sesiones = [];

function renderizarSesiones() {
    sessionsContainer.innerHTML  = "";

    sesiones.forEach(function(sesion) {
            const card = document.createElement("div");
            card.classList.add("session-card");

            const titulo = document.createElement("h3");
            const artistaInfo = document.createElement("p");
            const estudioInfo = document.createElement("p");
            const fechaInfo = document.createElement("p");
            const horaInfo = document.createElement("p");
            const estadoInfo = document.createElement("p");
            const productoresInfo = document.createElement("p");
            const serviciosInfo = document.createElement("p");
            const saldoInfo = document.createElement("p");


            titulo.textContent = sesion.proyecto;
            artistaInfo.textContent = sesion.artista;
            estudioInfo.textContent = sesion.estudio;
            fechaInfo.textContent = `Fecha: ${sesion.fecha}`;
            horaInfo.textContent = `Horario: ${sesion.horaInicio} - ${sesion.horaTermino}`;
            productoresInfo.textContent = `Productores: ${sesion.productores.join(", ")}`;
            serviciosInfo.textContent = `Servicios: ${sesion.servicios.join(", ")}`;
            estadoInfo.textContent = `Pago: ${sesion.estadoPago}`;
            saldoInfo.textContent = `Saldo pendiente: ${sesion.saldoPendiente}`;

            console.log(card);

            card.appendChild(titulo);
            card.appendChild(artistaInfo);
            card.appendChild(estudioInfo);
            card.appendChild(fechaInfo);
            card.appendChild(horaInfo);
            card.appendChild(productoresInfo);
            card.appendChild(serviciosInfo);
            card.appendChild(estadoInfo);
            card.appendChild(saldoInfo);

            sessionsContainer.appendChild(card);
        
    });

};

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fecha = document.querySelector("#fecha").value;
    const horaInicio = document.querySelector("#horaInicio").value;
    const horaTermino = document.querySelector("#horaTermino").value;
    const estudio = document.querySelector("#estudio").value;
    const artista = document.querySelector("#artista").value;
    const proyecto = document.querySelector("#proyecto").value;
    const valorSesion = Number(document.querySelector("#valorSesion").value);
    const abono = Number(document.querySelector("#abono").value);
    const saldoPendiente = valorSesion - abono;
    const estadoPago = document.querySelector("#estadoPago").value;
    const productoresSeleccionados = [];
    

    const productores = document.querySelectorAll('input[name="productores"]');

    productores.forEach(function(productor) {
        if (productor.checked) {
            productoresSeleccionados.push(productor.value);
        }
    });

    const serviciosSeleccionados =[];

    const servicios = document.querySelectorAll('input[name="servicios"]');

    servicios.forEach(function(servicio) {
        if (servicio.checked) {
            serviciosSeleccionados.push(servicio.value);
        }
    });

    const sesion = {
        fecha: fecha,
        horaInicio: horaInicio,
        horaTermino: horaTermino,
        estudio: estudio,
        artista: artista,
        proyecto: proyecto,
        productores: productoresSeleccionados,
        servicios: serviciosSeleccionados,
        estadoPago: estadoPago,
        saldoPendiente: saldoPendiente
    };

    sesiones.push(sesion);

    renderizarSesiones();

    console.log(sesiones.length);

    console.log(sesiones);

    console.log(sesion);

    console.log(proyecto);






});

