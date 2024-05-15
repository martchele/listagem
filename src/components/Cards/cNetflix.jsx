import React from 'react';
import style from './card.module.css'; // Importe o arquivo de estilos CSS para o card da Netflix

function NetflixCard({ titulo }) {

    const exibeID = () => {
        console.log(titulo.id_titulo, "\n", titulo);
    }

    return (
        <div className={style.cardTitulo}>
            <p>Título: {titulo.titulo}</p>
            <p>ID do Título: {titulo.show_id}</p>
            <p>Tipo: {titulo.tipo}</p>
            <p>País: {titulo.pais}</p>
            <p>Ano de Lançamento: {titulo.ano_lancamento}</p>
        </div >
    );
}

export default NetflixCard;
