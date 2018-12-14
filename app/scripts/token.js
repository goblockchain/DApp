
let abiToken = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "addMinter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceMinter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "isMinter", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "account", "type": "address" }], "name": "MinterAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "account", "type": "address" }], "name": "MinterRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }];

//rinkeby
// let contractAddressToken = "0x2bEB31cD02c8f85568ddbE3e5b492A912b5f0109";

//mainnet
let contractAddressToken = "0x48fd2b9e019f137730db101552d04d471fbac9d1";
let instanceToken = getInstanceContract(abiToken, contractAddressToken);



$(document).ready(() => {
  $("#formTransfer").validate({
    rules: {
      "txtDepositAddress": {
        required: true
      },
      "txtDepositAmount": {
        required: true
      }
    },
    messages: {
      "txtDepositAddress": {
        required: "Informe o endereço de recebimento"
      },
      "txtDepositAmount": {
        required: "Informe a quantidade de ETH do depósito",
        number: "Este campo só aceita números. Exemplo: 1.437"
      }
    }
  });

  getToken();
});

function getToken() {
  instanceToken.name((err, result) => {
    if (!err) {
      $("#name").text(result);
    } else {
      console.error(err);
    }
  });
  instanceToken.decimals((err, result) => {
    if (!err) {
      // $("#lblOwner").text(result);
      console.info(result);
    } else {
      console.error(err);
    }
  });
  instanceToken.symbol((err, result) => {
    if (!err) {
      $("#symbol").text(result);
      console.info(result);
    } else {
      console.error(err);
    }
  });

  instanceToken.totalSupply((err, result) => {
    if (!err) {
      $("#totalSupply").text(result);
      console.info(result);
    } else {
      console.error(err);
    }
  });

  web3.eth.getAccounts((_err, accounts) => {
    instanceToken.balanceOf(accounts[0], (err, result) => {
      if (!err) {
        $("#myBalanceOf").text(result);
        console.info(result);
      } else {
        console.error(err);
      }
    });
  })
}


$("#btnTransferMint").click(() => {
    let _to = $("#txtDepositAddressMint").val();
    let _quantity = $("#txtDepositAmountMint").val();

    console.info("===to==="+ _to);
    console.info("===_quantity==="+ _quantity);    

    instanceToken.mint(_to, _quantity, (err, res) => {
      if (!err) {
        console.log(res);
        eventTransfer();
        setModal(res, 'TRANSFER');
      } else {
        console.log(res);
      }
    })
});

//file
function approve() {

}

//gui
function transferFrom() {

  instanceToken.transferFrom(from, to, quantity, (err, res) => {
    if (!err) {
      console.log(res);
    } else {
      console.log(res);
    }
  })
}

function setModal(txn, action) {
  switch (action) {
    case 'TRANSFER':
      $('#transactionModalLabel').text('Transferência Realizada');
      $('.modal-body').html(
        '<p>Transação executada, aguarde a validação da rede...</p>' +
        '<p>Transação: <mark id="lblTransaction" class="small"></mark></p>'
      );
      break;

    default:
      break;
  }
  $('#lblTransaction').text(txn);
  $('#transactionDetails').attr('href', 'https://rinkeby.etherscan.io/tx/'.concat(txn));
  $('#transactionModal').modal('show');
  $('#formTransfer')[0].reset();
}

function eventTransfer() {
  var event = instanceToken.Transfer();
  event.watch(function (error, result) {
    if (!error) {
      getToken()
      console.info("evento tranfer " + result.args.from);
      event.stopWatching();
    } else {
      console.log(error);
    }
  });
}

$("#btnAdicionarMinter").click(() => {
  console.info("btnAdicionarMinter");
})

//function totalSupply() public view returns (uint256);
//function balanceOf(address who) public view returns (uint256);

// function transfer(address to, uint256 value) public returns (bool);
// function transferFrom(address from, address to, uint256 value) public returns (bool);
// function approve(address spender, uint256 value) public returns (bool);

