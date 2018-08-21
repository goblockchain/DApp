$(document).ready(() => {
    console.info("entrou aqui");
    /**
     * Neste retorno você era receber um objeto contendo as seguintes informações
     * { auth : true , nonce : ‘hash aleatório gerado pela plataforma’}
     */
    window.OMID = new OMID('01', 'stag', ['name', 'blockchainid', 'email', 'photo', 'latitude', 'longitude'], function(result){
        if(result.auth && result.nonce){
            callAuth(result.nonce);
            console.info(result.nonce);
        }
    });  
});

function callAuth(nonce){
    $.ajax({
        url : "http://localhost:8181/demo/auth/" +nonce,
        success: callAuthSuccess,
        error: function(result) {
            console.error(result);
        },
    })
}

function callAuthSuccess(result)
{
    loginSession.find('span.log-user-email').html(result.email.value);
    loginSession.find('span.log-user-name').html(result.name.value);
    loginSession.find('span.log-user-blockchainid').html(result.blockchainid.value);
    loginSession.find('span.log-user-mobile_lat').html(result.latitude.value);
    loginSession.find('span.log-user-mobile_lng').html(result.longitude.value);

    photoNonce = result.photo.value;
    startSession.hide();
    loginSession.show();
}
