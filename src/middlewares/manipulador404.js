import NaoEncontrado from '../erros/NaoEncontrado.js';

export default function manipulador404(req, res, next) {
    const erro404 = new NaoEncontrado();
    next(erro404);
}
