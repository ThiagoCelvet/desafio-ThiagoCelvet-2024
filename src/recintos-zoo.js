class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: 3, especies: ["macaco"] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: 0, especies: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: 1, especies: ["gazela"] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: 0, especies: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: 1, especies: ["leao"] }
        ];

        this.tamanhos = {
            leao: 3,
            leopardo: 2,
            crocodilo: 3,
            macaco: 1,
            gazela: 2,
            hipopotamo: 4
        };

        this.biomas = {
            leao: ["savana"],
            leopardo: ["savana"],
            crocodilo: ["rio"],
            macaco: ["savana", "floresta"],
            gazela: ["savana"],
            hipopotamo: ["savana", "rio"]
        };
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();

        if (!this.tamanhos[animal]) {
            return "Animal inválido";
        }

        if (isNaN(quantidade) || quantidade <= 0) {
            return "Quantidade inválida";
        }

        const tamanhoNecessario = this.tamanhos[animal] * quantidade;
        const biomasAceitos = this.biomas[animal];
        const recintosViaveis = [];

        this.recintos.forEach(recinto => {
            let espacoLivre = recinto.tamanhoTotal - recinto.animaisExistentes;

            if (!biomasAceitos.includes(recinto.bioma)) return;

            if (espacoLivre < tamanhoNecessario) return;

            let incompatibilidade = false;
            if (recinto.especies.length > 0) {
                for (const especieExistente of recinto.especies) {
                    if (animal === "hipopotamo" && recinto.bioma !== "savana e rio") {
                        incompatibilidade = true;
                        break;
                    } else if (["leao", "leopardo", "crocodilo"].includes(animal) && especieExistente !== animal) {
                        incompatibilidade = true;
                        break;
                    }
                }
            }

            if (incompatibilidade) return;

            if (recinto.especies.length > 0 && !recinto.especies.includes(animal)) {
                espacoLivre--;
                if (espacoLivre < tamanhoNecessario) return;
            }

            recintosViaveis.push(`Recinto nro ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoNecessario} total: ${recinto.tamanhoTotal})`);
        });

        if (recintosViaveis.length === 0) {
            return "Não há recinto viável";
        }

        recintosViaveis.sort();
        return recintosViaveis;
    }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
const especie = prompt("Digite a espécie do animal:");
const quantidade = parseInt(prompt("Digite a quantidade de animais:"), 10);
const resultado = zoo.analisaRecintos(especie, quantidade);

if (Array.isArray(resultado)) {
    resultado.forEach(recinto => console.log(recinto));
} else {
    console.log(resultado);
}