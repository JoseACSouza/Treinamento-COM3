function deleteItem(url, idDoItem){
  if(confirm('Deseja realmente excluir esse item?')){
    $.ajax({
      url: url,
      method: 'DELETE',
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
      data: {
        id: idDoItem,
      },
      beforeSend: function () {
        $.blockUI({
          message: 'Carregando...',
          timeout: 2000,
        });
      },
    }).done(function (data){
      $.unblockUI();
      if (data.success == true) {
        window.location.reload();
      } else {
        alert('Não foi possível deletar, tente novamente!');
      }
    }).fail(function (data){
      $.unblockUI();
      alert('Algo deu errado, tente novamente!');
    })
  }
}
