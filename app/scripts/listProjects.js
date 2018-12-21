
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

window.Trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
        read: 'true'
    },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
});

var authenticationSuccess = function () {
    console.log('Successful authentication');
};

var authenticationFailure = function () {
    console.error('Failed authentication');
};

$(document).ready(() => {
    getListPerson();
});

async function getListPerson() {

    board = Trello.get('/boards/5b71cc27e783b6769ea5e340?actions=none&boardStars=none&cards=none&card_pluginData=false&checklists=none&customFields=false&fields=name&lists=none&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false&key=d25c1cb09fa2ee032c93a7c4128baaee&token=a22cafe4437a7376c50de0f0ddb5e0b77f7f9048df04f88a6403ba14cc78b365', function(data){
        $("#nameProject").text(data.name);
        console.info(data);
    });

    members = await Trello.get('/boards/5b71cc27e783b6769ea5e340/memberships/?orgMemberType=true&member=true&member_fields=fullName,username&key=d25c1cb09fa2ee032c93a7c4128baaee&fields=id,name,idMembers,shortUrl');
    pointsTotal = 0;
    cardsTotal = 0; 
    await asyncForEach(members, async (membro) => {
        if (membro.member.id == "59d62addf010ebb1ba42fae9") {
            return;
        }
        listCards = await Trello.get('/members/'+membro.member.id+'/cards?customFieldItems=true&key=d25c1cb09fa2ee032c93a7c4128baaee');
        console.info(listCards);
        peso = 0;
        totalCards = 0; 

        // detailsMember = await Trello.get('/members/'+membro.member.id+'?key=d25c1cb09fa2ee032c93a7c4128baaee&fields=url');
        urlMember = "https://trello.com/"+membro.member.username;
        

        await asyncForEach(listCards, async (cards) => {
            if (cards.idBoard == "5b71cc27e783b6769ea5e340") {
                if (cards.customFieldItems.length > 0) {
                    idValue = cards.customFieldItems[0].idValue;
                    idCustomField = cards.customFieldItems[0].idCustomField;
                    customFieds = await Trello.get('/customField/'+idCustomField+'/options/'+idValue+'?&key=d25c1cb09fa2ee032c93a7c4128baaee');
                    peso += parseInt(customFieds.value.text);
                    totalCards++;     
                }
            }
        });
        if (peso > 0) {
            pointsTotal += peso;
            cardsTotal += totalCards; 
            // listCards.forEach(function(cards) {
            //     console.info(cards.length);
            // });
            var gbc = "-";
            var description ="-";
            var reputation = "-";
            // var address = result[0];
            // var uport = result[1];
            $('#divColabs').append(
                '<div class="col-sm-4">'+
                '<div class="card mb-3">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title text-center"> <a href="'+ urlMember + '" target="_blank">'+  membro.member.fullName+' </a></h5>'+
                        '<h6 class="card-subtitle mb-2 text-muted">'+membro.member.id+'</h6>'+
                        '<p class="card-text"> Envolvido no total de ' + totalCards + ' cards </p>'+
                        // '<p class="card-text"> Total de pontos acumulados ' + peso + ' </p>'+
                        '<h5>Total de pontos acumulados ' + peso + '</h5>'+
                    '</div>'+
                '</div>'+
                '</div>'
            ); 
        }       
    });

    console.info(cardsTotal);
    console.info(pointsTotal);
    $("#cardsTotal").text(cardsTotal);
    $("#pointsTotal").text(pointsTotal);
}