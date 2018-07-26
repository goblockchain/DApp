// AccountTransaction.sol

$(document).ready(() => {
  pendingTransactions()
})

$("#btnSign").click(() => {
  const id = $("#txtTransactionID").val()
  signTransaction(id, (result) => {
    console.log(result)
  })
})

$("#btnCancel").click(() => {
  const id = $("#txtTransactionID").val()
  deleteTransaction(id, (result) => {
    console.log(result)
  })
})

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
            '<td>' + from + '</td>' + 
            '<td>' + to + '</td>' +
            '<td>' + description + '</td>' +
            '<td>' + amount + '</td>' +
            '<td>' + date + '</td>' +
            '<td>' + status + '</td>' +
            '</tr>'
          )
        })
      })
    }
  })
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