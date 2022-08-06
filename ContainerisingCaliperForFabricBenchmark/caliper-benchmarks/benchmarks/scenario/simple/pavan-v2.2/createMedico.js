'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const nomes = ['João Silva', 'Miguel Bastos', 'Joana Vascogoncelos', 'Mario Ferreira', 'Vasco Sousa', 'Rita Duarte', 'José Silva', 'Eduardo Borges', 'Ricardo Pereira', 'Francisco Silva'];

/**
 * Workload module for the benchmark round.
 */
class CreateMedicoWorkload extends WorkloadModuleBase {
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
        let id = 'Client' + this.workerIndex + '_Medico' + this.txIndex.toString();
        let nome = nomes[Math.floor(Math.random() * nomes.length)];

        let args = {
            contractId: 'tracking',
            contractVersion: 'v5',
            contractFunction: 'createMedico',
            contractArguments: [id, nome],
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
    return new CreateMedicoWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;