import NaoEncontrado from '../erros/NaoEncontrado.js';
import { livros } from '../models/index.js';

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livros
                .find()
                .populate('autor')
                .exec();

            res.status(200).json(livrosResultado);
        } catch (error) {
            next(error);
        }
    };

    static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros
                .findById(id)
                .populate('autor', 'nome')
                .exec();

            if (livroResultado) {
                res.status(200).send(livroResultado);
            } else {
                next(new NaoEncontrado('Id do livro não localizado.'));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro = new livros(req.body);

            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch (error) {
            next(error);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndUpdate(id, {
                $set: req.body,
            });

            if (livroResultado) {
                res.status(200).send({
                    message: 'Livro atualizado com sucesso',
                });
            } else {
                next(new NaoEncontrado('Id do livro não localizado.'));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros.findByIdAndDelete(id);

            if (livroResultado) {
                res.status(200).send({ message: 'Livro removido com sucesso' });
            } else {
                next(new NaoEncontrado('Id do livro não localizado.'));
            }
        } catch (erro) {
            next(erro);
        }
    };

    static listarLivroPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = livros.find({ editora: editora }, {});
            res.status(200).send(livrosResultado);
        } catch (error) {
            next(error);
        }
    };
}

export default LivroController;
