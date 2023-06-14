import livros from '../models/Livro.js';

class LivroController {
    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros
                .find()
                .populate('autor')
                .exec();

            res.status(200).json(livrosResultado);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static listarLivroPorId = async (req, res) => {
        try {
            const id = req.params.id;

            const livroResultado = await livros
                .findById(id)
                .populate('autor')
                .exec();

            if (livroResultado) {
                res.status(200).send(livros);
            } else {
                res.status(400).send({
                    message: 'Id do livro não localizado.',
                });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static cadastrarLivro = async (req, res) => {
        try {
            let livro = new livros(req.body);

            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch (error) {
            res.status(500).send({
                message: `${error.message} - falha ao cadastrar livro.`,
            });
        }
    };

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).send({
                message: 'Livro atualizado com sucesso',
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndDelete(id);
            res.status(200).send({
                message: 'Livro removido com sucesso.',
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    static listarLivroPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = livros.find({ editora: editora }, {});
            res.status(200).send(livrosResultado);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
}

export default LivroController;
