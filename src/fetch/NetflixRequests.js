class NetflixRequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeTitulos = '/titulos'; // Corrigido para a rota correta
    }

    async listarTitulos() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeTitulos}`); // Corrigido para usar this.routeTitulos
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da Netflix');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados da Netflix:', error);
            return null;
        }
    }
}

export default new NetflixRequests();
