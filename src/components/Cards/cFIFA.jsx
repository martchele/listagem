import React from 'react';
import style from './card.module.css'; // Importe o arquivo de estilos CSS para o card do FIFA

function FifaCard({ jogador }) {

    const exibeID = () => {
        console.log(jogador.player_id, "\n", jogador);
    }

    return (
        <div className={style.cardJogador}>
            <p>Nome: {jogador.playername}</p>
            <p>ID do Jogador: {jogador.playerid}</p>
            <p>Pé Dominante: {jogador.foot}</p>
            <p>Posição: {jogador.playerposition}</p>
            <p>OVR: {jogador.ovr}</p>
        </div >
    );
}

export default FifaCard;
