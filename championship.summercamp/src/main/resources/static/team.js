function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-bordered table-striped');
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
    });
    return container.append(table);
}
function appendTableColumn(table, rowData) {
  var lastRow = $('<tr/>').appendTo(table.find('tbody:last'));
  $.each(rowData, function(colIndex, c) {
      lastRow.append($('<td/>').text(c));
  });

  return lastRow;
}

$(document).ready(function() {
    getTeamData();
});

function getTableData(table) {
    var data = [];
    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('th,td').each(function (colIndex, c) {
            cols.push(c.textContent);
        });
        data.push(cols);
    });
    return data;
}

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

function postTeam(){

    $.ajax({
            url : 'http://localhost:8080/team/createTeam',
            type : 'POST',
            data : null,
            dataType:'json',
            success : function(data) {
                 alert(data);
            },
            error : function(request,error)
            {
                return [];
                alert("Request: "+JSON.stringify(request));
            }
        });
}