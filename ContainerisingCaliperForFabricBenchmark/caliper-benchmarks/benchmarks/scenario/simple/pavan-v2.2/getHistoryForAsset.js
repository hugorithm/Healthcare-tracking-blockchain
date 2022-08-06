'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');


/**
 * Workload module for the benchmark round.
 */
class GetHistoryForAssetWorkload extends WorkloadModuleBase {
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
        let id = 'Client' + this.workerIndex + '_Dispositivo' + this.txIndex.toString();

        let args = {
            contractId: 'tracking',
            contractVersion: 'v5',
            contractFunction: 'getHistoryForAsset',
            contractArguments: [id],
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
    return new GetHistoryForAssetWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;