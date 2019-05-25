function deleteDevice(id , e) {
  // console.log("DELETE")
  var confirmDelete = confirm("Are you sure you want to disconnect this Device?");

  if(confirmDelete) {
    $.ajax({
      url: '/devices/' + id,
      type: 'DELETE',
      succcess: (result) => {
        /* Hack */
        alert("DELETE!");
      },
      error : () => {
        alert("Opps! The Device you chose couldn't be disconnected");
      }
    }).done(() => {
      window.location.reload(true);
    });
  }
};