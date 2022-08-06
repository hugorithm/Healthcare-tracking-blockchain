'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const salas = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6', 'Sala 7', 'Sala 8', 'Sala 9', 'Sala 10'];

/**
 * Workload module for the benchmark round.
 */
class CreateDoenteWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        this.txIndex++;
        let id = 'Client' + this.workerIndex + '_Doente' + this.txIndex.toString();
        let sala = salas[Math.floor(Math.random() * salas.length)];

        let args = {
            contractId: 'tracking',
            contractVersion: 'v5',
            contractFunction: 'createDoente',
            contractArguments: [id, sala],
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateDoenteWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;