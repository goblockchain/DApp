// AccountTransaction.sol

$(document).ready(() => {

  getPendingTransactions()

  function getTransactionDetail (id, f) {
    instance._transactions.call(id, (err, result) => {
      if (!err) {
        f(result)
      } else {
        console.log(err)
      }
    })
  }

  function getPendingTransactions () {
    instance.getPendingTransactions.call((err, result) => {
      if (!err) {
        if (result.length > 0) {
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
                '</tr>' +
              '</thead>' +
              '<tbody>' +
              '</tbody>' +
            '</table>'
          )

          $.each(result, (i, id) => {
            getTransactionDetail(id, (tx) => {
              $('#pendingTransactions > table > tbody').append(
                '<tr> <th scope="row">' + id + '</th> <td>' + tx[0] + '</td> <td>' + tx[1] + '</td> <td>' + tx[2] + '</td> <td>' + tx[3] + '</td> <td>' + tx[4] + '</td> </tr>'
              )
            })
          })
        }
      } else {
        console.error(err)
      }
    });
  }
})
