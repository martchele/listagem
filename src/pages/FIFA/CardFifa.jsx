import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import FifaRequests from '../../fetch/FifaRequests'; // Importe as requisições do FIFA
import FifaCard from '../../components/Cards/cFIFA'; // Importe o componente do card do FIFA
import styles from './FIFA.module.css'; // Importe os estilos CSS

function CardFifa() {
    const [jogadores, setJogadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const jogadoresData = await FifaRequests.listarJogadores(); // Requisição para obter os jogadores do FIFA
            setJogadores(jogadoresData);
        };
        fetchData();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const jogadoresPaginados = jogadores.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas com base no número de itens e itens por página
    const totalPages = Math.ceil(jogadores.length / itemsPerPage);

    // Função para mudar a página atual
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para ir para a próxima página
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para ir para a página anterior
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
                    jogadoresPaginados.map(jogador => (
                        <div key={jogador.player_id} className={styles.fifaCard}>
                            <FifaCard jogador={jogador} />
                        </div>
                    ))
                ) : (
                    <p>Nenhum jogador encontrado.</p>
                )}
            </div>

            {/* Controles de navegação entre páginas */}
            <div className={styles.pag}>
                <button className={styles.pagButton} onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button className={styles.pagButton} onClick={nextPage} disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default CardFifa;
