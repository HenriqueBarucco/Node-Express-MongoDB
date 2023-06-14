import ErroBase from './ErroBase.js';

export default class NaoEncontrado extends ErroBase {
    constructor(mensagem = 'Recurso não encontrado') {
        super(mensagem, 404);
    }
}
