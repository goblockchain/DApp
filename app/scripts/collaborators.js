var abiIdentity = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"person","outputs":[{"name":"sender","type":"address"},{"name":"hashUport","type":"string"},{"name":"status","type":"uint8"},{"name":"dateCreated","type":"uint256"},{"name":"lastUpdated","type":"uint256"},{"name":"nonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"checkRole","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_uPort","type":"string"},{"name":"_approveOrDisapprove","type":"bool"}],"name":"validate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_uPort","type":"string"}],"name":"getPersonByIdUport","outputs":[{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"hasRole","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_uPort","type":"string"},{"name":"_accepted","type":"bool"}],"name":"requestApprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addressColab","type":"address"}],"name":"isCollaborator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSuperuser","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"adminRemoveRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapPersonAddress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapPerson","outputs":[{"name":"sender","type":"address"},{"name":"hashUport","type":"string"},{"name":"status","type":"uint8"},{"name":"dateCreated","type":"uint256"},{"name":"lastUpdated","type":"uint256"},{"name":"nonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_ADMIN","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalListPerson","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"noncePerson","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_COLLABORATOR","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_uPort","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isValid","type":"bool"},{"indexed":false,"name":"validator","type":"address"}],"name":"PersonValidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idUport","type":"string"}],"name":"RequestPerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"collaborator","type":"address"}],"name":"NewCollaborator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"roleName","type":"string"}],"name":"RoleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"roleName","type":"string"}],"name":"RoleRemoved","type":"event"}];
//rinkeby
let contractAddressIdentity = "0xc46e61083c363d9286e9f2F9E5d28De82f8832f0";
let instanceIdentity = getInstanceContract(abiIdentity, contractAddressIdentity);

let ROLE_ADMIN = "admin";
let ROLE_ADVISOR = "advisor";
let ROLE_ESPECIALIST = "especialist";
let ROLE_AMBASSADOR = "ambassador";
let ROLE_COLLABORATOR = "collaborator";

$(document).ready(() => {
    if ($("#lblColab") != undefined) {
        $("#lblColab").text();
    }
    $(".divRole").hide();
    isCollaborator();
    isAdvisor();
    getListPerson();
});

function isCollaborator() {    

    checkRole(ROLE_COLLABORATOR, function (error, result) {
       if (error) {
            $(".divRole").hide();
        } else {
            if(result) {
                $("#divColab").show();
            } else {
                $("#divColab").hide();
            }
        }         
    });
}

function isAdvisor() {

    checkRole(ROLE_ADMIN, function (error, result) {
       if (error) {
            console.error(error);
        } else {
            console.log(result);
            if(result) {
                $("#divColabAdvisor").show();
            } else {
                $("#divColabAdvisor").hide();
            }
        }       
    });
}

function checkRole(role, e) {

    instanceIdentity.hasRole(web3.eth.accounts[0], role, (error, result) => {
        e(error, result);
        if (error) {
            console.error(error);
        } else {
            console.log(result);
        }
    });
}

function getListPerson() {
    if ( $( "#tbodyRequests" ).length ) {
        instanceIdentity.noncePerson(function(error, result) {
            if (error) {
                alert(error);
            } else {
                for (var i = 0; i < result.toNumber(); i++) {
                    instanceIdentity.person(i, function(error, result) {
                        if (error) {
                            console.error(error);
                        } else {
                            var status = result[2];
                            if (status == 0) {
                                var address = result[0];
                                var uport = result[1];
                                var dateCreated = result[3];
                                $('#tbodyRequests').append(
                                    '<tr>'+
                                        '<th scope="row">'+uport+'</th>'+
                                        '<td>'+address+'</td>'+
                                        '<td>'+dateCreated+'</td>'+
                                    '</tr>'
                                );
                                console.log(status.toNumber());
                            }
                        }
                    });  
                }              
            }
            
        });

    }
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

$("#btnApprove").click(function() {

    let txtIDuPort = $("#txtIDuPort").val();
    let _accepted = true;

    instanceIdentity.validate(txtIDuPort, _accepted, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            alert(result);
        }
      });
});  

$("#btnReject").click(function() {

    let txtIDuPort = $("#txtIDuPort").val();
    let _accepted = false;

    instanceIdentity.validate(txtIDuPort, _accepted, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            alert(result);
        }
      });
}); 

$("#btnSendRequest").click(function() {

    let txtIDuPort = $("#txtIDuPort").val();
    let _accepted = true;

    instanceIdentity.requestApprove(txtIDuPort, _accepted, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            alert(err);
        }
      });
}); 

if (! $( "#tbodyRequests" ).length ) {
    var uportconnect = window.uportconnect
    const uport = new uportconnect.Connect('GoBlockchain dApp', {
        clientId: '2ozaREEZXKfhCbRcdLuMYzo9Zy8nts83Ddf',
        signer: uportconnect.SimpleSigner('549db5cdbab21a3543ea43e434eb9252c229922e3cd2e00a965e55a7acc0d9f3'),
        network: 'rinkeby'
    })

    // Request credentials to login
    uport.requestCredentials({
        requested: ['name', 'country'],
        notifications: true // We want this if we want to recieve credentials
    }).then((credentials) => {
        // Do something
        $("#txtIDuPort").val(credentials.address);
        $("#txtNome").val(credentials.name);
    })
}
