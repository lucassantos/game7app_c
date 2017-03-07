URL_BASE = "http://0.0.0.0:8010/js/";
//URL_BASE = "http://192.168.1.106:8010/js/";

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

game7App.factory("Estado", function (Ajax,$http) {
    var obj = {
        lista_estados: [],
        retorno : false,
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
    return obj;
});

game7App.factory("Cidade", function (Ajax,$http) {
    var obj = {
        lista_cidades: [],
        retorno : false,
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
    return obj;
});

game7App.factory("Bairro", function (Ajax,$http) {
    var obj = {
        lista_bairros: [],
        retorno : false,
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
        clientelogado :[]
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
            obj.clientelogado = response;
            window.localStorage.setItem("c_logado", response[0].id);
            window.location = "home.html";
          }
        )
    };
    obj.get_cliente = function () {
navigator.geolocation.getCurrentPosition(function(position)
{
    // just to show how to access latitute and longitude
    var location = [position.coords.latitude, position.coords.longitude];
},
function(error)
{
    // error getting GPS coordinates
    alert('code: ' + error.code + ' with message: ' + error.message + '\n');
},
{ enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 });
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
    obj.save_cliente = function (cliente_nome, cliente_email, cliente_senha, cliente_telefone, cliente_estado, cliente_cidade, cliente_bairro, cliente_endereco) {
        var url = URL_BASE + "savecliente";

        alert(cliente_cidade);
        alert(cliente_bairro);

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
//         window.location = "home.html";
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
        retorno : false,
    };
    obj.get_empresas = function (nome_empresa, c_id) {
        var url = URL_BASE + "getrestaurantes";
        var params = {
            id:c_id,
            texto:nome_empresa
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
            obj.empresaselecionado = response.data;
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
        foto_principal:123
    };
    obj.get_produtos= function (nome_produto) {
        var url = URL_BASE + "produtos";
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
        pedidoselecionado: [],
        retorno : false
    };
    obj.get_pedidos= function (data_pedido) {
        var url = URL_BASE + "pedidos";
        var params = {
            empresa_id:TOKENS["e_id"],
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
    obj.save_pedido = function (produto_nome, produto_preco, produto_descricao, empresa) {
        var url = URL_BASE + "savepedido";

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