
/**
 * Add person to 
 */

//function addAuthorizer(address _authorized, TypeAuthorizer _typeAuthorizer) public onlyOwner {
$("#btnAddAuthorizer").click(() => {
  let _authorized = $("#txtConta").val();
  let _typeAuthorizer = $("#cmbProfile").val();
  instance.addAuthorizer(_authorized, _typeAuthorizer, (error, result) => {
    if (error) {
      console.info(error);
    } else {
      console.info(result);
      setModal(result);
    }
  });
});


//function removeAuthorizer(address _authorized) public onlyOwner {
$("#btnRemoveAuthorizer").click(() => {
  let _authorized = $("#txtConta").val();
  instance.removeAuthorizer(_authorized, (error, result) => {
    if (error) {
      console.info(error);
    } else {
      setModal(result);
    }
  });
});

//function transferOwnership(address newOwner) public onlyOwner {
$("#btnTransferOwnership").click(() => {
  let _authorized = $("#txtContaNova").val();
  instance.transferOwnership(_authorized, (error, result) => {
    if (error) {
      console.info(error);
    } else {
      setModal(result);
      eventTransferOwnership();
    }
  });
});

//event.stopWatching();
function eventTransferOwnership() {
  var event = instance.OwnershipTransferred();
  event.watch((error, result) => {
    if (!error) {
      getOwner((result) => {
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
$("#btnAuthorizers").click(() => {
  let _authorized = $("#txtConta").val();

  instance._authorizers.call(_authorized, (error, result) => {
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
  $('#transactionDetails').attr('href', 'https://rinkeby.etherscan.io/tx/'.concat(transaction));
  $('#transactionModal').modal('show')
}

$(document).ready(() => {
  $("#frmColabs").validate({
    rules: {
      "txtConta": {
        required: true
      }
    },
    messages: {
      "txtConta": {
        required: "Informe a chave pública do colaborador"
      }
    }
  });

  $("#frmTransfer").validate({
      rules: {
        "txtContaNova": {
          required: true
        }
      },
      messages: {
        "txtContaNova": {
          required: "Informe a chave pública do novo colaborador responsável pelo contrato"
        }
      }
    });

  getOwner(function (result) {
      $("#lblOwner").text(result);
  });
});
