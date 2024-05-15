import React from 'react';
import style from './card.module.css'; // Importe o arquivo de estilos CSS para o card da Amazon

function AmazonCard({ livro }) {

    const exibeID = () => {
        console.log(livro.id_livro, "\n", livro);
    }

    return (
        <div className={style.cardLivro}>
            <p>Nome: {livro.nome_produto}</p>
            <p>ID: {livro.id_livro}</p>
            <p>Data da Venda: {livro.data_venda}</p>
            <p>Edição: {livro.edicao}</p>
        </div >
    );
}

export default AmazonCard;
