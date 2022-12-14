'use strict';

module.exports.info = 'opening accounts';
const { v1: uuidv4 } = require('uuid')

let account_array = [];

let bc, contx;
var txnPerBatch = 1
module.exports.init = function (blockchain, context, args) {
    if (!args.hasOwnProperty('txnPerBatch')) {
        args.txnPerBatch = 1;
    }
    txnPerBatch = args.txnPerBatch;
    bc = blockchain;
    contx = context;

    return Promise.resolve();
};


function generateWorkload() {
    let workload = [];
    for (let i = 0; i < txnPerBatch; i++) {
        let id = uuidv4();
        account_array.push(id)

        workload.push({
            chaincodeFunction: 'createBeacon',
            chaincodeArguments: [id, 'A'],
        });
    }
    return workload;
}

module.exports.run = function () {
    let args = generateWorkload();
    return bc.invokeSmartContract(contx, 'tracking', '5', args);
};

module.exports.end = function () {
    return Promise.resolve();
};

module.exports.account_array = account_array;
