import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import NetflixRequests from '../../fetch/NetflixRequests';
import styles from './Netflix.module.css';

function CardNetflix() {
    const [titulos, setTitulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            try {
                const titulosData = await NetflixRequests.listarTitulos();
                setTitulos(titulosData);
            } catch (error) {
                console.error('Erro ao buscar dados da Netflix:', error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const titulosPaginados = titulos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(titulos.length / itemsPerPage);

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
            <div className={styles.ctnTitulos}>
                {titulosPaginados.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Gênero</th>
                                <th>Ano de Lançamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {titulosPaginados.map((titulo) => (
                                <tr key={titulo.id_titulo}>
                                    <td>{titulo.id_titulo}</td>
                                    <td>{titulo.titulo}</td>
                                    <td>{titulo.genero}</td>
                                    <td>{titulo.ano_lancamento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum título encontrado.</p>
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

export default CardNetflix;
