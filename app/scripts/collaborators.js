var abiIdentity = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"hashTerms","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"person","outputs":[{"name":"sender","type":"address"},{"name":"hashUport","type":"string"},{"name":"status","type":"uint8"},{"name":"hashTerms","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"checkRole","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_uPort","type":"string"},{"name":"_approveOrDisapprove","type":"bool"}],"name":"validate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_AMBASSADOR","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"removeAdvisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_uPort","type":"string"}],"name":"getPersonByIdUport","outputs":[{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"hasRole","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"string"}],"name":"setTermsAndCondition","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addressUser","type":"address"}],"name":"isCollaborator","outputs":[{"name":"_isCollaborator","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_advisors","type":"address[]"}],"name":"addAdvisors","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newSuperuser","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getValidHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"adminRemoveRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_uPort","type":"string"},{"name":"_hashTerms","type":"string"},{"name":"_accepted","type":"bool"}],"name":"requestApprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapPersonAddress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapPerson","outputs":[{"name":"sender","type":"address"},{"name":"hashUport","type":"string"},{"name":"status","type":"uint8"},{"name":"hashTerms","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_ADVISOR","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_ADMIN","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_COLLABORATOR","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_ESPECIALIST","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isValid","type":"bool"},{"indexed":false,"name":"validator","type":"address"}],"name":"PersonValidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idUport","type":"string"}],"name":"RequestPerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"validHash","type":"string"}],"name":"TermsAndConditionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"collaborator","type":"address"}],"name":"NewCollaborator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"qtd","type":"uint8"},{"indexed":false,"name":"responsable","type":"address"}],"name":"NewAdvisors","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"roleName","type":"string"}],"name":"RoleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"roleName","type":"string"}],"name":"RoleRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

//rinkeby
let contractAddressIdentity = "0x07c92a756c20f53dc801f6efa51bdf2ccadec7fd";
let instanceIdentity = getInstanceContract(abiIdentity, contractAddressIdentity);

let ROLE_ADMIN = "admin";
let ROLE_ADVISOR = "advisor";
let ROLE_ESPECIALIST = "especialist";
let ROLE_AMBASSADOR = "ambassador";
let ROLE_COLLABORATOR = "collaborator";

$(document).ready(() => {
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

    // return (
    //     hasRole(_addressUser, ROLE_ADMIN) ||
    //     hasRole(_addressUser, ROLE_ADVISOR) ||
    //     hasRole(_addressUser, ROLE_ESPECIALIST) ||
    //     hasRole(_addressUser, ROLE_AMBASSADOR) || 
    //     hasRole(_addressUser, ROLE_COLLABORATOR)            
    // );
}

function isAdvisor() {

    checkRole(ROLE_ADVISOR, function (error, result) {
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
    // var search = true;
    // var count = 0;
    // while(search) {
    //     instanceIdentity.person(count++, function(error, result) {
    //         if (error) {
    //             console.error(error);
    //         } else {
    //             if (result[0].length == 0) {
    //                 search = false;
    //             }                
    //             console.log(result);
    //             console.log(result[0]);
    //             console.log(result[1]);
    //             console.log(result[2]);                
    //             console.log(result[3]);                 
    //         }  
    //     });
    // }
}


function callAuth(nonce) {
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

$("#btnSendRequest").click(function() {

    let txtIDuPort = $("#txtIDuPort").val();
    let _hashTerms = "abc";
    let _accepted = true;

    instanceIdentity.requestApprove(txtIDuPort, _hashTerms, _accepted, (err, result) => {
        if (!err) {
        //   setModal(result, 'WITHDRAW');
            console.error(result);
        } else {
            console.error(err);
        }
      });
});  