//Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnNuevo = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');

const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obliatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio,innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnNuevo.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnNuevo.disabled = true;
});

socket.on('ultimo-ticket', (payload) => {
    //lblNuevoTicket.innerText = 'Ticket '+payload;
});

socket.on('tickets-pendientes', (payload) => {
    if (payload === 0) {
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerText = payload;
    }
});


btnNuevo.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if (!ok) {
            lblTicket.innerText = `Nadie`;
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`;
    });
    /*socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });*/

});