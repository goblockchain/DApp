var abiIdentity = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"hashTerms","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"person","outputs":[{"name":"sender","type":"address"},{"name":"hashUport","type":"string"},{"name":"status","type":"uint8"},{"name":"hashTerms","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"checkRole","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_uPort","type":"string"},{"name":"_approveOrDisapprove","type":"bool"}],"name":"validate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_uPort","type":"string"}],"name":"getPersonByIdUport","outputs":[{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"hasRole","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"string"}],"name":"setTermsAndCondition","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addressColab","type":"address"}],"name":"isCollaborator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSuperuser","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getValidHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"roleName","type":"string"}],"name":"adminRemoveRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_uPort","type":"string"},{"name":"_hashTerms","type":"string"},{"name":"_accepted","type":"bool"}],"name":"requestApprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"mapPersonAddress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapPerson","outputs":[{"name":"sender","type":"address"},{"name":"hashUport","type":"string"},{"name":"status","type":"uint8"},{"name":"hashTerms","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_ADMIN","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalListPerson","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROLE_COLLABORATOR","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_uPort","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isValid","type":"bool"},{"indexed":false,"name":"validator","type":"address"}],"name":"PersonValidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idUport","type":"string"}],"name":"RequestPerson","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"validHash","type":"string"}],"name":"TermsAndConditionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"collaborator","type":"address"}],"name":"NewCollaborator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"roleName","type":"string"}],"name":"RoleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"roleName","type":"string"}],"name":"RoleRemoved","type":"event"}];

//rinkeby
let contractAddressIdentity = "0x6C916EeD5667429106B65FC09F8652d6266c431e";
let instanceIdentity = getInstanceContract(abiIdentity, contractAddressIdentity);

$(document).ready(() => {
    getListPerson();
});

function getListPerson() {
    instanceIdentity.getTotalListPerson(function(error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log(result.toNumber());
            for (var i = 0; i < result.toNumber(); i++) {
                instanceIdentity.person(i, function(error, result) {
                    if (error) {
                        console.error(error);
                    } else {
                        var gbc = "-";
                        var description ="-";
                        var reputation = "-";
                        var address = result[0];
                        var uport = result[1];
                        $('#divColabs').append(
                            '<div class="col-sm-4">'+
                            '<div class="card mb-3">'+
                                '<div class="card-body">'+
                                    '<h5 class="card-title">'+address+'</h5>'+
                                    '<h6 class="card-subtitle mb-2 text-muted">'+reputation+'</h6>'+
                                    '<p class="card-text">'+uport+'</p>'+
                                    '<p class="card-text">'+description+'</p>'+
                                    '<h5>'+gbc+'</h5>'+
                                '</div>'+
                            '</div>'+
                            '</div>'
                        );
                        console.log(result);
                    }
                });
            }
        }
    });    
}
