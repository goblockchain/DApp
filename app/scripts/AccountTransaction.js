
/**
 * Add person to 
 */

$("#pendingTransactions").text(_pendingTransactions);

$( "#btnRemoveAuthorizer" ).click((function() {
    let instance = getInstanceContract();
    let _authorized = $("#txtConta").val();

    instance._authorizers.call(_authorized, function(error,result){
        if (error) {
            console.info(error);
        } else {        
            let _address = result[0];
            var entryDate = new Date(result[1] * 1000);
            entryDate = entryDate.toUTCString();
            let statusAuthorizer = result[2];
            let typeAuthorizer = result[3];

            $('#authorizerModal').modal('show')
            $("#labelConta").text(_address);
            $("#labelData").text(entryDate);
            $("#labelStatus").text(statusAuthorizer);
            $("#labelTipo").text(typeAuthorizer);
 
        }
    });     
});


//event.stopWatching();
function eventTransferOwnership() {
    var instance = getInstanceContract();
    var event = instance.OwnershipTransferred();
    event.watch(function(error, result){
        if (!error)
        {
            getOwner(function(result){
                $("#lblOwner").text(result);
            });            
            console.info("dados " + result.args.newOwner);
            event.stopWatching();
        } else {
            console.log(error);
        }
    });    
}

//mapping(address => Authorizer) public _authorizers;
$( "#btnConsultar" ).click(function() {
    let instance = getInstanceContract();
    let _authorized = $("#txtConta").val();

    instance._authorizers.call(_authorized, function(error,result){
        if (error) {
            console.info(error);
        } else {        
            let _address = result[0];
            var entryDate = new Date(result[1] * 1000);
            entryDate = entryDate.toUTCString();
            let statusAuthorizer = result[2];
            let typeAuthorizer = result[3];

            $('#authorizerModal').modal('show')
            $("#labelConta").text(_address);
            $("#labelData").text(entryDate);
            $("#labelStatus").text(statusAuthorizer);
            $("#labelTipo").text(typeAuthorizer);
 
        }
    });     
});

function setModal(transaction) {
    $('#lblTransaction').text(transaction);
    $('#transactionModal').modal('show')
}

$( document ).ready(function() {
    getOwner(function(result){
        $("#lblOwner").text(result);
        
    });
});
