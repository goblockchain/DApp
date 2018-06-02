
/**
 * Add person to 
 */
//function addAuthorizer(address _authorized, TypeAuthorizer _typeAuthorizer) public onlyOwner {
$( "#btnAddAuthorizer" ).click(function() {
    console.info("emtrou aui");
    var instance = getInstanceContract();
    let _authorized = $("#txtConta").val();
    let _typeAuthorizer = $("#cmbProfile").val();
    instance.addAuthorizer.sendTransaction(_authorized, _typeAuthorizer, function(error,result){
        if (error) {
            console.info(error);
        } else {        
            console.info(result);
            setModal(result);
        }
    });     
});

//function removeAuthorizer(address _authorized) public onlyOwner {
$( "#btnRemoveAuthorizer" ).click(function() {
    var instance = getInstanceContract();
    let _authorized = $("#txtConta").val();
    instance.removeAuthorizer.sendTransaction(_authorized, function(error,result){
        if (error) {
            console.info(error);
        } else {        
            alert(result);
            setModal(result);
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