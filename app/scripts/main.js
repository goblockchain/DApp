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

let abi = [{"constant":false,"inputs":[{"name":"_transactionId","type":"uint256"}],"name":"signTransactionSendToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_authorizers","outputs":[{"name":"_address","type":"address"},{"name":"entryDate","type":"uint256"},{"name":"statusAuthorizer","type":"uint8"},{"name":"typeAuthorizer","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_AUTHORIZERS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_authorized","type":"address"}],"name":"removeAuthorizer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_SIGNATURES_COLAB","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"},{"name":"_description","type":"bytes32"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_transactionId","type":"uint256"}],"name":"deleteTransactionSendToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_pendingTransactions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_transactionId","type":"uint256"}],"name":"getTransactionSendToken","outputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"bytes32"},{"name":"date","type":"uint256"},{"name":"signatureCountColab","type":"uint8"},{"name":"signatureCountAdviser","type":"uint8"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"walletBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_numAuthorized","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_authorized","type":"address"},{"name":"_typeAuthorizer","type":"uint8"}],"name":"addAuthorizer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MIN_SIGNATURES_ADVISER","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"DepositFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msg","type":"string"}],"name":"LogDebug","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionSendTokenCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionSendTokenCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"by","type":"address"},{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionSendTokenSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
let contractAddress = "0x131345f0cc0058a9930f3e21f14Faf0ddDC90D53";

function getInstanceContract() {
    var contratoABI = web3.eth.contract(
        abi
    );
    var instance = contratoABI.at(contractAddress);
    return instance;
}

function getOwner(f) {
    var instance = getInstanceContract();
    instance.owner(function(error,result){
        if (error) {
            console.info(error);
        } else {        
            f(result);
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

//teste