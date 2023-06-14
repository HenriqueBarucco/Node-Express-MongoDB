import RequisicaoIncorreta from './RequisicaoIncorreta.js';

export default class ErroValidacao extends RequisicaoIncorreta {
    constructor(error) {
        const mensagensErro = Object.values(error.errors)
            .map((erro) => erro.message)
            .join('; ');
        super(`Os seguintes errors foram encontrados: ${mensagensErro}`);
    }
}
