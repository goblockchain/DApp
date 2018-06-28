
let abi = [{"constant":false,"inputs":[{"name":"_transactionId","type":"uint256"}],"name":"signTransactionSendToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_authorizers","outputs":[{"name":"_address","type":"address"},{"name":"entryDate","type":"uint256"},{"name":"statusAuthorizer","type":"uint8"},{"name":"typeAuthorizer","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_AUTHORIZERS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_authorized","type":"address"}],"name":"removeAuthorizer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MIN_SIGNATURES_COLAB","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"},{"name":"_description","type":"bytes32"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_transactionId","type":"uint256"}],"name":"deleteTransactionSendToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_transactionId","type":"uint256"}],"name":"getTransactionSendToken","outputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"bytes32"},{"name":"date","type":"uint256"},{"name":"signatureCountColab","type":"uint8"},{"name":"signatureCountAdviser","type":"uint8"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"walletBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPendingTransactions","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_numAuthorized","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_authorized","type":"address"},{"name":"_typeAuthorizer","type":"uint8"}],"name":"addAuthorizer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MIN_SIGNATURES_ADVISER","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"DepositFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msg","type":"string"}],"name":"LogDebug","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionSendTokenCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionSendTokenCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"by","type":"address"},{"indexed":false,"name":"transactionId","type":"uint256"}],"name":"TransactionSendTokenSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
let contractAddress = "0x2aED9e9e1F66B838ce0b93053d4c746Afd154AA9";
let instance = getInstanceContract();
let account = web3.eth.accounts[0];

$(document).ready(() => {
  setInterval(() => {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
      location.reload();
    }
  }, 100);
});

//load
window.addEventListener('load', () => {
  // var urlNode = 'http://127.0.0.1:7545';
  // window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
  window.web3 = new Web3(web3.currentProvider);
  checkWeb3();
});

//Check the web3 connection
function checkWeb3() {
  // Set the connect status on the app
  if (web3 && web3.isConnected()) {
    console.info('Connected');
    $('#statusConnection').text("Conectado");
  } else {
    $('#statusConnection').text("Desconectado");
  }
}

function getInstanceContract() {
  var contratoABI = web3.eth.contract(abi);
  var instance = contratoABI.at(contractAddress);
  return instance;
}

function getOwner(f) {
  instance.owner((err, result) => {
    if (!err) {
      f(result);
    } else {
      console.error(error);
    }
  });
}

function isAuthorizer(address, f) {
  instance._authorizers.call(address, (err, result) => {
    if (!err) {
      f(result[0].toString() !== '0x0000000000000000000000000000000000000000')
    } else {
      console.error(err);
    }
  });
}

function getWalletBalance(f) {
  instance.walletBalance((err, result) => {
    if (!err) {
      f(result);
    } else {
      console.error(err);
    }
  });
}
