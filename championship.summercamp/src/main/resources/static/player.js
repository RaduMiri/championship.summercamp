$(document).ready(function() {
    getTeamData();
    getPlayerData();
});
var tempTeamData;
function getPlayerData(){
    $.ajax({
        url : 'http://localhost:8080/player/all',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#playerTable").remove();
             makeTable($("#tableDiv"), data);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getTeamData(){
    $.ajax({
        url : 'http://localhost:8080/team/all',
        type : 'GET',
        dataType:'json',
        success : function(teamData) {
            makeForm($("#formDiv"),teamData);
            tempTeamData = teamData;
            getPlayerData();
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
//Sort functions
 function getPlayerFirstNameAsc(){
     $.ajax({
         url : 'http://localhost:8080/player/findByOrderByFirstNameAsc',
         type : 'GET',
         dataType:'json',
         success : function(data) {
              $("#playerTable").remove();
              makeTable($("#tableDiv"), data);
         },
         error : function(request,error)
         {
             return [];
             alert("Request: "+JSON.stringify(request));
         }
     });
 }
function getPlayerFirstNameDesc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByFirstNameDesc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerLastNameAsc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByLastNameAsc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerLastNameDesc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByLastNameDesc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerAgeAsc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByAgeAsc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerAgeDesc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByAgeDesc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerNumberAsc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByNumberAsc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerNumberDesc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByNumberDesc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerTeamColourAsc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByTeamColourAsc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function getPlayerTeamColourDesc(){
  $.ajax({
      url : 'http://localhost:8080/player/findByOrderByTeamColourDesc',
      type : 'GET',
      dataType:'json',
      success : function(data) {
           $("#playerTable").remove();
           makeTable($("#tableDiv"), data);
      },
      error : function(request,error)
      {
          return [];
          alert("Request: "+JSON.stringify(request));
      }
  });
}
function postPlayer(){
    var data = {firstName:document.getElementById('firstName').value,
                lastName:document.getElementById('lastName').value,
                age:document.getElementById('age').value,
                number:document.getElementById('number').value};
    if($("#team option:selected").attr("name")!="empty")
        data.team={id:$("#team option:selected").attr("name")}
    $.ajax({
            url : 'http://localhost:8080/player/createPlayer',
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
function uppercase(s){
    news=s.replace(/\b[a-z]/g, function(s1) {
    return s1.toUpperCase();})
    return news;}
function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-bordered table-striped').attr('id', 'playerTable');
    var row = $("<tr/>");
    var array = ["firstName", "lastName", "age", "number","teamColour"];
    for(let i=0;i<array.length;i++){
        row.append("<td>"+uppercase(array[i])+"<a href='#' id='"+array[i]+"Desc' style='float:right' onclick='getPlayer"+uppercase(array[i])+"Desc()'>↓</a><a href='#' id='"+array[i]+"Asc' style='float:right' onclick='getPlayer"+uppercase(array[i])+"Asc()'>↑</a></td>");
    }
    table.append(row);
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        if(r.firstName!=null)
        row.append("<td>" + r.firstName + "</td>");
        else
        row.append("<td>" + "</td>");
        if(r.lastName!=null)
        row.append("<td>" + r.lastName + "</td>");
        else
        row.append("<td>" + "</td>");
        if(r.age!=null)
        row.append("<td>" + r.age + "</td>");
        else
        row.append("<td>" + "</td>");
        if(r.number!=null)
        row.append("<td>" + r.number + "</td>");
        else
        row.append("<td>" + "</td>");
        var text = "";
        var flagCaptain=1;
        $.each(tempTeamData,function(i, element){
        //TODO:ERROR deleteing a captain
            if(r.id==element.captain?.id){
                if(element.name!=null){
                    text +=element.colour+" "+element.name;
                    row.append("<td>" + text + "</td>");
                }
                else{
                row.append("<td>" + "</td>");}

                flagCaptain=1;
                return false;
            }
            else{flagCaptain=0;}
        });
        text="";
        if(flagCaptain==0){
            if(r.team?.name!=null){
                text +=r.team?.colour+" "+r.team?.name;
                row.append("<td>" + text + "</td>");
            }
            else
            row.append("<td>" + "</td>");
        }
        table.append(row);
        row.append('<td><input type="button" value="Delete" onclick="deletePlayer('+r.id+')"></td>');
        table.append(row);
    });
    return container.append(table);
}

function makeForm(container, teamData){
    var form = $("<form/>");
    form.append('First name:<input type="text" name="firstName" id="firstName"/><br>');
    form.append('Last name:<input type="text" name="lastName" id="lastName"/><br>');
    form.append('Age:<input type="text" name="age" id="age"/><br>');
    form.append('Number:<input type="text" name="number" id="number"/><br>');
    var select = $("<select/>");
    var option = $("<option/>").attr('name', "empty");;
    select.append(option).attr('id', 'team');
    $.each(teamData, function(i, element){
        if(element.name!=null){
            var text = element.name;
        }
        var option = $("<option/>").text(text).attr('name', element.id);
        select.append(option);//TODO:Add class/container from Bootstrap
    });
    form.append("Team:");
    form.append(select);
    form.append("<br>");
    form.append('<input type="submit" value="submit" id="save_data" onclick="postPlayer()"/>')
    return container.append(form);
}
function deletePlayer(id){
    var deleteUrl = "http://localhost:8080/player/delete/" + id;
    $.ajax({
                url : deleteUrl,
                type : 'DELETE',
                success : function(data) {
                     getPlayerData();
                },
                error : function(request,error)
                {
                    return [];
                    alert("Request: "+JSON.stringify(request));
                }
            });
}
//TODO:Make form to assign player to team
