import React, { useState, useEffect } from 'react';
import NetflixRequests from '../../fetch/NetflixRequests';

function NetflixTable() {
    const [titulos, setTitulos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const titulosData = await NetflixRequests.listarTitulos();
            setTitulos(titulosData);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Lista de Títulos da Netflix</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Gênero</th>
                        <th>Ano</th>
                        <th>Classificação</th>
                    </tr>
                </thead>
                <tbody>
                    {titulos.map(titulo => (
                        <tr key={titulo.id}>
                            <td>{titulo.id}</td>
                            <td>{titulo.titulo}</td>
                            <td>{titulo.genero}</td>
                            <td>{titulo.ano}</td>
                            <td>{titulo.classificacao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NetflixTable;
