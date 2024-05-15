import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import AmazonRequests from '../../fetch/AmazonRequests';
import AmazonCard from '../../components/Cards/cAmazon';
import styles from './Amazon.module.css';

function CardAmazon() {
    const [livros, setLivros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const livrosData = await AmazonRequests.listarLivros();
            setLivros(livrosData);
        };
        fetchData();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const livrosPaginados = livros.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas com base no número de itens e itens por página
    const totalPages = Math.ceil(livros.length / itemsPerPage);

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
            <div className={styles.ctnLivros}>
                {livrosPaginados.length > 0 ? (
                    livrosPaginados.map(livro => (
                        <div key={livro.id_livro} className={styles.amazonCard}>
                            <AmazonCard livro={livro} />
                        </div>
                    ))
                ) : (
                    <p>Nenhum livro encontrado.</p>
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

export default CardAmazon;