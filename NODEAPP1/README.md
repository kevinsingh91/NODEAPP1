# NODEAPP1

#bin fr codes

function sendmsg() {
     socket.emit("clientsent", $('#tbox1').val() ,function () {
     $('#msg').append($('<li>').text($('#tbox1').val()));
     });
     };


	 $('#msg').append($('<li>').text('emmiting_clientsentstuff... '+ $('#tbox1').val() );




	 .footer.navbar-fixed-bottom
    .row(style={ background: 'rgba(80,80,190,0.8)'})
      .col-xs-10.col-md-10
        input( type='text', id='tbox1', value='tbox1', name='tbox1', style={ background:'transparent', width:'80%', margin:'auto', border:'0px', outline:'0', padding:'10px'})
        hr
      .col-xs-2.col-md-2
        input( type='button', value='Search', name='box1', onClick='sendmsg()')



