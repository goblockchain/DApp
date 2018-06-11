
// CheckingAccount.sol

// function() public payable {}

/**
 * Send ether to the contract 
 */

$("#btnDeposit").click(() => {
  let instance = getInstanceContract();
  let _amount = $("#txtDepositAmount").val();
  let data = {
    to: instance.address,
    value: web3.toWei(_amount, 'ether')
  }

  web3.eth.sendTransaction(data, (err, result) => {
    if (!err) {
      console.info(result);
      setModal(result);
    } else {
      console.error(err);
    }
  });
});

/**
 * Withdraw ether from the contract 
 */

$("#btnWithdraw").click(() => {
  let instance = getInstanceContract();

  let _amount = web3.toWei($("#txtWithdrawAmount").val(), 'ether');
  let _description = web3.toHex($("#txtWithdrawDescription").val());

  instance.withdraw(_amount, _description, (err, result) => {
    if (!err) {
      console.info(result);
      setModal(result);
    } else {
      console.error(err);
    }
  });
}) 

function setModal(transaction) {
  $('#lblTransaction').text(transaction);
  $('#transactionDetails').attr('href', 'https://rinkeby.etherscan.io/tx/'.concat(transaction));
  $('#transactionModal').modal('show');
  $('#frmCheckingAccount')[0].reset();
}

$('#transactionDetails').click(() => {
  $('#modal').modal('toggle');
})

function getWalletBalance() {
  let instance = getInstanceContract();
  instance.walletBalance((err, result) => {
    if (!err) {
      $('#balance').text(web3.fromWei(result, 'ether') + " ETH");
    } else {
      console.error(err);
    }
  });
}

$(document).ready(() => {
  getWalletBalance();
});