import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import NetflixRequests from '../../fetch/NetflixRequests'; // Importe as requisições da Netflix
import NetflixCard from '../../components/Cards/cNetflix'; // Importe o componente do card da Netflix
import styles from './Netflix.module.css'; // Importe os estilos CSS

function CardNetflix() {
    const [titulos, setTitulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de itens por página

    useEffect(() => {
        const fetchData = async () => {
            const titulosData = await NetflixRequests.listarTitulos(); // Requisição para obter os títulos da Netflix
            setTitulos(titulosData);
        };
        fetchData();
    }, []);

    // Calcular índices dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const titulosPaginados = titulos.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas com base no número de itens e itens por página
    const totalPages = Math.ceil(titulos.length / itemsPerPage);

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
            <div className={styles.ctnTitulos}>
                {titulosPaginados.length > 0 ? (
                    titulosPaginados.map(titulo => (
                        <div key={titulo.id_titulo} className={styles.netflixCard}>
                            <NetflixCard titulo={titulo} />
                        </div>
                    ))
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
