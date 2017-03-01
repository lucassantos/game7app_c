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

game7App.controller('clienteCtrl', function($scope, Cliente, Estado, Cidade, Bairro) {
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
        $scope.cl.save_cliente(document.getElementById("nome").value, document.getElementById("email").value,document.getElementById("senha").value, document.getElementById("telefone").value, document.getElementById("estado").value, document.getElementById("cidade").value,document.getElementById("bairro").value,document.getElementById("endereco").value);
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
});

game7App.controller('empresaCtrl', function($scope, Empresa, Estado, Cidade, Bairro, Atendimento) {
    $scope.et = Estado;
    $scope.cd = Cidade;
    $scope.br = Bairro;
    $scope.em = Empresa;
    $scope.at = Atendimento;

    $scope.et.get_estados();
    $scope.em.get_empresas();
    $scope.em.get_empresa();

    $scope.filtrar = function(){
        $scope.em.get_empresas(document.getElementById("ipFiltroNome").value,document.getElementById("ipFiltroEmail").value);
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

game7App.controller('pedidoCtrl', function($scope, Pedido, Empresa) {
    $scope.em = Empresa;
    $scope.em.get_empresas();

    $scope.pe = Pedido;
    $scope.pe.get_pedidos();

    $scope.filtrar = function(){
        $scope.pe.get_pedidos(document.getElementById("ipFiltrodata").value);
    }
    $scope.atualizar = function(){
        $scope.pe.save_pedido(
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
});


game7App.controller('loginCtrl', function($scope, Cliente) {
    $scope.cl = Cliente;
    $scope.logar = function(){
        $scope.cl.logar_cliente(document.getElementById("ipEmail").value,document.getElementById("ipSenha").value);
    }
});