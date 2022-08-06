'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');


/**
 * Workload module for the benchmark round.
 */
class ChangeDispMedDoenteWorkload extends WorkloadModuleBase {
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
        let id = 'Client' + this.workerIndex + '_Beacon' + this.txIndex.toString();
        let doente = 'Client' + this.workerIndex + '_Doente' + this.txIndex.toString();

        let args = {
            contractId: 'tracking',
            contractVersion: 'v5',
            contractFunction: 'changeDispMedDoente',
            contractArguments: [id, doente],
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
    return new ChangeDispMedDoenteWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;