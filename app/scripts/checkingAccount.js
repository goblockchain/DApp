// CheckingAccount.sol

$(document).ready(() => {
  isAuthorizer(account, authorizer => {
    if (!authorizer) {
      $('#withdraw .card-body').html(
        '<div class="alert alert-danger" role="alert">' +
          'Você precisa ser um Autorizador para solicitar saques!' +
        '</div>'
      )
    }
  });

  getWalletBalance(balance => {
    $('#balance').text(web3.fromWei(balance, 'ether') + " ETH");
  });

  eventDepositFunds();

  $("#formDeposit").validate({
    rules: {
      "txtDepositAmount": {
        required: true,
        validWei: true
      }
    },
    messages: {
      "txtDepositAmount": {
        required: "Informe a quantidade de ETH do depósito",
        number: "Este campo só aceita números. Exemplo: 1.437"
      }
    }
  });

  $("#formWithdraw").validate({
    rules: {
      "txtWithdrawAmount": {
        required: true,
        validWei: true
      },
      "txtWithdrawDescription": {
        required: true
      }
    },
    messages: {
      "txtWithdrawAmount": {
        required: "Informe a quantidade de ETH do saque",
        number: "Este campo só aceita números. Exemplo: 1.437"
      },
      "txtWithdrawDescription": {
        required: "Informe uma descrição sobre o saque"
      }
    }
  });
});

$.validator.addMethod("validWei", (value, element) => {
  return this.optional(element) || value >= 0.000000000000000001;
}, "Informe um valor maior ou igual a 1 wei (0.000000000000000001 ETH).");

// function() public payable {}

/**
 * Send ether to the contract 
 */

$("#btnDeposit").click(() => {
  if ($("#formDeposit").valid()) {
    let _amount = $("#txtDepositAmount").val();
    let data = {
      to: instance.address,
      value: web3.toWei(_amount, 'ether')
    }

    web3.eth.sendTransaction(data, (err, result) => {
      if (!err) {
        console.info(result);
        setModal(result, 'DEPOSIT');
      } else {
        console.error(err);
      }
    });
  } else {
    return false;
  }
});

/**
 * Withdraw ether from the contract 
 */

$("#btnWithdraw").click(() => {
  if ($("#formWithdraw").valid()) {
    let _amount = web3.toWei($("#txtWithdrawAmount").val(), 'ether');
    let _description = web3.toHex($("#txtWithdrawDescription").val());

    instance.withdraw(_amount, _description, (err, result) => {
      if (!err) {
        setModal(result, 'WITHDRAW');
      } else {
        console.error(err);
      }
    });
  } else {
    return false;
  }
})

// watch DepositFunds events
function eventDepositFunds() {
  var event = instance.DepositFunds();
  event.watch((err) => {
    if (!err) {
      getWalletBalance(balance => {
        $('#balance').text(web3.fromWei(balance, 'ether') + " ETH");
      });
    } else {
      console.log(err);
    }
  });
}

function setModal(txn, action) {
  switch (action) {
    case 'DEPOSIT':
      $('#transactionModalLabel').text('Depósito Realizado');
      $('.modal-body').html(
        '<p>Transação executada, aguarde a validação da rede...</p>' +
        '<p>Transação: <mark id="lblTransaction" class="small"></mark></p>'
      );
      break;
    case 'WITHDRAW':
      $('#transactionModalLabel').text('Saque Realizado');
      $('.modal-body').html(
        '<p>Transação executada, aguarde a validação da rede...</p>' +
        '<p>A transferência será efetuada assim que for aprovada por no mínimo 2 Advisers e 4 Colaboradores.</p>' +
        '<p>Transação: <mark id="lblTransaction" class="small"></mark></p>'
      );
      break;

    default:
      break;
  }
  $('#lblTransaction').text(txn);
  $('#transactionDetails').attr('href', 'https://rinkeby.etherscan.io/tx/'.concat(txn));
  $('#transactionModal').modal('show');
  $('#formDeposit')[0].reset();
  $('#formWithdraw')[0].reset();
}

$('#transactionDetails').click(() => {
  $('#modal').modal('toggle');
})

