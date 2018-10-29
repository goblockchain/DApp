let abi = [{
    'constant': false,
    'inputs': [{
        'name': '_authorized',
        'type': 'address'
      },
      {
        'name': '_typeAuthorizer',
        'type': 'uint8'
      }
    ],
    'name': 'addAuthorizer',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': '_transactionId',
      'type': 'uint256'
    }],
    'name': 'deleteTransactionSendToken',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [{
        'indexed': false,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'DepositFunds',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'name': 'msg',
      'type': 'string'
    }],
    'name': 'LogDebug',
    'type': 'event'
  }, {
    'constant': false,
    'inputs': [{
      'name': '_authorized',
      'type': 'address'
    }],
    'name': 'removeAuthorizer',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'constant': false,
    'inputs': [{
      'name': '_transactionId',
      'type': 'uint256'
    }],
    'name': 'signTransactionSendToken',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'name': 'transactionId',
      'type': 'uint256'
    }],
    'name': 'TransactionCancelled',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'name': 'from',
      'type': 'address'
    }, {
      'indexed': false,
      'name': 'to',
      'type': 'address'
    }, {
      'indexed': false,
      'name': 'amount',
      'type': 'uint256'
    }, {
      'indexed': false,
      'name': 'transactionId',
      'type': 'uint256'
    }],
    'name': 'TransactionSendTokenCreated',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'name': 'from',
      'type': 'address'
    }, {
      'indexed': false,
      'name': 'to',
      'type': 'address'
    }, {
      'indexed': false,
      'name': 'amount',
      'type': 'uint256'
    }, {
      'indexed': false,
      'name': 'transactionId',
      'type': 'uint256'
    }],
    'name': 'TransactionSendTokenCompleted',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': false,
      'name': 'by',
      'type': 'address'
    }, {
      'indexed': false,
      'name': 'transactionId',
      'type': 'uint256'
    }],
    'name': 'TransactionSendTokenSigned',
    'type': 'event'
  }, {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'name': 'previousOwner',
      'type': 'address'
    }, {
      'indexed': true,
      'name': 'newOwner',
      'type': 'address'
    }],
    'name': 'OwnershipTransferred',
    'type': 'event'
  }, {
    'constant': false,
    'inputs': [{
      'name': 'newOwner',
      'type': 'address'
    }],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'payable': true,
    'stateMutability': 'payable',
    'type': 'fallback'
  }, {
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  }, {
    'constant': false,
    'inputs': [{
      'name': '_amount',
      'type': 'uint256'
    }, {
      'name': '_description',
      'type': 'bytes32'
    }],
    'name': 'withdraw',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [{
      'name': '',
      'type': 'address'
    }],
    'name': '_authorizers',
    'outputs': [{
      'name': '_address',
      'type': 'address'
    }, {
      'name': 'entryDate',
      'type': 'uint256'
    }, {
      'name': 'statusAuthorizer',
      'type': 'uint8'
    }, {
      'name': 'typeAuthorizer',
      'type': 'uint8'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': '_numAuthorized',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'name': '_transactions',
    'outputs': [{
      'name': 'from',
      'type': 'address'
    }, {
      'name': 'to',
      'type': 'address'
    }, {
      'name': 'description',
      'type': 'bytes32'
    }, {
      'name': 'amount',
      'type': 'uint256'
    }, {
      'name': 'date',
      'type': 'uint256'
    }, {
      'name': 'signatureCountColab',
      'type': 'uint8'
    }, {
      'name': 'signatureCountAdviser',
      'type': 'uint8'
    }, {
      'name': 'statusTransaction',
      'type': 'uint8'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'getPendingTransactions',
    'outputs': [{
      'name': '',
      'type': 'uint256[]'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'MAX_AUTHORIZERS',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'MIN_SIGNATURES_ADVISER',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'MIN_SIGNATURES_COLAB',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [{
      'name': '',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }, {
    'constant': true,
    'inputs': [],
    'name': 'walletBalance',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }
]
let contractAddress = '0x673608d374c786eb2cd727bb9256a1bef1b53c3a'
let instance = getInstanceContract(abi, contractAddress);
let account = web3.eth.accounts[0];
let count = 0;

$(document).ready(async () => {
  // Reload the page when user select another account in MetaMask  
  setInterval(() => {

    if (web3.eth.accounts[0] !== this.account && count > 2) {
//      debugger;
      account = web3.eth.accounts[0];
      location.reload();
    }
    checkWeb3();

  }, 5000)
})

// load
window.addEventListener('load', async (event) => {
  // Modern dapp browsers...    
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable()
      // Acccounts now exposed                  
    } catch (error) { // User denied account access...        
      //TODO Sweet Alert ou algo assim..
      alert('Precisamos da sua permissão para nos conectarmos.');
      $('#statusConnection').text('Desconectado');
    }
  } else if (window.web3) { // Legacy dapp browsers...
    window.web3 = new Web3(web3.currentProvider)
  } else { // Non-dapp browsers..
    //TODO Sweet Alert ou algo assim..
    alert('Instale MetaMask!, para utilizar nossos serviços.');
  }
  checkWeb3()
});

// Check the web3 connection
function checkWeb3() {
  // Set the connect status on the app
  if (web3 && web3.isConnected()) {
    if (web3.eth.accounts[0] == undefined){
      console.info('Falta conectar no metamask');
      $('#statusConnection').text('Desconectado');  
    }
    else{
      console.info('Connected');
      $('#statusConnection').text('Conectado');  
    }
  } else {
    $('#statusConnection').text('Desconectado')
  }
}

function getInstanceContract(abi, contractAddress) {
  var contratoABI = web3.eth.contract(abi);
  var instance = contratoABI.at(contractAddress);
  return instance;
}

function getOwner(f) {
  instance.owner((err, result) => {
    if (!err) {
      f(result)
    } else {
      console.error(error)
    }
  })
}

function isAuthorizer(address, f) {
  instance._authorizers.call(address, (err, result) => {
    if (!err) {
      f(result[0].toString() !== '0x0000000000000000000000000000000000000000')
    } else {
      console.error(err)
    }
  })
}

function getWalletBalance(f) {
  instance.walletBalance((err, result) => {
    if (!err) {
      f(result)
    } else {
      console.error(err)
    }
  })
}

function shrinkAddress(address) {
  return address.substring(0, 8).concat('...').concat(address.substring(37, 42))
}