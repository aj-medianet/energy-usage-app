function updateDevice(id) {
  var confirmUpdate = confirm("Are you sure you want to edit this Device?");
  if(confirmUpdate){
      $.ajax({
          url: '/devices/'+ id,
          type: 'PUT',
          data: $('#update-device').serialize(),
          success: (result) => {
              console.log("hello");
          },
          error : () => {
            alert("Opps! This device has been existed, please input a different name.");
          }
      }).done(() => {
        window.location.replace("./");
      });
  }
};