import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import AmazonRequests from '../../fetch/AmazonRequests';
import styles from './Amazon.module.css';

function CardAmazon() {
    const [livros, setLivros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            try {
                const livrosData = await AmazonRequests.listarLivros();
                setLivros(livrosData);
            } catch (error) {
                console.error('Erro ao buscar dados da Amazon:', error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const livrosPaginados = livros.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(livros.length / itemsPerPage);

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
            <div className={styles.ctnLivros}>
                {livrosPaginados.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data de Venda</th>
                                <th>Nome do Livro</th>
                                <th>Edição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livrosPaginados.map((livro) => (
                                <tr key={livro.id_livro}>
                                    <td>{livro.id_livro}</td>
                                    <td>{livro.data_venda}</td>
                                    <td>{livro.nome_produto}</td>
                                    <td>{livro.edicao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum livro encontrado.</p>
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

export default CardAmazon;
