// SOCKET IO
const socket = io();

socket.on('led status', function(state) {
    app._data.ledStatus = state.ledState
});