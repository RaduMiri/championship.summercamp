$(document).ready(function() {
    getTeamData();
    getPlayerData();
});
var tempPlayerData; //maybe only retain id and names, because that is the least I need
function getTeamData(){
    $.ajax({
        url : 'http://localhost:8080/team/all',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getPlayerData(){
    $.ajax({
        url : 'http://localhost:8080/player/findByTeamCaptainIsNull',
        type : 'GET',
        dataType:'json',
        success : function(playerData) {
            tempPlayerData = playerData;
             makeForm($("#formDiv"), playerData);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
//Sort functions
function getTeamNameAsc(){
    $.ajax({
        url : 'http://localhost:8080/team/findByOrderByNameAsc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getTeamNameDesc(){
    $.ajax({
        url : 'http://localhost:8080/team/findByOrderByNameDesc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getTeamCaptainAsc(){
    $.ajax({
        url : 'http://localhost:8080/team/findByOrderByCaptainFirstNameAscCaptainLastNameAsc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getTeamCaptainDesc(){
    $.ajax({
        url : 'http://localhost:8080/team/findByOrderByCaptainFirstNameDescCaptainLastNameDesc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getTeamColourAsc(){
    $.ajax({
        url : 'http://localhost:8080/team/findByOrderByColourAsc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getTeamColourDesc(){
    $.ajax({
        url : 'http://localhost:8080/team/findByOrderByColourDesc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
//
function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-bordered table-striped').attr('id', 'teamTable');
    var row = $("<tr/>");
    row.append("<td>Name<a href='#' id='nameDesc' style='float:right' onclick='getTeamNameDesc()'>↓</a><a href='#' id='nameAsc' style='float:right' onclick='getTeamNameAsc()'>↑</a></td>");
    row.append("<td>Captain<a href='#' id='captainDesc' style='float:right' onclick='getTeamCaptainDesc()'>↓</a><a href='#' id='captainAsc' style='float:right' onclick='getTeamCaptainAsc()'>↑</a></td>");
    row.append("<td>Colour<a href='#' id='colourDesc' style='float:right' onclick='getTeamColourDesc()'>↓</a><a href='#' id='colourAsc' style='float:right' onclick='getTeamColourAsc()'>↑</a></td>");
    table.append(row);
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        if(r.name!=null)
        row.append("<td>" + r.name + "</td>");
        else
        row.append("<td>" + "</td>");//TODO:Message instead if empty
        if(r.captain?.firstName!=null)
        row.append("<td id='"+r.captain?.id+"'>" + r.captain?.firstName + " " + r.captain?.lastName + "</td>");
        else
        row.append("<td>" + "</td>");
        if(r.colour!=null)
        row.append("<td>" + r.colour + "</td>");
        else
        row.append("<td>" + "</td>");
        table.append(row);
        row.append('<td><input type="button" value="Delete" onclick="deleteTeam('+r.id+')"></td>');
        table.append(row);
        row.append('<td><input type="button" value="Update" onclick="updateTeam('+r.id+', this)"></td>');
        table.append(row);
    });
    return container.append(table);
}
function makeForm(container, playerData){
    var form = $("<form/>");
    form.append('Name:<input type="text" name="name" id="name"/><br>');
    var select = $("<select/>");
    var option = $("<option/>").attr('name', "empty");;
    select.append(option).attr('id', 'captain');
    $.each(playerData, function(i, element){
        if(element.firstName!=null){
            var text = element.firstName;
            if(element.lastName!=null)
                 text += " "+ element.lastName;
        }
        var option = $("<option/>").text(text).attr('name', element.id);
        select.append(option);//TODO:Add class/container from Bootstrap
    });
    form.append("Captain:");
    form.append(select);
    form.append("<br>");
    form.append('Colour:<input type="text" name="name" id="colour"/><br>');
    form.append('<input type="submit" value="submit" id="save_data" onclick="postTeam()"/>')
    return container.append(form);
}
function postTeam(){
    var data = {name:document.getElementById('name').value};
    if($("#captain option:selected").attr("name")!="empty"){
        data.captain={id:$("#captain option:selected").attr("name")}
    }
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
             getTeamData();
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function updateTeam(id,button){
    //check if no other update is active
    var row = $(button).closest('tr');
    var name = row.find('td:eq(0)').text();
    console.log(name);
    var captain = row.find('td:eq(1)').text();
    console.log(captain);
    var captainId = row.find('td:eq(1)').attr('id');
    console.log(captainId);
    var colour = row.find('td:eq(2)').text();
    console.log(colour);
    var newRow = $("<tr/>");
    newRow.append('<td><input type="text" name="newName" id="newName" value="'+name+'"/></td>');
    var select = $("<select/>");
    var option = $("<option/>").attr('name', "empty");;
    select.append(option).attr('id', 'newCaptain');
    $.each(tempPlayerData, function(i, element){
        if(element.firstName!=null){
            var text = element.firstName;
            if(element.lastName!=null)
                 text += " "+ element.lastName;
        }
        var option = $("<option/>").text(text).attr('name', element.id).attr("id", "newCaptainName");
        select.append(option);
    });
    if(/^[a-zA-Z]+$/.test(captain)){//checks for letters
        var option = $("<option/>").text(captain).attr('name', captainId).attr("id", "newCaptainName");
        select.append(option);
    }
    select.find('option[name="' + captainId + '"]').prop('selected', true);
    newRow.append(select);
    newRow.append('<td><input type="text" name="newColour" id="newColour" value="'+colour+'"/></td>');
    var cancelButton = $('<input type="button" value="Cancel"/>');
        cancelButton.on('click', function() {
            newRow.replaceWith(row);
        });
        newRow.append($('<td/>').append(cancelButton));
    var submitButton = $('<input type="button" value="Submit"/>');
    submitButton.on('click', function() {
        var data = {name:newRow.find('#newName').val()};
        if($("#newCaptain option:selected").attr("name")!="empty"){
            data.captain={id:$("#newCaptain option:selected").attr("name")}
        }
        data.colour=newRow.find('#newColour').val();
        var updateUrl = "http://localhost:8080/team/updateTeam/" + id;
            $.ajax({
                url : updateUrl,
                type : 'PUT',
                data : JSON.stringify(data),
                contentType: "application/json",
                success : function(data) {
                    getTeamData();
                },
                error : function(request,error)
                {
                    return [];
                    alert("Request: "+JSON.stringify(request));
                }
            });
    });
    newRow.append($('<td/>').append(submitButton));
    row.replaceWith(newRow);
}