
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

$("btnWithdraw").click(() => {

}) 

function setModal(transaction) {
  $('#lblTransaction').text(transaction);
  $('#transactionModal').modal('show')
}

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