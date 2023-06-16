import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autores } from '../models/index.js';

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = autores.find();

            req.resultado = autoresResultado;

            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autor = await autores.findById(id);
            if (autor) {
                res.status(200).send(autor);
            } else {
                next(new NaoEncontrado('Id do autor não localizado.'));
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor = new autores(req.body);

            const autorSalvo = await autor.save(autor);
            res.status(201).send(autorSalvo.toJSON());
        } catch (error) {
            next(error);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndUpdate(id, {
                $set: req.body,
            });

            if (autorResultado) {
                res.status(200).send({
                    message: 'Autor atualizado com sucesso',
                });
            } else {
                next(new NaoEncontrado('Id do Autor não localizado.'));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndDelete(id);

            if (autorResultado) {
                res.status(200).send({ message: 'Autor removido com sucesso' });
            } else {
                next(new NaoEncontrado('Id do Autor não localizado.'));
            }
        } catch (erro) {
            next(erro);
        }
    };
}

export default AutorController;
