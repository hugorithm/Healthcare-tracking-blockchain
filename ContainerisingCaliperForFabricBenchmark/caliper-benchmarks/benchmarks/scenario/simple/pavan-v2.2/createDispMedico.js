'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const salas = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6', 'Sala 7', 'Sala 8', 'Sala 9', 'Sala 10'];
const nomes = ['Tablet 1', 'Tablet 2', 'Tablet 3', 'Tablet 4', 'Tablet 5', 'Tablet 6', 'Tablet 7', 'Tablet 8', 'Tablet 9', 'Tablet 10'];

/**
 * Workload module for the benchmark round.
 */
class CreateDispMedWorkload extends WorkloadModuleBase {
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
        let nome = nomes[Math.floor(Math.random() * nomes.length)];
        let medico = 'Client' + this.workerIndex + '_Medico' + this.txIndex.toString();
        let sala = salas[Math.floor(Math.random() * salas.length)];
        let doente = 'Client' + this.workerIndex + '_Doente' + this.txIndex.toString();

        let args = {
            contractId: 'tracking',
            contractVersion: 'v5',
            contractFunction: 'createDispMedico',
            contractArguments: [id, nome, medico, sala, doente],
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
    return new CreateDispMedWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;