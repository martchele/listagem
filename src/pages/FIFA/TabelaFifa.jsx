import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import FifaRequests from '../../fetch/FifaRequests'; // Importando as requisições do FIFA
import styles from './FIFA.module.css';

function CardFIFA() {
    const [jogadores, setJogadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jogadoresData = await FifaRequests.listarJogadores();
                setJogadores(jogadoresData);
            } catch (error) {
                console.error('Erro ao buscar dados do FIFA:', error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const jogadoresPaginados = jogadores.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(jogadores.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <NavBar />
            <div className={styles.ctnJogadores}>
                {jogadoresPaginados.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Posição</th>
                                <th>Overall</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jogadoresPaginados.map((jogador) => (
                                <tr key={jogador.id}>
                                    <td>{jogador.playerid}</td>
                                    <td>{jogador.playername}</td>
                                    <td>{jogador.playerposition}</td>
                                    <td>{jogador.ovr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum jogador encontrado.</p>
                )}
            </div>

            {/* Controles de navegação entre páginas */}
            <div className={styles.pagination}>
                <button className={styles.paginationButton} onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button className={styles.paginationButton} onClick={nextPage} disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default CardFIFA;
