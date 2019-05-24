//deletes a ski area
function deleteSkiArea(id){
    console.log('in delete function id=' + id);
    $.ajax({
        url: '/ski-areas/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}

//deletes an ski_areas_events relationship
function deleteSkiAreasEvents(said,eid){
    $.ajax({
        url: '/ski-areas-events/' + said + '/' + eid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}

//updates an events type
function updateEvent(id){
    $.ajax({
        url: '/events/' + id,
        type: 'PUT',
        data: $('#update-event').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}

//updates a ski area
function updateSkiArea(id){
    $.ajax({
        url: '/ski-areas/' + id,
        type: 'PUT',
        data: $('#update-ski-area').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}

//selects state for drop downs
function selectState(id){
    $("#state-selector").val(id);
}

//gets forecast with the id from forecast page
function getForecast(id) {
    $.ajax({
        url: '/forecast/' + id,
        type: 'get',
        success: function(result){
            window.location.href = "/forecast/";
        }
    })
}


