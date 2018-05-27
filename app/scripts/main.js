//geth --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private" --mine

//load
window.addEventListener('load', function() {
    // var urlNode = 'http://127.0.0.1:7545';
    // window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
    window.web3 = new Web3(web3.currentProvider);
    checkWeb3();
});


//Check the web3 connection
function checkWeb3(){
    // Set the connect status on the app
    if (web3 && web3.isConnected()) {
        console.info('Connected');
        $('#statusConnection').text("Conectado");
    } else {
        $('#statusConnection').text("Desconectado");
    }
}

function getInstanceContract() {
    var _addressContract = "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4";
    var contratoABI = web3.eth.contract(
        [{"constant":true,"inputs":[],"name":"quantidadeApostas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"estadoJogo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_jogo","type":"uint8"}],"name":"jogar","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"numeroPremiado","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"valorJogo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"consultarNumeroPremiado","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"quantidadeJogadores","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sacarPremio","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"saldoJogo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapAddressJogador","outputs":[{"name":"enderecoJogador","type":"address"},{"name":"inscrito","type":"bool"},{"name":"jogo","type":"uint8"},{"name":"vencedor","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"jogadores","outputs":[{"name":"enderecoJogador","type":"address"},{"name":"inscrito","type":"bool"},{"name":"jogo","type":"uint8"},{"name":"vencedor","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_jogador","type":"address"}],"name":"LogAposta","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_ganhador","type":"address"}],"name":"LogJogoFinalizado","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_jogador","type":"address"},{"indexed":false,"name":"_saldoJogo","type":"uint256"}],"name":"LogPremioSacado","type":"event"}]
    );
    var instance = contratoABI.at(_addressContract);
    console.info(instance);

    return instance;
}

function acessarFuncao() {
    var instance = getInstanceContract();
    instance.funcao(function(error,result){
        if (error) {
            console.info(error);
        } else {        
            console.info(result.toNumber());
            $('#NUMERO').text(result.toNumber());
        }
    }); 
}

function envioTransacaoEther(parametro){
    var instance = getInstanceContract();
    var txn = {
        from: $('#accounts').val(),
        gas: 470000,
        value: web3.toWei(1, 'ether')
    }

    instance.funcao.sendTransaction(parametro, txn,function(error, result)  {
        console.info(result);
        console.info(error);
    });
}


//event.stopWatching();
function eventoListener() {
    var instance = getInstanceContract();
    var event = instance.Log();
    event.watch(function(error, result){
        if (!error)
        {
            console.info("dados " + result.args._parametro);
        } else {
            console.log(error);
        }
    });    
}


function consultarSaldo(jogoInstance) {
    var instance = getInstanceContract();
    instance.consultaSaldo(function(error,result){
        if (error) {
            console.info(error);
        } else {        
            $('#saldo').text(web3.fromWei(result, 'ether') + " Ether");
        }
    }); 
}


//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    web3.net.getListening(function(error, result){
        if(error) {
            console.info('get_peer_count ' + error);
        } else {
            // get the peer count
            web3.net.getPeerCount(  function(  error,  result ) {
                if(error){
                    console.info('get_peer_count ' + error);
                } else {
                    console.info('Peer Count: ' + result);
                }
            });
        listAccounts();
        }
    });
}


/**
 * Send Validation to Person
 */
$( "#btnSendValidation" ).click(function() {
    let personInstance = getInstancePerson();

    let _addressPerson = $('#addressPerson').val();
    let _valid = $('#valid').val();

    var txn = {
        from: $('#account').val(),
        gas: 470000
    }

    personInstance.sendValidationIdentity.sendTransaction(_addressPerson, _valid, txn,function(error, result)  {
        console.info(result);
        console.info(error);
    });  

});