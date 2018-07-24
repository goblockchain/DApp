
let abiToken = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "destroy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "MintEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "DestroyEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }];

//rinkeby
let contractAddressToken = "0x02B2c8357Ee5FcAD3691376f9F25B50a0B71f9a9";
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
        required: "Informe a quantidade a ser enviada"
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
      console.error(error);
    }
  });
  instanceToken.decimals((err, result) => {
    if (!err) {
      // $("#lblOwner").text(result);
      console.info(result);
    } else {
      console.error(error);
    }
  });
  instanceToken.symbol((err, result) => {
    if (!err) {
      $("#symbol").text(result);
      console.info(result);
    } else {
      console.error(error);
    }
  });
  instanceToken.version((err, result) => {
    if (!err) {
      // $("#lblOwner").text(result);
      console.info(result);
    } else {
      console.error(error);
    }
  });
  instanceToken.totalSupply((err, result) => {
    if (!err) {
      $("#totalSupply").text(result);
      console.info(result);
    } else {
      console.error(error);
    }
  });
};


//geandre
$("#btnDeposit").click(() => {
  let _to = $("#txtDepositAddress").val();
  let _quantity = $("#txtDepositAmount").val();

  if (!web3.isAddress(_to)) {
    alert('Chave pública inválida!');
    _to.innerHTML = null;
    return;
  }

  if (_quantity < 0) {
    alert('Quantidade inválida!');
    _quantity.innerHTML = null;
    return;
  }

  instanceToken.transfer(_to, web3.toWei(_quantity, 'ether'), (err, res) => {
    if (!err) {
      console.log(res);
      setModal(res);
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

//function totalSupply() public view returns (uint256);
//function balanceOf(address who) public view returns (uint256);

// function transfer(address to, uint256 value) public returns (bool);
// function transferFrom(address from, address to, uint256 value) public returns (bool);
// function approve(address spender, uint256 value) public returns (bool);

