$(document).ready(function() {
    getTeamData();
    getPlayerData();
});
var tempPlayerData; //maybe only retain id and names, because that is the least I need
var tempTeamData //everything here is public except teamId
function getTeamData(){
    $.ajax({
        url : 'http://localhost:8080/team/all',
        type : 'GET',
        dataType:'json',
        success : function(data) {
            tempTeamData = data;
             $("#teamTable").remove();
             makeTable($("#tableDiv"), data, 1);
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
             makeTable($("#tableDiv"), data, 1);
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
function makeTable(container, data, currentPage) {
    var pageSize = 5; // Number of teams per page
    var totalPages = Math.ceil(data.length / pageSize); // Calculate total number of pages
    var table = $("<table/>").addClass('table table-bordered table-striped').attr('id', 'teamTable');

    // Calculate start and end index for current page
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var teamsToShow = data.slice(startIndex, endIndex);

    var row = $("<tr/>");
    row.append("<td>Name<a href='#' id='nameDesc' style='float:right' onclick='getTeamNameDesc()'>↓</a><a href='#' id='nameAsc' style='float:right' onclick='getTeamNameAsc()'>↑</a></td>");
    row.append("<td>Captain<a href='#' id='captainDesc' style='float:right' onclick='getTeamCaptainDesc()'>↓</a><a href='#' id='captainAsc' style='float:right' onclick='getTeamCaptainAsc()'>↑</a></td>");
    row.append("<td>Colour<a href='#' id='colourDesc' style='float:right' onclick='getTeamColourDesc()'>↓</a><a href='#' id='colourAsc' style='float:right' onclick='getTeamColourAsc()'>↑</a></td>");
    table.append(row);

    $.each(teamsToShow, function(rowIndex, r) {
      var row = $("<tr/>");
      if (r.name != null)
        row.append("<td>" + r.name + "</td>");
      else
        row.append("<td>" + "</td>"); //TODO:Message instead if empty
      if (r.captain?.firstName != null)
        row.append("<td id='" + r.captain?.id + "'>" + r.captain?.firstName + " " + r.captain?.lastName + "</td>");
      else
        row.append("<td>" + "</td>");
      if (r.colour != null)
        row.append("<td>" + r.colour + "</td>");
      else
        row.append("<td>" + "</td>");
      table.append(row);
      row.append('<td><input type="button" value="Delete" onclick="deleteTeam(' + r.id + ')"></td>');
      table.append(row);
      row.append('<td><input type="button" value="Update" onclick="updateTeam(' + r.id + ', this)"></td>');
      table.append(row);
    });

    container.empty().append(table);

    // Pagination controls
    var pagination = $('<div class="pagination"></div>');
    var prevButton = $('<a href="#" class="prev">Prev</a>');
    var nextButton = $('<a href="#" class="next">Next</a>');
    pagination.append(prevButton);

    for (var i = 1; i <= totalPages; i++) {
      var pageButton = $('<a href="#" class="page">' + i + '</a>');
      if (i === currentPage) {
        pageButton.addClass('active');
      }
      pagination.append(pageButton);
    }

    pagination.append(nextButton);
    container.append(pagination);

    prevButton.on('click', function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        makeTable(container, data, currentPage - 1); // Update table for previous page
      }
    });

    nextButton.on('click', function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        makeTable(container, data, currentPage + 1); // Update table for next page
      }
    });

    // Handle page number clicks
    $('.page').on('click', function (e) {
      e.preventDefault();
      var pageNum = parseInt($(this).text());
      makeTable(container, data, pageNum); // Update table for selected page
    });

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
    form.append('<input type="submit" value="submit" id="save_data" onclick="postTeam(event)"/>')
    return container.append(form);
}
function postTeam(event){
    event.preventDefault(); //prevents page refresh when submitting
    var name = document.getElementById('name').value;
    var flagName = validateInput("name");;
    if(!flagName) return false;
    var data = {name:name};
    var colour = document.getElementById('colour').value;
    var flagColour = validateInput("colour");;
    if(!flagColour) return false;
    data.colour=colour;
    var colour = document.getElementById('colour').value;
    if($("#captain option:selected").attr("name")!="empty"){
        data.captain={id:$("#captain option:selected").attr("name")}
    }
    if (!validateAllInputs(data)) return false;
    $.ajax({
            url : 'http://localhost:8080/team/createTeam',
            type : 'POST',
            data : JSON.stringify(data),
            contentType: "application/json",
            success : function(data) {
                    clearErrors();
                    document.getElementById('name').value = '';
                    document.getElementById('colour').value = '';
                    $("#captain").val("empty");
                    getTeamData();
                    getPlayerData; //it doesn't update the form after submitting
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
function updateTeam(id, button) {
  var row = $(button).closest('tr');
  var name = row.find('td:eq(0)').text();
  var captain = row.find('td:eq(1)').text();
  var captainId = row.find('td:eq(1)').attr('id');
  var colour = row.find('td:eq(2)').text();
  var newRow = $("<tr/>");
  newRow.append('<td><input type="text" name="newName" id="newName" value="' + name + '"/></td>');
  var select = $("<select/>");
  var option = $("<option/>").attr('name', "empty");
  select.append(option).attr('id', 'newCaptain');
  $.each(tempPlayerData, function (i, element) {
    if (element.firstName != null) {
      var text = element.firstName;
      if (element.lastName != null)
        text += " " + element.lastName;
    }
    var option = $("<option/>").text(text).attr('name', element.id).attr("id", "newCaptainName");
    select.append(option);
  });
  if (/^[a-zA-Z]+$/.test(captain)) {
    var option = $("<option/>").text(captain).attr('name', captainId).attr("id", "newCaptainName");
    select.append(option);
  }
  select.find('option[name="' + captainId + '"]').prop('selected', true);
  newRow.append(select);
  newRow.append('<td><input type="text" name="newColour" id="newColour" value="' + colour + '"/></td>');
  var cancelButton = $('<input type="button" value="Cancel"/>');
  cancelButton.on('click', function () {
    newRow.replaceWith(row);
  });
  newRow.append($('<td/>').append(cancelButton));
  var submitButton = $('<input type="button" value="Submit" id="submitUpdate"/>');
  submitButton.on('click', function () {
    var data = { name: newRow.find('#newName').val() };
    if ($("#newCaptain option:selected").attr("name") != "empty") {
      data.captain = { id: $("#newCaptain option:selected").attr("name") };
    }
    data.colour = newRow.find('#newColour').val();
    if (!validateInput("newName") || !validateInput("newColour") || !validateAllInputs(data)) {
      return false;
    }
    var updateUrl = "http://localhost:8080/team/updateTeam/" + id;
    $.ajax({
      url: updateUrl,
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (data) {
        getTeamData();
      },
      error: function (request, error) {
        return [];
        alert("Request: " + JSON.stringify(request));
      }
    });
  });
  newRow.append($('<td/>').append(submitButton));
  row.replaceWith(newRow);
}
function validateInput(myInput) {
    var input = document.getElementById(myInput);
    var inputValue = input.value;
    var isValid = inputValue.length <= 20 && inputValue.length >= 3 && /^[A-Z]/.test(inputValue);
    if (!isValid) {
        addErrors(input, "Text should be between 3 and 20 characters and should start with uppercase");
    }
    return isValid;
}

function clearErrors() {
    var errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(function(input) {
        input.classList.remove('error');
        var popup = input.parentNode.querySelector('.popup');
        if (popup) {
            popup.remove();
        }
    });
}

function validateAllInputs(data) {
    for (var i = 1; i < tempTeamData.length; i++) {
        var team = tempTeamData[i];
        var teamName = team.name;
        var teamColour = team.colour;

        if (teamName === data.name && teamColour === data.colour) {
            var nameInput = document.getElementById('name');
            var colourInput = document.getElementById('colour');
            addErrors(colourInput, 'This name and colour combination already exists.');
            return false;
        }
          var captainSelect = document.getElementById('captain');
          var selectedOption = captainSelect.options[captainSelect.selectedIndex];
          var selectedOptionName = selectedOption.getAttribute('name');
          if (selectedOptionName === 'empty') {
            addErrors(captainSelect, 'Please select a captain.');
            return false;
          }
    }
    return true;
}

function addErrors(input, errorMessage) {
    clearErrors();
    input.classList.add('error');
    var popup = document.createElement('span');
    popup.className = 'popup';
    popup.textContent = errorMessage;
    input.parentNode.insertBefore(popup, input.nextSibling);
}
