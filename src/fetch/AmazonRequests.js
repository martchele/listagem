class AmazonRequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeLivros = '/vendas'; // Corrigido para a rota correta
    }

    async listarLivros() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeLivros}`); // Corrigido para usar this.routeLivros
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da Amazon');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados da Amazon:', error);
            return null;
        }
    }
}

export default new AmazonRequests();
