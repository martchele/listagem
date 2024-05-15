class FifaRequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeJogadores = '/playercards'; // Corrigido para a rota correta
    }

    async listarJogadores() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeJogadores}`); // Corrigido para usar this.routeJogadores
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do FIFA');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados do FIFA:', error);
            return null;
        }
    }
}

export default new FifaRequests();
