//URL_BASE = "http://0.0.0.0:8010/js/";
//URL_BASE = "http://127.0.0.1:8010/js/";
//URL_BASE = "http://127.0.0.1:8000/js/";
URL_BASE = "http://menuweb.com.br/js/";
// URL_BASE = "https://serene-atoll-63219.herokuapp.com/js/"

function getTokens(){
    var tokens = [];            // new array to hold result
    var query = location.search; // everything from the '?' onward
    query = query.slice(1);     // remove the first character, which will be the '?'
    query = query.split('&');   // split via each '&', leaving us an array of something=something strings

    // iterate through each something=something string
    $.each(query, function(i,value){

        // split the something=something string via '=', creating an array containing the token name and data
        var token = value.split('=');

        // assign the first array element (the token name) to the 'key' variable
        var key = decodeURIComponent(token[0]);

        // assign the second array element (the token data) to the 'data' variable
        var data = decodeURIComponent(token[1]);

        tokens[key] = data;     // add an associative key/data pair to our result array, with key names being the URI token names
    });

    return tokens;  // return the array
}

TOKENS = getTokens();


game7App.factory("Carrinho", function (Ajax,$http) {
    var obj = {
        lista_compra: [],
        qtd_atual:1,
        retorno : false,
        val_total:0.0,
        var_total_geral:0.0,
        frete:0.0
    };


    obj.get_carrinhos = function () {
        var url = URL_BASE + "carrinhos";
        var params = {
            cliente_id:window.localStorage.getItem("c_logado")
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {

            obj.lista_compra = response.data.lista_compra;
            obj.frete = response.data.frete;

            if(obj.lista_compra.length > 0){
                obj.var_total_geral = response.data.total_compra + obj.frete;



            }
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.save_carrinho = function (produto_id, quantidade, observacao, valor) {
        var url = URL_BASE + "savecarrinho";

        var f = new FormData();
        f.append('produto_id', produto_id);
        f.append('quantidade', quantidade);
        f.append('observacao', observacao);
        f.append('valor', valor);
        f.append('cliente_id', window.localStorage.getItem("c_logado"));
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            if(response == true){
                obj.retorno = response;
            }
            else{
                alert('Por favor, antes de realizar um novo pedido em outro restaurante é necessário a conclusão do primeiro.');
            }
            window.location = "carrinho.html";
          }
        )

    };
    obj.excluir_carrinho = function (car_id) {
        var url = URL_BASE + "excluircarrinho";
        var params = {
          id:car_id
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
            window.location = "carrinho.html";
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    return obj;
});


game7App.factory("Estado", function (Ajax,$http) {
    var obj = {
        lista_estados: [],
        retorno : false,
        estado_selecionado:[]
    };
    obj.get_estados= function () {
        var url = URL_BASE + "estados";
        var params = {
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_estados= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.get_estados_by_nome= function (nome) {
        var url = URL_BASE + "estados";
        var params = {
            nome:nome
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.estado_selecionado= response.data[0];
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    return obj;
});

game7App.factory("Cidade", function (Ajax,$http) {
    var obj = {
        lista_cidades: [],
        retorno : false,
        cidade_selecionado :[]
    };
    obj.get_cidades= function (estado_id) {
        var url = URL_BASE + "cidades";
        var params = {
            estado_id:estado_id,
            id:TOKENS["cid_id"]
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_cidades= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.get_cidades_by_nome= function (nome) {
        var url = URL_BASE + "cidades";
        var params = {
            nome:nome
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.cidade_selecionado=response.data[0];
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    return obj;
});

game7App.factory("Bairro", function (Ajax,$http) {
    var obj = {
        lista_bairros: [],
        retorno : false,
        bairro_selecionado: []
    };
    obj.get_bairros= function (cidade_id) {
        var url = URL_BASE + "bairros";
        var params = {
            cidade_id:cidade_id,
            id:TOKENS["bai_id"]
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_bairros= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    obj.get_bairros_by_nome= function (nome) {
        var url = URL_BASE + "bairros";
        var params = {
            nome:nome
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.bairro_selecionado= response.data[0];
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    return obj;
});

game7App.factory("Categoria", function (Ajax,$http) {
    var obj = {
        lista_categorias: [],
        lista_subcategorias:[],
        categoriaselecionado: [],
        retorno : false,
    };
    obj.get_categorias = function (nome_categoria) {
        var url = URL_BASE + "categorias";
        var params = {
            nome:nome_categoria
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_categorias = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.get_categoria = function () {
        //Get relação de categorias
        var url = URL_BASE + "categorias";
        var params = {
          id:TOKENS['c_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.categoriaselecionado = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });

        //Get da lista de subcategorias
        var url = URL_BASE + "subcategorias";
        var params = {
          categoria:TOKENS['c_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_subcategorias = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_categoria = function (categoria_nome) {
        var url = URL_BASE + "savecategoria";

        var f = new FormData();
        f.append('id', TOKENS['c_id']);
        f.append('nome', categoria_nome);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_categoria = function () {
        var url = URL_BASE + "excluircategoria";
        var params = {
          id:TOKENS['c_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});

game7App.factory("SubCategoria", function (Ajax,$http) {
    var obj = {
        lista_subcategorias: [],
        subcategoriaselecionado: [],
        retorno : false,
        sel_categoria:null,
        sel_subcategorias:null
    };
    obj.get_subcategorias = function (nome_subcategoria, categoria_id) {

        if ((categoria_id == undefined) || (categoria_id == 0) || (categoria_id == null))
        {
            categoria_id=TOKENS["c_id"];
        }

        var url = URL_BASE + "subcategorias";
        var params = {
            categoria:categoria_id,
            nome:nome_subcategoria,
            id:TOKENS["subc_id"]
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_subcategorias = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.get_subcategoria = function () {
        //Get relação de subcategorias
        var url = URL_BASE + "subcategorias";
        var params = {
          id:TOKENS['subc_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.subcategoriaselecionado = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_subcategoria = function (subcategoria_nome) {
        var url = URL_BASE + "savesubcategoria";

        var f = new FormData();
        f.append('id', TOKENS['subc_id']);
        f.append('categoria', TOKENS['c_id']);
        f.append('nome', subcategoria_nome);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_subcategoria = function () {
        var url = URL_BASE + "excluirsubcategoria";
        var params = {
          id:TOKENS['subc_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});

game7App.factory("Cliente", function (Ajax,$http) {
    var obj = {
        lista_clientes: [],
        clienteselecionado: [],
        retorno : false,
        clientelogado :[],
        caminho_foto: 'http://menuweb.com.br/static/media/cliente/'
    };
    obj.get_clientes = function (nome_cliente, email_cliente) {
        var url = URL_BASE + "clientes";
        var params = {
            nome:nome_cliente,
            email:email_cliente,
            id:TOKENS["c_id"]
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_clientes= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.logar_cliente = function (email_cliente,senha_cliente) {
        var url = URL_BASE + "cliente-login";

        var f = new FormData();
        f.append('email', email_cliente);
        f.append('senha', senha_cliente);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            if(response.length > 0){
                obj.clientelogado = response;

                window.localStorage.setItem("c_logado", response[0].id);
                window.location = "home.html";
            }
            else{
                alert("Usuário ou senha incorretos");
            }
          }
        )
    };
    obj.sair_cliente = function () {
        window.localStorage.removeItem("c_logado");
        window.location = "index.html";

    };
    obj.logarfacebook = function (nome,f_id) {
        var url = URL_BASE + "cliente-face-login";

        var f = new FormData();
        f.append('nome', nome);
        f.append('face_id', f_id);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            if(response.length > 0){
                obj.clientelogado = response;

                window.localStorage.setItem("c_logado", response[0].id);
                if(response[0].bairro_id > 0){
                    window.location = "home.html";
                }
                else{
                    window.location = "profile.html";
                }

            }
            else{
                alert("Usuário ou senha incorretos");
            }
          }
        )
    };
    obj.esqueceusenha = function (email_cliente) {
        var url = URL_BASE + "esqueceusenha_cliente";
        var params = {
            email:email_cliente
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno= response.data;
            alert("Email de recuperação foi enviado, por favor verifique sua caixa de entrada.");
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.get_cliente = function () {
        //Get relação de clientes
        var url = URL_BASE + "clientes";
        var params = {
          id:window.localStorage.getItem("c_logado")
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.clienteselecionado = response.data;

        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_cliente = function (cliente_nome, cliente_email, cliente_senha, cliente_telefone, cliente_estado, cliente_cidade, cliente_bairro, cliente_endereco, cliente_numero, cliente_complemento, cliente_cep) {
        var url = URL_BASE + "savecliente";

        var f = new FormData();
        f.append('id', window.localStorage.getItem("c_logado"));
        f.append('nome', cliente_nome);
        f.append('email', cliente_email);
        f.append('senha', cliente_senha);
        f.append('telefone', cliente_telefone);
        f.append('estado', cliente_estado);
        f.append('cidade', cliente_cidade);
        f.append('bairro', cliente_bairro);
        f.append('endereco', cliente_endereco);
        f.append('numero', cliente_numero);
        f.append('complemento', cliente_complemento);
        f.append('cep', cliente_cep);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_cliente= function () {
        var url = URL_BASE + "excluircliente";
        var params = {
          id:TOKENS['c_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});

game7App.factory("Empresa", function (Ajax,$http) {
    var obj = {
        lista_empresas: [],
        empresaselecionado: [],
        empresapedido: [],
        retorno : false,
        var_tipocozinha_id:0,
        caminho_foto: 'http://menuweb.com.br/game7api/static/media/empresa/'
    };

    obj.set_tipocozinha = function (tipocozinha_id){
        obj.var_tipocozinha_id=tipocozinha_id;
    }

    obj.get_empresas = function (nome_empresa, c_id) {
        var url = URL_BASE + "getrestaurantes";
        var params = {
            id:c_id,
            texto:nome_empresa,
            tipocozinha_id:obj.var_tipocozinha_id,
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_empresas= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.get_empresa = function () {
        //Get relação de clientes
        var url = URL_BASE + "empresas";
        var params = {
          id:TOKENS['e_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.empresaselecionado = response.data[0];
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };


    obj.get_empresabypedido = function () {
        //Get relação de clientes
        var url = URL_BASE + "getrestaurantebypedido";
        var params = {
          pedido_id:window.localStorage.getItem("pedido_id")
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            console.log(response.data);
            obj.empresapedido = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.save_empresa = function (empresa_nome, empresa_email, empresa_senha, empresa_telefone, empresa_estado, empresa_cidade, empresa_bairro, empresa_endereco, empresa_descricao) {
        var url = URL_BASE + "saveempresa";

        var f = new FormData();
        f.append('id', TOKENS['e_id']);
        f.append('nome', empresa_nome);
        f.append('email', empresa_email);
        f.append('senha', empresa_senha);
        f.append('telefone', empresa_telefone);
        f.append('estado', empresa_estado);
        f.append('cidade', empresa_cidade);
        f.append('bairro', empresa_bairro);
        f.append('endereco', empresa_endereco);
        f.append('descricao', empresa_descricao);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )
    };
    obj.excluir_empresa= function () {
        var url = URL_BASE + "excluirempresa";
        var params = {
          id:TOKENS['e_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});

game7App.factory("Atendimento", function (Ajax,$http) {
    var obj = {
        retorno : false,
    };
    obj.save_atendimento = function (empresa_bairro) {
        var url = URL_BASE + "saveempresabairro";

        var f = new FormData();
        f.append('id', TOKENS['e_id']);
        f.append('bairro', empresa_bairro);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )
    };
    obj.excluir_atendimento= function () {
        var url = URL_BASE + "excluirempresa_bairro";
        var params = {
          empresa_id:TOKENS['e_id'],
          bairro_id:TOKENS['b_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});

game7App.factory("Funcionario", function (Ajax,$http) {
    var obj = {
        lista_funcionarios: [],
        funcionarioselecionado: [],
        retorno : false,
    };
    obj.get_funcionarios = function (nome_funcionario, email_funcionario) {
        var url = URL_BASE + "funcionarios";
        var params = {
            nome:nome_funcionario,
            email:email_funcionario
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_funcionarios= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.get_funcionario = function () {
        //Get relação de funcionarios
        var url = URL_BASE + "funcionarios";
        var params = {
          funcionario_id:TOKENS['f_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.funcionarioselecionado = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_funcionario = function (funcionario_nome, funcionario_email, funcionario_senha, funcionario_telefone, funcionario_endereco) {
        var url = URL_BASE + "savefuncionario";

        var f = new FormData();
        f.append('id', TOKENS['f_id']);
        f.append('nome', funcionario_nome);
        f.append('email', funcionario_email);
        f.append('senha', funcionario_senha);
        f.append('telefone', funcionario_telefone);
        f.append('endereco', funcionario_endereco);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_funcionario= function () {
        var url = URL_BASE + "excluirfuncionario";
        var params = {
          id:TOKENS['f_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});

game7App.factory("Produto", function (Ajax,$http) {
    var obj = {
        lista_produtos: [],
        produtoselecionado: [],
        retorno : false,
        caminho_foto: 'http://menuweb.com.br/game7api/static/media/produto/',
        foto_principal:123
    };
    obj.get_produtos= function (nome_produto) {
//        var url = URL_BASE + "produtos";
        var url = URL_BASE + "cardapio";
        var params = {
            empresa_id:TOKENS["e_id"],
            nome:nome_produto
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_produtos= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.get_produto = function () {
        //Get relação de produtos
        var url = URL_BASE + "produtos";
        var params = {
          id:TOKENS['p_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.produtoselecionado = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_produto = function (produto_nome, produto_preco, produto_descricao, empresa) {
        var url = URL_BASE + "saveproduto";

        var f = new FormData();
        f.append('id', TOKENS['p_id']);
        f.append('nome', produto_nome);
        f.append('preco', produto_preco);
        f.append('descricao', produto_descricao);
        f.append('foto', obj.foto_principal);
        f.append('empresa_id', empresa);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_produto= function () {
        var url = URL_BASE + "excluirproduto";
        var params = {
          id:TOKENS['p_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_produtocategoria = function (subcategoria_id) {
        var url = URL_BASE + "saveprodutosubcategoria";

        var f = new FormData();
        f.append('id', TOKENS['p_id']);
        f.append('subcategoria_id', subcategoria_id);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_produtocategoria= function () {
        var url = URL_BASE + "excluirprodutosubcategoria";
        var params = {
          p_id:TOKENS['p_id'],
          subc_id:TOKENS['subc_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_produtofoto = function (subcategoria_id) {
        var url = URL_BASE + "saveprodutofoto";

        var f = new FormData();
        f.append('id', TOKENS['p_id']);
        f.append('foto', obj.foto_principal);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response;
          }
        )

    };
    obj.excluir_produtofoto= function (foto_id) {
        var url = URL_BASE + "excluirproduto_foto";
        var params = {
          id:TOKENS['p_id'],
          f_id:foto_id
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});


game7App.factory("Pedido", function (Ajax,$http) {
    var obj = {
        lista_pedidos: [],
        lista_pedidos_concluidos: [],
        pedidoselecionado: [],
        retorno : false,
        na_entrega_tipo:TOKENS['t']
    };
    obj.get_pedidos= function (data_pedido) {
        var url = URL_BASE + "pedidos";
        var params = {
            cliente_id:window.localStorage.getItem("c_logado"),
            data:data_pedido
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_pedidos= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.get_pedidos_concluidos= function (data_pedido) {
        var url = URL_BASE + "pedidos";
        var params = {
            cliente_id:window.localStorage.getItem("c_logado"),
            status:'Concluido'
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.lista_pedidos_concluidos= response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.get_pedido = function () {
        //Get relação de pedidos
        var url = URL_BASE + "pedidos";
        var params = {
          id:TOKENS['p_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.pedidoselecionado = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };
    obj.save_pedido = function (pedido_endereco, pedido_cidade, pedido_bairro, pedido_complemento) {
        var url = URL_BASE + "savepedido";
        var f = new FormData();
        f.append('id', TOKENS['p_id']);
        f.append('cliente_id', window.localStorage.getItem("c_logado"));
        f.append('endereco', pedido_endereco);
        f.append('cidade_id', pedido_cidade);
        f.append('bairro_id', pedido_bairro);
        f.append('complemento', complemento);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            window.localStorage.setItem("pedido_id", response);
            window.location = "pedido-tipo-pagamento.html";
          }
        )
    };

    obj.save_avaliacao = function (nota, pedido_id,mensagem) {
        var url = URL_BASE + "saveavaliacao";
        var f = new FormData();
        f.append('nota', nota);
        f.append('pedido_id', pedido_id);
        f.append('mensagem', mensagem);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            alert("Avaliação enviada!");
            window.location = "home.html";
          }
        )
    };


    obj.save_tipo_pagamento = function (tipo_pagamento) {
        var url = URL_BASE + "savetipopagamentopedido";
        var f = new FormData();
        f.append('id', window.localStorage.getItem("pedido_id"));
        f.append('tipopagamento', tipo_pagamento);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response.data;
            if(tipo_pagamento == 'na_entrega_dinheiro'){
                window.location = "pedido-pagamento-naentrega.html?p_id="+window.localStorage.getItem("pedido_id")+"&t=dinheiro";
            }
            else if(tipo_pagamento == 'na_entrega_cartao'){
                window.location = "pedido-pagamento-naentrega.html?p_id="+window.localStorage.getItem("pedido_id")+"&t=cartao";
            }
            else if(tipo_pagamento == 'mercado_pago'){
                window.location = "pedido-pagamento.html?p_id="+window.localStorage.getItem("pedido_id");
            }
            else{
                window.location = "pedido-integra.html?p_id="+window.localStorage.getItem("pedido_id");
            }

          }
        )
    };

    obj.save_pagamento_obs = function (troco,outro,cpfnanota,bandeira,cpf) {
        var url = URL_BASE + "saveobspagamentopedido";
        var f = new FormData();

        if (troco > 0){
            if(troco <= obj.pedidoselecionado[0].total){
                alert("O valor de troco deve ser maior que o total do pedido");
                return
            }
        }
        f.append('id', window.localStorage.getItem("pedido_id"));
        f.append('troco', troco);
        f.append('outro', outro);
        f.append('cpfnanota', cpfnanota);
        f.append('bandeira', bandeira);
        f.append('tipo', TOKENS['t']);
        f.append('cpf', cpf);
        $http.post(url, f, {headers: {'Content-Type': undefined}}).success(
          function(response){
            obj.retorno = response.data;
            window.location = "pedido-integra.html?p_id="+window.localStorage.getItem("pedido_id");
          }
        )
    };

    obj.excluir_pedido= function () {
        var url = URL_BASE + "excluirpedido";
        var params = {
          id:TOKENS['p_id']
        }
        $http({
            method: "GET",
            params: params,
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
            obj.retorno = response.data;
        }, function errorCallback(response) {
            console.log("Erro");
        });
    };

    obj.verifica_login = function () {
      //  var logado = $cookies.getObject("logado");
       var logado = window.localStorage.getItem("c_logado");
       var url = window.location.pathname;

       if(logado != undefined){
         obj.logado = logado;
//         window.location = "home.html";
       }
       else if (!(url.indexOf("index.html") > -1)) {
         window.location = "index.html";
       }
    };
    return obj;
});
