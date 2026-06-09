const form = document.querySelector("#sessionForm");
const sessionsContainer = document.querySelector("#sessionsContainer");
const totalSesiones = document.querySelector("#totalSesiones");
const totalHoras = document.querySelector("#totalHoras");
const totalIngresos = document.querySelector("#totalIngresos");
const totalSaldo = document.querySelector("#totalSaldo");

let sesiones = [];
let indiceEditando = null;

const sesionesGuardadas = localStorage.getItem("sesionesNMR");

if(sesionesGuardadas) {
    sesiones =  JSON.parse(sesionesGuardadas);
}
console.log(sesionesGuardadas);


function calcularDuracion(horaInicio, horaTermino) {
    const inicio = new Date(`2000-01-01T${horaInicio}`);
    const termino = new Date(`2000-01-01T${horaTermino}`);

    const diferenciaMs = termino - inicio;
    const diferenciaMin = diferenciaMs / 1000 / 60;

    const horas = Math.floor(diferenciaMin / 60);
    const minutos = diferenciaMin % 60;

    return `${horas}h ${minutos}min`;
}

function actualizarEstadisticas() {
    let minutosTotales = 0;
    let cantidadSesiones = sesiones.length;
    let ingresosTotales = 0;
    let saldoTotal = 0;

    sesiones.forEach(function(sesion) {

        const partes = sesion.duracion.split(" ");
        const horas = parseInt(partes[0]);
        const minutos = parseInt(partes[1]);

        minutosTotales += horas * 60 + minutos;

        console.log(sesion);

        ingresosTotales += sesion.valorSesion || 0;
        saldoTotal += sesion.saldoPendiente || 0;
    });

    const horasTotales = Math.floor(minutosTotales / 60);
    const minutosRestantes = minutosTotales % 60;

    totalHoras.textContent = `Horas trabajadas: ${horasTotales}h ${minutosRestantes}min`;

    totalSesiones.textContent = `Sesiones: ${cantidadSesiones}`;
    totalIngresos.textContent = `Ingresos: $${ingresosTotales.toLocaleString("es-CL")}`;
    totalSaldo.textContent = `Saldo pendiente: $${saldoTotal.toLocaleString("es-CL")}`;
}

function renderizarSesiones() {
    sessionsContainer.innerHTML  = "";

    sesiones.forEach(function(sesion, index) {
        const card = document.createElement("div");
        card.classList.add("session-card");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function() {
            sesiones.splice(index, 1);

            localStorage.setItem("sesionesNMR", JSON.stringify(sesiones));

            renderizarSesiones();
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("edit-button");

        editButton.addEventListener("click", function() {
            indiceEditando = index;

            document.querySelector("#fecha").value = sesion.fecha;
            document.querySelector("#horaInicio").value = sesion.horaInicio;
            document.querySelector("#horaTermino").value = sesion.horaTermino;
            document.querySelector("#estudio").value = sesion.estudio;
            document.querySelector("#artista").value = sesion.artista;
            document.querySelector("#proyecto").value = sesion.proyecto;
            document.querySelector("#valorSesion").value = sesion.valorSesion;
            document.querySelector("#abono").value = sesion.abono;
            document.querySelector("#estadoPago").value = sesion.estadoPago;
            document.querySelector("#detalles").value = sesion.detalles;
            

        });


        const titulo = document.createElement("h3");
        const artistaInfo = document.createElement("p");
        const estudioInfo = document.createElement("p");
        const fechaInfo = document.createElement("p");
        const horaInfo = document.createElement("p");
        const duracionInfo = document.createElement("p");
        const estadoInfo = document.createElement("p");
        const productoresInfo = document.createElement("p");
        const serviciosInfo = document.createElement("p");
        const detallesInfo = document.createElement("p");
        const valorInfo = document.createElement("p");
        const abonoInfo = document.createElement("p");
        const saldoInfo = document.createElement("p");

        titulo.textContent = sesion.proyecto;
        artistaInfo.textContent = sesion.artista;
        estudioInfo.textContent = sesion.estudio;
        fechaInfo.textContent = `Fecha: ${sesion.fecha}`;
        horaInfo.textContent = `Horario: ${sesion.horaInicio} - ${sesion.horaTermino}`;
        duracionInfo.textContent = `Duracion: ${sesion.duracion}`;
        productoresInfo.textContent = `Productores: ${sesion.productores.join(", ")}`;
        serviciosInfo.textContent = `Servicios: ${sesion.servicios.join(", ")}`;
        detallesInfo.textContent = `Detalles: ${sesion.detalles}`;
        valorInfo.textContent = `Valor sesión: $${sesion.valorSesion.toLocaleString("es-CL")}`;
        abonoInfo.textContent = `Abono : $${sesion.abono.toLocaleString("es-CL")}`;
        estadoInfo.textContent = `Pago: ${sesion.estadoPago}`;
        console.log(sesion.estadoPago);
        estadoInfo.classList.add("estado-pago");

        if (sesion.estadoPago === "Pagado") {
            estadoInfo.classList.add("pagado");
        } else if (sesion.estadoPago === "Abonado") {
            estadoInfo.classList.add("abonado");
        } else if (sesion.estadoPago === "Pendiente") {
            estadoInfo.classList.add("pendiente");
        }
        console.log(estadoInfo.classList);
        saldoInfo.textContent = `Saldo pendiente: $${sesion.saldoPendiente.toLocaleString("es-CL")}`;

        console.log(card);

        card.appendChild(titulo);
        card.appendChild(artistaInfo);
        card.appendChild(estudioInfo);
        card.appendChild(fechaInfo);
        card.appendChild(horaInfo);
        card.appendChild(duracionInfo);
        card.appendChild(productoresInfo);
        card.appendChild(serviciosInfo);
        card.appendChild(detallesInfo);
        card.appendChild(estadoInfo);
        card.appendChild(valorInfo);
        card.appendChild(abonoInfo);
        card.appendChild(saldoInfo);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        sessionsContainer.appendChild(card);
        
    });
    actualizarEstadisticas();
};

renderizarSesiones();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fecha = document.querySelector("#fecha").value;
    const horaInicio = document.querySelector("#horaInicio").value;
    const horaTermino = document.querySelector("#horaTermino").value;
    const duracion = calcularDuracion(horaInicio, horaTermino);
    const estudio = document.querySelector("#estudio").value;
    const artista = document.querySelector("#artista").value;
    const proyecto = document.querySelector("#proyecto").value;
    const detalles = document.querySelector("#detalles").value;
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
        duracion: duracion,
        estudio: estudio,
        artista: artista,
        proyecto: proyecto,
        productores: productoresSeleccionados,
        servicios: serviciosSeleccionados,
        detalles: detalles,
        estadoPago: estadoPago,
        valorSesion: valorSesion,
        abono: abono,
        saldoPendiente: saldoPendiente
    };



    if (indiceEditando === null) {
        sesiones.push(sesion);
    } else {
        sesiones[indiceEditando] = sesion;
    }

    indiceEditando = null;

    renderizarSesiones();

    localStorage.setItem("sesionesNMR", JSON.stringify(sesiones));

    form.reset();

    console.log(sesiones);

});


if (indiceEditando === null) {
    sesiones.push(sesion);
} else sesiones[indiceEditando] = sesion;

