$(document).ready(function() {
    getTeamData();
    getPlayerData();
    setupFormClose();
});

var isFormVisible = false;
var tempPlayerData;
var tempTeamData;
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
             $("#teamForm").remove();
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
             makeTable($("#tableDiv"), data,1);
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
             makeTable($("#tableDiv"), data,1);
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
             makeTable($("#tableDiv"), data,1);
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
             makeTable($("#tableDiv"), data,1);
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
             makeTable($("#tableDiv"), data,1);
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
    var pageSize = 5; //teams per page
    var totalPages = Math.ceil(data.length / pageSize);
    var table = $("<table/>").addClass('table table-bordered table-striped').attr('id', 'teamTable');

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var teamsToShow = data.slice(startIndex, endIndex);

    var row = $("<tr/>");
    row.append("<th>Name<a href='#' id='nameDesc' style='float:right' onclick='getTeamNameDesc()'>↓</a><a href='#' id='nameAsc' style='float:right' onclick='getTeamNameAsc()'>↑</a></th>");
    row.append("<th>Captain<a href='#' id='captainDesc' style='float:right' onclick='getTeamCaptainDesc()'>↓</a><a href='#' id='captainAsc' style='float:right' onclick='getTeamCaptainAsc()'>↑</a></th>");
    row.append("<th>Colour<a href='#' id='colourDesc' style='float:right' onclick='getTeamColourDesc()'>↓</a><a href='#' id='colourAsc' style='float:right' onclick='getTeamColourAsc()'>↑</a></th>");
    row.append("<th>Actions</th>");
    table.append(row);
    $.each(teamsToShow, function (rowIndex, r) {
      var row = $("<tr/>");
      if (r.name != null) row.append("<td class='table-cell'>" + r.name + "</td>");
      else row.append("<td class='table-cell'>" + "</td>");
      if (r.captain?.firstName != null) row.append("<td class='table-cell' id='" + r.captain?.id + "'>" + r.captain?.firstName + " " + r.captain?.lastName + "</td>");
      else row.append("<td class='table-cell'>" + "</td>");
      if (r.colour != null) row.append("<td class='table-cell'>" + r.colour + "</td>");
      else row.append("<td class='table-cell'>" + "</td>");
      var deleteButton = $('<input type="button" value="Delete" class="btn-danger">');
      deleteButton.on('click', function () {
        deleteTeam(r.id, this); // Pass the button element (this) to deleteTeam function
      });
      var updateButton = $('<input type="button" value="Update" class="btn-info">');
      updateButton.on('click', function () {
        updateTeam(r.id, this); // Pass the button element (this) to updateTeam function
      });
      var actionsCell = $("<td/>").append(deleteButton, updateButton).addClass('table-cell');
      row.append(actionsCell);
      table.append(row);
    });
    container.empty().append(table);

    var pagination = $('.pagination'); // Check if pagination div already exists
    if (pagination.length === 0) {
        pagination = $('<div class="pagination d-flex justify-content-center align-items-center"></div>'); // Create pagination div
    } else {
        pagination.empty(); // Clear existing content in pagination div
    }
    var prevButton = $('<a href="#" class="prev">Prev</a>'); //align middle and maybe make button
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

    pagination.insertAfter('#toggleFormButtonContainer');

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

    $('.page').on('click', function (e) {
      e.preventDefault();
      var pageNum = parseInt($(this).text());
      makeTable(container, data, pageNum); // Update table for selected page
    });

}
function makeForm(container, playerData) {
  var form = $("<form/>").attr("id", "teamForm");
  form.append('<div class="form-group"><label for="name">Name:</label><input type="text" name="name" id="name" class="form-control"/></div>');
  var div = $("<div/>").addClass("form-group");
  div.append('<label for="captain">Captain:</label>');
  var select = $("<select/>").addClass("custom-select").attr("id", "captain").attr("onfocus",'this.size=5;').attr("onblur",'this.size=1;').attr("onchange",'this.size=1; this.blur();');
  var option = $("<option/>").attr('name', "empty");
  select.append(option);
  $.each(playerData, function(i, element) {
    if (element.firstName != null) {
      var text = element.firstName;
      if (element.lastName != null)
        text += " " + element.lastName;
    }
    var option = $("<option/>").text(text).attr('name', element.id);
    select.append(option);
  });
  div.append(select);
  form.append(div);
  form.append('<div class="form-group"><label for="colour">Colour:</label><input type="text" name="name" id="colour" class="form-control"/></div>');
  form.append('<input type="submit" value="Submit" id="save_data" onclick="postTeam(event)" class="btn-success"/>');
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
    if(!validateCaptain("captain")) return false;
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
                    getPlayerData();
                    toggleForm();
            },
            error : function(request,error)
            {
                return [];
                alert("Request: "+JSON.stringify(request));
            }
        });
}

function deleteTeam(id, button) {
  var confirmation = confirm("Are you sure you want to delete this team?");
  if (confirmation) {
    deleteTeamRequest(id);
  }
}

function deleteTeamRequest(id) {
  var deleteUrl = "http://localhost:8080/team/delete/" + id;
  $.ajax({
    url: deleteUrl,
    type: 'DELETE',
    success: function(data) {
      getTeamData();
      getPlayerData();
    },
    error: function(request, error) {
      return [];
      alert("Request: " + JSON.stringify(request));
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
  newRow.append('<td><input type="text" name="newName" id="newName" value="' + name + '" class="form-control-plaintext pulse-animation"/></td>');
  var select = $("<select/>").addClass("form-control-plaintext pulse-animation").attr("onfocus",'this.size=5;').attr("onblur",'this.size=1;').attr("onchange",'this.size=1; this.blur();');
  var option = $("<option/>").text(captain).attr('name', captainId).attr("id", "newCaptainName");
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
  newRow.append('<td><input type="text" name="newColour" id="newColour" value="' + colour + '" class="form-control-plaintext pulse-animation"/></td>');
  var cancelButton = $('<input type="button" value="Cancel" class="btn-danger"/>');
  cancelButton.on('click', function () {
    restoreTableRow(row); // Restore the original table row
  });
  var submitButton = $('<input type="button" value="Submit" id="submitUpdate" class="btn-success"/>');
  submitButton.on('click', function () {
    var data = { name: newRow.find('#newName').val() };
    if ($("#newCaptain option:selected").attr("name") != "empty") {
      data.captain = { id: $("#newCaptain option:selected").attr("name") };
    }
    data.colour = newRow.find('#newColour').val();
    if (!validateInput("newName") || !validateInput("newColour") || !validateCaptain("newCaptain")) {
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
  newRow.append($('<td/>').append(cancelButton, submitButton));
  replaceTableRow(row, newRow); // Replace the original table row with the update form
}

function replaceTableRow(oldRow, newRow) {
  oldRow.hide(); // Hide the original row
  newRow.insertAfter(oldRow); // Insert the new row after the original row
}

function restoreTableRow(row) {
  var oldRow = row.next(); // Get the next row (update form row)
  row.show(); // Show the original row
  oldRow.remove(); // Remove the update form row
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
function validateCaptain(id){
  var captainSelect = $('#'+id);
  var selectedOption = $("#"+id+" option:selected");
  var selectedOptionName = selectedOption.attr('name');
  if (selectedOptionName === 'empty') {
    addErrors(captainSelect, 'Please select a captain.');
    return false;
  }
  return true;
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
    }
    return true;
}

function addErrors(input, errorMessage) {
    clearErrors();
    if (input instanceof jQuery) { //I don't understand how this works but seems interesting
        input = input[0]; // Extract the raw DOM element from the jQuery object
    }
    input.classList.add('error');
    var popup = document.createElement('span');
    popup.className = 'popup';
    popup.textContent = errorMessage;
    input.parentNode.insertBefore(popup, input.nextSibling);
}
function searchTeams() {
  var searchInput = document.getElementById('searchInput').value;
  if(searchInput==""){
    $('#searchInput').attr("placeholder", "Search term");
    getTeamData();
  }
  else{
      $.ajax({
        url: 'http://localhost:8080/team/findByNameCaptainColour/' + searchInput,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          $("#teamTable").remove();
          makeTable($("#tableDiv"), data,1);
          $('#searchInput').attr("placeholder", searchInput);
          $('#searchInput').val('');
        },
        error: function(request, error) {
          alert("Request: " + JSON.stringify(request));
        }
      });
  }

}
function toggleForm() {
  isFormVisible = !isFormVisible;
  var formContainer = document.getElementById("formContainer");
  var toggleButton = document.getElementById("toggleFormButton");
  var toggleButtonRect = toggleButton.getBoundingClientRect();

  if (isFormVisible) {
    formContainer.style.display = "block";
    formContainer.style.top = toggleButtonRect.bottom + "px";
    formContainer.style.left = toggleButtonRect.left + "px";
    formContainer.style.opacity = 1;
    formContainer.classList.add("dialogue-bubble-show");
  } else {
    formContainer.classList.add("dialogue-bubble-hide");
    formContainer.addEventListener("animationend", function() {
      formContainer.style.opacity = 0;
      formContainer.style.display = "none";
      formContainer.classList.remove("dialogue-bubble-hide");
    }, { once: true });
  }
  if (isFormVisible) {
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function setupFormClose() {
    $(document).on('click', function(event) {
        var formContainer = document.getElementById("formContainer");
        var toggleButton = document.getElementById("toggleFormButton");
        var isClickInsideForm = formContainer.contains(event.target);
        var isClickOnToggleButton = (event.target === toggleButton);

        if (isFormVisible && !isClickInsideForm && !isClickOnToggleButton) {
            toggleForm();
        }
    });
}
