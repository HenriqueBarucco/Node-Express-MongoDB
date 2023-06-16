import mongoose from 'mongoose';
import ErroBase from '../erros/ErroBase.js';
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';
import ErroValidacao from '../erros/ErroValidacao.js';

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(error, req, res, next) {
    res.status(500).send({ message: 'Erro interno do servidor' });
    if (error instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(error.errors).enviarResposta(res);
    } else if (error instanceof ErroBase) {
        error.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    }
}
