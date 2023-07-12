$(document).ready(function() {
    $.ajax({
        url: "team-form"
    }).then(function(data) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
    });
});