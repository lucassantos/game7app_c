game7App.controller('categoriaCtrl', function($scope, Categoria) {
    $scope.ct = Categoria;
    $scope.ct.get_categorias();
    $scope.ct.get_categoria();
    $scope.filtrar = function(){
        $scope.ct.get_categorias(document.getElementById("ipFiltroCategoria").value);
    }
    $scope.atualizar = function(){
        $scope.ct.save_categoria(document.getElementById("nome").value);
    }
    $scope.excluir = function(){
      $scope.ct.excluir_categoria();
    }
});

game7App.controller('subcategoriaCtrl', function($scope, SubCategoria, Categoria) {
    $scope.sc = SubCategoria;
    $scope.ct = Categoria;
    $scope.ct.get_categoria();
    $scope.sc.get_subcategorias();
    $scope.sc.get_subcategoria();
    $scope.filtrar = function(){
        $scope.sc.get_subcategorias(document.getElementById("ipFiltroSubCategoria").value);
    }
    $scope.atualizar = function(){
        $scope.sc.save_subcategoria(document.getElementById("nome").value);
    }
    $scope.excluir = function(){
      $scope.sc.excluir_subcategoria();
    }
});

game7App.controller('clienteCtrl', function($scope, $http, Cliente, Estado, Cidade, Bairro) {
    enderecocep = [];

    $scope.et = Estado;
    $scope.et.get_estados();

    $scope.cd = Cidade;

    $scope.br = Bairro;

    $scope.cl = Cliente;
    $scope.cl.get_cliente();
//    $scope.cl.get_clientes();
    $scope.filtrar = function(){
        $scope.cl.get_clientes(document.getElementById("ipFiltroNome").value,document.getElementById("ipFiltroEmail").value);
    }
    $scope.atualizar = function(){
        $scope.cl.save_cliente(
            document.getElementById("nome").value,
            document.getElementById("email").value,
            document.getElementById("senha").value,
            document.getElementById("telefone").value,
            document.getElementById("estado").value,
            document.getElementById("cidade").value,
            document.getElementById("bairro").value,
            document.getElementById("endereco").value,
            document.getElementById("numero").value,
            document.getElementById("complemento").value,
            document.getElementById("cep").value
            );
//        window.location = "index.html";
    }
    $scope.excluir = function(){
      $scope.cl.excluir_cliente();
    }
    $scope.getcidades = function(){
        $scope.cd.get_cidades(document.getElementById("estado").value);
    }
    $scope.getbairros = function(){
        $scope.br.get_bairros(document.getElementById("cidade").value);
    }
    $scope.logar = function(){
        $scope.cl.logar_cliente(document.getElementById("ipEmail").value,document.getElementById("ipSenha").value);
    }
    $scope.sair = function(){
        $scope.cl.sair_cliente();
    }
    $scope.getcep = function(){
        cep = $("#cep").val();
        //Get relação de clientes
        var url = "http://viacep.com.br/ws/"+ cep + "/json/";
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
            enderecocep = response.data;

            //Endereco
            $("#endereco").val(enderecocep.logradouro);

            //Estado
            $scope.et.get_estados();
            if(enderecocep.uf = "SP"){
                $("#estado").val("1");
            }

            //Cidade
            $scope.cd.get_cidades($("#estado").val());
            $scope.cd.get_cidades_by_nome(enderecocep.cidade);

            //Bairro
            $scope.br.get_bairros($scope.cd.cidade_selecionado.id);
            $scope.br.get_bairros_by_nome(enderecocep.bairro);




        }, function errorCallback(response) {
            console.log("Erro");
        });
    }
});

game7App.controller('empresaCtrl', function($scope, Empresa, Estado, Cidade, Bairro, Atendimento, Produto, Pedido, Cliente) {
    $scope.et = Estado;
    $scope.cd = Cidade;
    $scope.br = Bairro;
    $scope.em = Empresa;
    $scope.at = Atendimento;
    $scope.pt = Produto;
    $scope.pe = Pedido;
    $scope.cl = Cliente;

    $scope.cl.get_cliente();
    $scope.et.get_estados();
    $scope.em.get_empresa();
    $scope.pt.get_produtos();
    $scope.pe.get_pedidos_concluidos();

    if(document.getElementById('iFiltro')){
        $scope.em.get_empresas(document.getElementById('iFiltro').value,window.localStorage.getItem("c_logado"));
    }

    $scope.set_avaliacao_pedido = function(nota, pedido_id){
        $scope.pe.save_avaliacao(nota,pedido_id,$('#ipMensagem'+pedido_id).val());
    }

    $scope.filtrar = function(){
        $scope.em.get_empresas(document.getElementById('iFiltro').value,window.localStorage.getItem("c_logado"));
    }

    $scope.set_tipocozinha = function(nTipoCozinha){
        $scope.em.set_tipocozinha(nTipoCozinha);

        $scope.filtrar();
    }

    $scope.atualizar = function(){
        $scope.em.save_empresa(
            document.getElementById("nome").value,
            document.getElementById("email").value,
            document.getElementById("senha").value,
            document.getElementById("telefone").value,
            document.getElementById("estado").value,
            document.getElementById("cidade").value,
            document.getElementById("bairro").value,
            document.getElementById("endereco").value,
            document.getElementById("descricao").value);
    }
    $scope.excluir = function(){
      $scope.em.excluir_empresa();
    }
    $scope.getcidades = function(){
        $scope.cd.get_cidades(document.getElementById("estado").value);
    }
    $scope.getbairros = function(){
        $scope.br.get_bairros(document.getElementById("cidade").value);
    }
    $scope.atualizar_atendimento = function(){
        $scope.at.save_atendimento(
            document.getElementById("bairro").value);
    }
    $scope.excluir_atendimento = function(){
        $scope.at.excluir_atendimento();
    }
});

game7App.controller('funcionarioCtrl', function($scope, Funcionario) {
    $scope.fn = Funcionario;
    $scope.fn.get_funcionarios();
    $scope.fn.get_funcionario();

    $scope.filtrar = function(){
        $scope.fn.get_funcionarios(document.getElementById("ipFiltroNome").value,document.getElementById("ipFiltroEmail").value);
    }
    $scope.atualizar = function(){
        $scope.fn.save_funcionario(
            document.getElementById("nome").value,
            document.getElementById("email").value,
            document.getElementById("senha").value,
            document.getElementById("telefone").value,
            document.getElementById("endereco").value);
    }
    $scope.excluir = function(){
      $scope.fn.excluir_funcionario();
    }
});

game7App.controller('produtoCtrl', function($scope, Produto, Empresa, Categoria, SubCategoria) {
    $scope.em = Empresa;
    $scope.em.get_empresas();
    $scope.pt = Produto;
    $scope.pt.get_produtos();
    $scope.pt.get_produto();

    $scope.ct = Categoria;
    $scope.ct.get_categorias();

    $scope.sc = SubCategoria;

    $scope.filtrar = function(){
        $scope.pt.get_produtos(document.getElementById("ipFiltroNome").value);
    }
    $scope.atualizar = function(){
        $scope.pt.save_produto(
            document.getElementById("nome").value,
            document.getElementById("preco").value,
            document.getElementById("descricao").value,
            document.getElementById("empresa").value);
    }
    $scope.excluir = function(){
      $scope.pt.excluir_produto();
    }
    $scope.getsubs= function(){
        $scope.sc.get_subcategorias("",$scope.sc.sel_categoria.pk);
    }
    $scope.atualizar_produtocategoria = function(){
        $scope.pt.save_produtocategoria($scope.sc.sel_subcategorias.pk);
    }
    $scope.excluir_produtocategoria = function(){
        $scope.pt.excluir_produtocategoria();
    }
    $scope.atualizar_produtofoto = function(){
        $scope.pt.save_produtofoto();
        $scope.pt.get_produto();
        location.reload();
    }
    $scope.excluir_produtofoto = function(foto_id){
        $scope.pt.excluir_produtofoto(foto_id);
        location.reload();
    }
});

game7App.controller('pedidoCtrl', function($scope, Pedido, Cliente, Estado, Cidade, Bairro, Empresa) {
    $scope.pe = Pedido;
    $scope.pe.get_pedidos();
    $scope.pe.get_pedido();

    $scope.cl = Cliente;
    $scope.cl.get_cliente();

    $scope.et = Estado;
    $scope.et.get_estados();

    $scope.cd = Cidade;
    $scope.br = Bairro;
    $scope.em = Empresa;
    $scope.em.get_empresabypedido();


    $scope.filtrar = function(){
        $scope.pe.get_pedidos(document.getElementById("ipFiltrodata").value);
    }
    $scope.atualizar = function(){
        $scope.pe.save_pedido(
            document.getElementById("endereco").value,
            document.getElementById("cidade").value,
            document.getElementById("bairro").value,
            document.getElementById("complemento").value);


    }
    $scope.atualizar_tipo_pagamento = function(){
        $scope.pe.save_tipo_pagamento(
                $('input[name="rd_pagamento_tipo"]:checked').val()
            );
    }
    $scope.atualizar_pagamento = function(){
            $scope.pe.save_pagamento_obs(
                $('#troco_para').val(),
                $('#outro_cartao').val(),
                $('input[name="cpf_nota"]:checked').val(),
                $('#selbandeira').val(),
                $('#docNumber').val()
            );
    }
    $scope.excluir = function(){
      $scope.pt.excluir_produto();
    }
    $scope.getsubs= function(){
        $scope.sc.get_subcategorias("",$scope.sc.sel_categoria.pk);
    }
    $scope.getcidades = function(){
        $scope.cd.get_cidades(document.getElementById("estado").value);
    }
    $scope.getbairros = function(){
        $scope.br.get_bairros(document.getElementById("cidade").value);
    }

    $scope.pagarmercadopago = function(request){
        $scope.list = [];

        console.log(request);

        if ($scope.text) {
            $scope.list.push(this.text);
            $scope.text = '';

            alert($scope.list);
        }
        //http://127.0.0.1:8010/js/efetuar-pagamento

    }
});

game7App.controller('loginCtrl', function($scope, Cliente) {
    $scope.cl = Cliente;
    $scope.cl.verifica_login();
    $scope.logar = function(){
        $scope.cl.logar_cliente(document.getElementById("ipEmail").value,document.getElementById("ipSenha").value);
    }
    $scope.esqueceusenha = function(){
        $scope.cl.esqueceusenha(document.getElementById("ipEmailEsqueceu").value);
    }
    $scope.logarfacebook = function(nome, f_id){
        $scope.cl.logarfacebook(nome, f_id);
    }

});

game7App.controller('carrinhoCtrl', function($scope, Produto, Carrinho) {
    $scope.pt = Produto;
    $scope.pt.get_produtos();
    $scope.pt.get_produto();

    $scope.cr = Carrinho;
    $scope.cr.get_carrinhos();

    $scope.add_opcao_quantidade = function(opcional_id, opcao_id){
        for (x = 0; x < $scope.pt.produtoselecionado[0].opcionais.length; x++){
            if($scope.pt.produtoselecionado[0].opcionais[x].opcional_id == opcional_id){
                for (y = 0; y < $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes.length; y++){
                    if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_id == opcao_id){
                        if($scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade_selecionado < $scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade){
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade ++;
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado = true;
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade_selecionado ++;
                        }
                        else{
                            alert("Você já atingiu o limite de opcionais");
                        }
                    }
                }
            }
        }
    }

    $scope.rm_opcao_quantidade = function(opcional_id, opcao_id){
        for (x = 0; x < $scope.pt.produtoselecionado[0].opcionais.length; x++){
            if($scope.pt.produtoselecionado[0].opcionais[x].opcional_id == opcional_id){
                for (y = 0; y < $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes.length; y++){
                    if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_id == opcao_id){
                        if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade > 0){
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade --;
                            if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade == 0){
                                $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado = false;
                            }
                        }
                    }
                }
            }
        }
    }


    $scope.seleciona_opcao_multiplo = function(opcional_id, opcao_id){
        for (x = 0; x < $scope.pt.produtoselecionado[0].opcionais.length; x++){
            if($scope.pt.produtoselecionado[0].opcionais[x].opcional_id == opcional_id){
                for (y = 0; y < $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes.length; y++){
                    if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_id == opcao_id){
                        opc_selecionado = "#opc_" + $scope.pt.produtoselecionado[0].opcionais[x].opcional_id + " #" + $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_id;
                        if($(opc_selecionado)[0].checked){
                            if($scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade_selecionado < $scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade){
                                $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado = true;
                                $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade = 1;
                                $scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade_selecionado ++;
                            }
                            else{
                                alert("Você já atingiu o limite de opcionais");
                                $(opc_selecionado)[0].checked = false;
                            }
                        }
                        else{
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado = false;
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade = 0;
                            $scope.pt.produtoselecionado[0].opcionais[x].opcional_quantidade_selecionado --;
                        }
                    }
                }
            }
        }
    }

    $scope.seleciona_opcao_unico = function(opcional_id, opcao_id){
        for (x = 0; x < $scope.pt.produtoselecionado[0].opcionais.length; x++){
            if($scope.pt.produtoselecionado[0].opcionais[x].opcional_id == opcional_id){
                for (y = 0; y < $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes.length; y++){
                    $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado = false;
                    $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade = 0;

                    if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_id == opcao_id){
                        $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado = true;
                        $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade = 1;
                    }
                }
            }
        }
    }

    $scope.add_quantidade = function(){
        $scope.cr.qtd_atual = $scope.cr.qtd_atual + 1;
    }

    $scope.rm_quantidade = function(){
        if($scope.cr.qtd_atual > 1){
            $scope.cr.qtd_atual = $scope.cr.qtd_atual - 1;
        }
    }

    $scope.add_lista = function(){
        $scope.cr.save_carrinho($scope.pt.produtoselecionado[0].id, $scope.cr.qtd_atual ,document.getElementById("ipObservacao").value, $scope.pt.produtoselecionado[0].preco);
    }

    $scope.rm_lista = function(car_id){
        $scope.cr.excluir_carrinho(car_id);
    }

    $scope.getOpcionalSelecionado = function(){

        texto_selecionado = "";

        for (x = 0; x < $scope.pt.produtoselecionado[0].opcionais.length; x++){
            texto_selecionado = texto_selecionado + $scope.pt.produtoselecionado[0].opcionais[x].opcional_titulo + "\n";
            for (y = 0; y < $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes.length; y++){
                if($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_selecionado){
                    texto_selecionado = texto_selecionado +  $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade + " x " + $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_titulo + "\n";
                    $scope.pt.produtoselecionado[0].preco = $scope.pt.produtoselecionado[0].preco + ($scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_quantidade * $scope.pt.produtoselecionado[0].opcionais[x].opcional_opcoes[y].opcao_valor);
                }
            }
            texto_selecionado = texto_selecionado + "\n\n";
        }

        $("#genopcionais").hide();
        $("#gencarrinho").attr("style", "display:block!important;");

        $("#ipObservacao").val(texto_selecionado);
    }
});

game7App.controller('pagamentoCtrl', function($scope, Pedido, Pagamento) {
    $scope.pe = Pedido;
    $scope.pe.get_pedido();

    $scope.pg = Pagamento;
    $scope.pg.get_pagamento();

});

game7App.controller('cadastrarCtrl', function($scope, $http, Cliente, Estado, Cidade, Bairro) {
    enderecocep = [];

    $scope.et = Estado;
    $scope.et.get_estados();

    $scope.cd = Cidade;

    $scope.br = Bairro;

    $scope.cl = Cliente;

    $scope.atualizar = function(){
        $scope.cl.save_cliente(
            document.getElementById("nome").value,
            document.getElementById("email").value,
            document.getElementById("senha").value,
            document.getElementById("telefone").value,
            document.getElementById("estado").value,
            document.getElementById("cidade").value,
            document.getElementById("bairro").value,
            document.getElementById("endereco").value,
            document.getElementById("numero").value,
            document.getElementById("complemento").value,
            document.getElementById("cep").value
            );
//        window.location = "index.html";
    }
    $scope.excluir = function(){
      $scope.cl.excluir_cliente();
    }
    $scope.getcidades = function(){
        $scope.cd.get_cidades(document.getElementById("estado").value);
    }
    $scope.getbairros = function(){
        $scope.br.get_bairros(document.getElementById("cidade").value);
    }
    $scope.getcep = function(){
        cep = $("#cep").val();
        //Get relação de clientes
        var url = "http://viacep.com.br/ws/"+ cep + "/json/";
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
            enderecocep = response.data;

            //Endereco
            $("#endereco").val(enderecocep.logradouro);

            //Estado
            $scope.et.get_estados();
            if(enderecocep.uf = "SP"){
                $("#estado").val("1");
            }

            //Cidade
            $scope.cd.get_cidades($("#estado").val());
            $scope.cd.get_cidades_by_nome(enderecocep.cidade);

            //Bairro
            $scope.br.get_bairros($scope.cd.cidade_selecionado.id);
            $scope.br.get_bairros_by_nome(enderecocep.bairro);




        }, function errorCallback(response) {
            console.log("Erro");
        });
    }
});