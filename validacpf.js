class ValidaCPF {
    constructor(cpfEnviado) {

        //estamos definindo uma nova propriedade chama cpfLimpo para a nossa instancia
        //lembre-se this re refere a nossa instancia

        Object.defineProperty(this, 'cpfLimpo', {
            writable: false, //a propriedade não pode ser modiicada
            enumerable: true,   // Vai aparecer quando listar as propriedades
            configurable: false,    //a propriedade não pode ser reconfigurada ou deletada do objeto.

            // metodo replace foi usado para substituir tudo o que não for numero por uma string vazia
            // \D+ sinifica qualquer valor não numerico, ou seja, esta pegando tudo que não for numero
            // /g sinifica global, ou seja, vai substituir todas as ocorrencias na string, ou seja, no CPFenviado,
            // ou seja, se o cpf enviado tiver algum caractere diferente de numero então sera substituito por uma string vazia
            // ou seja, value: cpfEnviado.replace(/\D+/g, '') remove tudo que não for numero como traços etc... e retorna apenas os numeros do cpf

            value: cpfEnviado.replace(/\D+/g, '')

        });
    }

    éSequência() {
        //o comando this.cpfLimpo.charAt(0).repeat(11) esta repetindo o primeiro elemento do this.cpfLimpo que esta no indice 0 e repetindo 11 vezes
        //em seguida e feita um comparação com o cpf original
        //ou seja, sethis.cpfLimpo for, por exemplo, "11122233344", então this.cpfLimpo.charAt(0) seria "1", e .repeat(11) resultaria em "11111111111"
        //Se this.cpfLimpo não for uma sequência de dígitos repetidos, a função retorna false, caso contrario true

        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        //slice retorna o primeiro digito que esta no indice(0) do cpf ate o antepenultimo digito que esta no indice (-2) do cpf. exemplo:
        //se this.cpfLimpo for "12345678900", então this.cpfLimpo.slice(0, -2) resultaria em "123456789".
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        //this.novoCPF é um propriedade que acabmos de criar dentro do metodo geraNovoCpf para a instancia/objeto da class
        this.novoCPF = cpfSemDigitos + digito1 + digito2; 
    }

    //usamos estatic porque queremos que o metodo geraDigito() seja referente a nossa class e não a sua instancia/objeto
    //ou seja, o metodo pode ser chamado diretamente pela class se precisar de uma instancia
    static geraDigito(cpfSemDigitos) {

        let total = 0;// essa variavel vai acumular o resultado de cada iteração do loop for

        //com base na quantidade de caractesres do cpfsemdigitos vamos calcular +1, ou seja,
        //se o cpfSemDigitos for 045663052 e somamos com +1 resulta no numero 10, porque o cpfSemDigitos tem 9 caracteres quando somado com +1 fica igual a 10
        //o cpfSemDigitos permanece inalterado, resultando em:
        //cpfSemDigitos = 045663052. pelo fato de usarmos cpfSemDigitos.length, o cpfSemDigitos é retornado em formato de STRING
        //reverso = 10

        //reverso é uma variavel que vai controlar a quantidade de iterações,ou seja, vai ocorrer 10 iterações no total
        let reverso = cpfSemDigitos.length + 1;

        //lembre-se quando qualquer estrutura de repetição/loop for usado,
        //sempre ocorre iteração, ou seja, a varivael percorrer cada elemento individualmente da variavel


        /*

        imagine que cpfSemdigitos é 045663052, logo o resultado do for é:

        Iteração 1:
        stringNumerica = '0'            ---> primeiro caractere do cpfSemDigitos em formato de string
        Number(stringNumerica) = 0      ---> convertendo o caractere para Number
        total += 10 * 0 -> total permanece 0
        reverso-- -> reverso agora é 9 

        em seguida:

        Iteração 2:
        stringNumerica = '4'
        Number(stringNumerica) = 4
        total += 9 * 4 -> total = 0 + 36 = 36
        reverso-- -> reverso agora é 8

        apos todas as iterações, o valor da variavel acumuladora seria igual a total = 188, com base no cpf usado de exemplo
        */

        for (let stringNumerica of cpfSemDigitos) {
            total += reverso * Number(stringNumerica); //usamos Number() para converte o cfpSemDigito de String para Number

            reverso--;  //quando usamos reverso--, significa que a cada iteração do loop for a variavel reverso vai diminuir uma unidade
        }

        // o operador % calcula o resto da visão, ou seja, total = 188 % 11 = resto 1
        const digito = 11 - (total % 11);// o numero 11 foi escolhido porque queremos um numero entre 1 e 10
        return digito <= 9 ? String(digito) : '0';  //digito é convertido para string (String(digito)) se estiver entre 1 e 9, ou retorna '0' se for 10.
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.éSequência()) return false;
        this.geraNovoCpf();

        return this.novoCPF === this.cpfLimpo;
    }
}

