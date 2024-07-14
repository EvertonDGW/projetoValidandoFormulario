class ValidaFormulario { /* primeira letra deve ser MAIUSCULA */
    constructor() {
        this.formulario = document.querySelector('.formulario') //propriedade da class ValidadeFormulario e da instacia valida
        evento()
    }

    evento() { //metodo da class ValidaFormulario e da instancia valida
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e) // handleSubmit sinifica tratar o evento de enviar
        })
    }

    handleSubmit(e) { //metodo da class ValidaFormulario e da instancia valida
        e.preventDefault(); //removendo o comportamenteo padrão do submit
        const camposValidos = this.camposSaoValidos()
        const senhasValidas = this.senhasSaoValidas()

        if (camposValidos && senhasValidas) {
            alert('Formulario enviado')
            this.formulario.submit()//enviando o formulario apos a validação dos campos. submit() é um objeto nativo do javascript, que envia o formulario para o servidor
        }
    }

    senhasSaoValidas() { //metodo da nossa class ValidaFormulario e tambem da instancia valida

        let valid = true; //é usado para avaliar se a senha e repetirSenha são validos

        const senha = this.formulario.querySelector('.senha-validar');
        const repetirSenha = this.formulario.querySelector('repetir-senha-validar');

        if (senha.value !== repetirSenha.value) { // se o valor da senha e repetirsenha forem diferentes o if é avaliado como true. o if so e executado se a condição for verdadeira
            valid = false;
            this.criaErro(senha, 'campo senha e repetir senha precisam ser iguais');
            this.criaErro(repetirSenha, 'campo senha e repetir senha precisam ser iguais');

        }

        if (senha.value.length < 6 || senha.value.length > 12)
            valid = false;
        this.criaErro(senha, 'a senha precisa ter entre 6 a 12 caracteres');

        return valid
    }

    camposSaoValidos() {
        let valid = true

        //iterando sobre todos os elementos que tiverem a class 'error-text'.
        //errorText.remove() serve para deletar a mensagem de error quando usuario preencher o input corretamente
        //'error-text' é uma class que vamos adicionar usando JS

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        //iterando sobre todos os input do formulario, que possuem a class validar
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            //observe que dentro do nosso formulario existe uma hierarquia, ou seja, primeiro vem o nome, sobrenome, cpf etc...
            //o comando previousElementSiblingé é usado para acessar o elemento anterior dessa hierarquia,
            //por exemplo se voce estiver preenchendo o input de sobrenome o comando previousElementSibling vai estar verificando o elemento anterior que é o input de nome
            //basicamente vamos usar o previousElementSibling para verificar se o campo anterior não esta em branco, ou seja,
            //se o usuario estiver preenchendo o input de sobrenome o comando previousElementSibling ira verificar o elemento anterior que é o nome

            const label = campo.previousElementSibling.innerText;

            if (!campo.value) { //verificando se o input anterior esta vazio se estiver o if retorna true

                this.criaErro(campo, `campo "${label}" não pode estar em branco`) // caso o input anterior estiver vazio essa mensagem é exibida
                valid = false //indica que o campo anterior não é valido
            }
            // para o input que possuir a class 'cpf',ou seja, vamos passar o input cpf como como argumento para o parametro do metodo validaCPF()
            if (campo.classList.contains('cpf')) {

                //validaCPF é um metodo da instancia valida que vai verificar se o cpf inserido no input CPF é valido
                //se o cpf for valido retorna true se não false
                //o sinal de ! é usado para inverte esse resultado, ou seja,
                //se o cpf for valido o sinal ! não executa o if
                //se o cpf não for valido o ! faz com que o if seja executado, indicando que a validação do formulario falhou devido ao cpf invalido

                if (!this.validaCPF(campo)) valid = false;
            }

            // para o input que possuir a class 'usuario',ou seja, vamos passar o input de usuario como argumento para o paremetro do metodo validaUsuario
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            }




        }
        return valid
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }
        // essa espressão /^[a-zA-Z0-9]+$/g) é um conjunto de caracteres que são permitidos,ou seja, é obrigatorio que o input de usuario tenha esses caractes
        //a-z sinifica que as letra minusculas de a até z são permitidas
        //A-Z sinifica que as letras maiusculas de A até Z são permitidas
        //0-9 sinifica que os numeros de 0 até 9 são permitidos
        // /^ esse sinal marca o inicio da string,ou seja, o inicio do que o usuario vai digitar
        //+$ sinifica que o input pode ter 1 ou mais caracteres do conjunto, ou seja,não existe limite
        // /g esse sinal significa o fim da string
        //o if verifica isso:
        //Se usuario contém apenas caracteres do nosso conjunto: a condição if é false e a string é considerada válida.
        //Se usuario contém qualquer caractere fora do conjunto permitido: a condição if é true e a string é considerada inválida.
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value); /* esse new ValidaCPF() é uma class que importamos do modulo validaCPF.js   */
        //se o cpf verificado for valido então o if não é executado
        //se o cpf verificado for invalido então o if é executado
        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');

        //esse comando campo.insertAdjacentElement('afterend', div);
        //significa que a mensaem de texto sera coloca apos o campo de input por exemplo,
        //se houver um campo para inserir a senha é a senha for invalida a mensagem de error aparece em baixo do campo onde voce digitou a senha
        campo.insertAdjacentElement('afterend', div);
    }
}








let valida = new ValidaFormulario(); //instancia da class validaFormulario

