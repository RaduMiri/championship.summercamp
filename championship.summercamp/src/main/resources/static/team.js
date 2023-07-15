$(document).ready(function() {
    getTeamData();
    getPlayerData();
});

function getTeamData(){
    $.ajax({
        url : 'http://localhost:8080/team/all',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}

function getPlayerData(){ //TODO:Only import players that are not captains
    $.ajax({
        url : 'http://localhost:8080/player/all',
        type : 'GET',
        dataType:'json',
        success : function(playerData) {
             makeForm($("#formDiv"), playerData);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}

function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-bordered table-striped').attr('id', 'teamTable');
    var row = $("<tr/>");
    row.append("<td>" + "ID" + "</td>");
    row.append("<td>" + "Name" + "</td>");
    row.append("<td>" + "Captain" + "</td>");
    row.append("<td>" + "Colour" + "</td>");
    table.append(row);
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        row.append("<td>" + r.id + "</td>");
        if(r.name!=null)
        row.append("<td>" + r.name + "</td>");
        else
        row.append("<td>" + "</td>");
        if(r.captain?.firstName!=null)
        row.append("<td>" + r.captain?.firstName + "</td>");
        else
        row.append("<td>" + "</td>");
        if(r.colour!=null)
        row.append("<td>" + r.colour + "</td>");
        else
        row.append("<td>" + "</td>");
        table.append(row);
        row.append('<td><input type="button" value="Delete" onclick="deleteTeam('+r.id+')"></td>');
        table.append(row);
    });
    return container.append(table);
}

function makeForm(container, playerData){
    var form = $("<form/>");
    form.append('Name:<input type="text" name="name" id="name"/><br>');
    var select = $("<select/>");
    $.each(playerData, function(i, element){
        if(element.firstName!=null){
            var text = element.firstName;
            if(element.lastName!=null)
                 text += " "+ element.lastName;
        }
        var option = $("<option/>").text(text).attr('name', element.id);
        select.append(option).attr('id', 'captain');//TODO:Add class/container from Bootstrap
    });
    form.append("Captain:");
    form.append(select);
    form.append("<br>");
    form.append('Colour:<input type="text" name="name" id="colour"/><br>');
    form.append('<input type="submit" value="submit" id="save_data" onclick="postTeam()"/>')
    return container.append(form);
}

function postTeam(){
 var data = {name:document.getElementById('name').value,
             captain:{id:$("#captain option:selected").attr("name")}
//             colour:document.getElementById('colour').value
             };
             data.colour=document.getElementById('colour').value;
    $.ajax({
            url : 'http://localhost:8080/team/createTeam',
            type : 'POST',
            data : JSON.stringify(data),
            contentType: "application/json",
            success : function(data) {
                    console.log("Post success");
            },
            error : function(request,error)
            {
                return [];
                alert("Request: "+JSON.stringify(request));
            }
        });
}

function deleteTeam(id){
    var deleteUrl = "http://localhost:8080/team/delete/" + id;
    $.ajax({
                url : deleteUrl,
                type : 'DELETE',
                success : function(data) {
                     console.log("Delete success");
                },
                error : function(request,error)
                {
                    return [];
                    alert("Request: "+JSON.stringify(request));
                }
            });
}