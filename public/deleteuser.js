function deleteUser(id , e) {
  // console.log("DELETE")
  var confirmDelete = confirm("Are you sure you want to delete your account?");

  if(confirmDelete) {
    $.ajax({
      url: '/settings/' + id,
      type: 'DELETE',
      succcess: (result) => {
        /* Hack */
        alert("DELETE!");
      },
      error : () => {
        alert("Opps! The Account you chose couldn't be deleted");
      }
    }).done(() => {
      window.location.replace('/logout');
    });
  }
};