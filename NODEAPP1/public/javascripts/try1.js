
function sendmsg() {
    socket.emit("clientsent", $('#tbox1').val(), function (confirm) {
        $('#msg').append($('<li>').text(confirm));
    });
    $('#msg').append($('<li>').text("sending.."));
};

socket.on("serversent", function (data) {
    $('#msg').append($('<li>').text(data));
});
