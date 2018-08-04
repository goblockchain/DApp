// AccountTransaction.sol

$(document).ready(() => {
  pendingTransactions()

  var clipboard = new ClipboardJS('.address');

  clipboard.on('success', (e) => {
    $('#' + e.trigger.id).attr("title", "Copiado!");
    $('#' + e.trigger.id).tooltip('show')
    setTimeout(() => {
      $('#' + e.trigger.id).tooltip('hide')
      $('#' + e.trigger.id).attr("title", "");
    }, 1000)
  })

  $("#frmTransaction").validate({
    rules: {
      "txtTransactionID": {
        required: true,
        min: 1
      }
    },
    messages: {
      "txtTransactionID": {
        required: "Campo obrigatório",
        min: "Informe um ID maior que 0"
      }
    }
  });
})

$("#btnSearch").click(() => {
  if ($("#frmTransaction").valid()) {
    const id = $("#txtTransactionID").val()
    getTransactionDetail(id, (tx) => {
      // const from = shrinkAddress(tx[0])
      // const to = shrinkAddress(tx[1])
      // const description = web3.toAscii(tx[2])
      // const amount = web3.fromWei(tx[3], 'ether') + " ETH"
      // const date = new Date(tx[4]*1000)
      // let status = getEnumStatusTransaction(tx[7])

      $('#detailsModal #signatureCountColab').text(tx[5])
      $('#detailsModal #signatureCountAdviser').text(tx[6])

      instance._signaturesColabs(id, (err, result) => {
        if (!err) {
          f(result)
        } else {
          console.log(err)
        }
      })

      $('#detailsModal #approveVotes').text(10)
      $('#detailsModal #declineVotes').text(10)
    })
  } else {
    return false;
  }
})

$("#btnSign").click(() => {
  if ($("#frmTransaction").valid()) {
    const id = $("#txtTransactionID").val()
    signTransaction(id, (result) => {
      setModal(result, 'SIGN')
    })
  } else {
    return false;
  }
})

$("#btnCancel").click(() => {
  if ($("#frmTransaction").valid()) {
    const id = $("#txtTransactionID").val()
    deleteTransaction(id, (result) => {
      setModal(result, 'CANCEL')
    })
  } else {
    return false;
  }
})

function setModal(txn, action) {
  $('.modal-body').html(
    '<p>Transação executada, aguarde a validação da rede...</p>' +
    '<p>Transação: <mark id="lblTransaction" class="small"></mark></p>'
  );

  switch (action) {
    case 'SIGN':
      $('#transactionModalLabel').text('Transação Validada');
      break;
    case 'CANCEL':
      $('#transactionModalLabel').text('Transação Cancelada');
      break;

    default:
      break;
  }

  $('#lblTransaction').text(txn);
  $('#transactionDetails').attr('href', 'https://rinkeby.etherscan.io/tx/'.concat(txn));
  $('#transactionModal').modal('show');
  $('#frmTransaction')[0].reset();
}

function pendingTransactions () {
  getPendingTransactions((transactions) => {
    if (transactions.length > 0) {
      $('#pendingTransactions').append(
        '<table class="table table-bordered">' +
          '<thead>' +
            '<tr>' +
              '<th scope="col">ID</th>' +
              '<th scope="col">Endereço de Origem</th>' +
              '<th scope="col">Endereço de Destino</th>' +
              '<th scope="col">Descrição</th>' +
              '<th scope="col">Quantidade</th>' +
              '<th scope="col">Data</th>' +
              '<th scope="col">Status</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
          '</tbody>' +
        '</table>'
      )

      $.each(transactions, (i, id) => {
        getTransactionDetail(id, (tx) => {
          const from = shrinkAddress(tx[0])
          const to = shrinkAddress(tx[1])
          const description = web3.toAscii(tx[2])
          const amount = web3.fromWei(tx[3], 'ether') + " ETH"
          const date = new Date(tx[4]*1000)
          let status = getEnumStatusTransaction(tx[7])

          $('#pendingTransactions > table > tbody').append(
            '<tr> <th scope="row">' + id + '</th>' +
            '<td><span id="' + id + 'addressFrom" class="address text-primary" style="cursor: pointer" data-clipboard-text="' + tx[0] + '" data-trigger="manual" data-toggle="tooltip" data-placement="top">' + from + '</span></td>' +
            '<td><span id="' + id + 'addressTo" class="address text-primary" style="cursor: pointer" data-clipboard-text="' + tx[1] + '" data-trigger="manual" data-toggle="tooltip" data-placement="top">' + to + '</span></td>' +
            '<td>' + description + '</td>' +
            '<td>' + amount + '</td>' +
            '<td>' + moment(date).format('DD MMM Y - hh:ss:SS A') + '</td>' +
            '<td>' + status + '</td>' +
            '</tr>'
          )
        })
      })
    }
  })
}

function getVoteValue (voteId) {

}

function deleteTransaction (id, f) {
  instance.deleteTransactionSendToken(id, (err, result) => {
    if (!err) {
      f(result)
    } else {
      console.log(err)
    }
  })
}

function signTransaction (id, f) {
  instance.signTransactionSendToken(id, (err, result) => {
    if (!err) {
      f(result)
    } else {
      console.log(err)
    }
  })
}

function getEnumStatusTransaction (value) {
  switch (value.toString()) {
    case "0":
      return 'WAITING'
      break;
    
    case "1":
      return 'CANCELLED'
      break;

    case "2":
      return 'SENDED'
      break;
  
    default:
      break;
  }
}

function getTransactionDetail (id, f) {
  instance._transactions(id, (err, result) => {
    if (!err) {
      f(result)
    } else {
      console.log(err)
    }
  })
}

function getPendingTransactions (f) {
  instance.getPendingTransactions((err, result) => {
    if (!err) {
      f(result)
    } else {
      console.log(err)
    }
  })
}