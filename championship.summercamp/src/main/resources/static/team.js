$(document).ready(function() {
    getObjectData();
    getPlayerData();
    setupFormClose();
});
//Wherever you see object, it means team
var address = "http://localhost:8080/team"; //TODO:Change address for the other models
var isFormVisible = false;
var tempPlayerData;
var tempObjectData;

function getObjectData(){
    $.ajax({
        url : address+'/all',
        type : 'GET',
        dataType:'json',
        success : function(data) {
            tempObjectData = data;
             $("#table").remove();
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
             $("#objectForm").remove();
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
function getObjectNameAsc(){
    $.ajax({
        url : address +'/findByOrderByNameAsc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#table").remove();
             makeTable($("#tableDiv"), data,1);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getObjectNameDesc(){
    $.ajax({
        url : address +'/findByOrderByNameDesc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#table").remove();
             makeTable($("#tableDiv"), data,1);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getObjectCaptainAsc(){
    $.ajax({
        url : address +'/findByOrderByCaptainFirstNameAscCaptainLastNameAsc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#table").remove();
             makeTable($("#tableDiv"), data,1);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getObjectCaptainDesc(){
    $.ajax({
        url : address +'/findByOrderByCaptainFirstNameDescCaptainLastNameDesc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#table").remove();
             makeTable($("#tableDiv"), data, 1);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getObjectColourAsc(){
    $.ajax({
        url : address +'/findByOrderByColourAsc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#table").remove();
             makeTable($("#tableDiv"), data,1);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getObjectColourDesc(){
    $.ajax({
        url : address +'/findByOrderByColourDesc',
        type : 'GET',
        dataType:'json',
        success : function(data) {
             $("#table").remove();
             makeTable($("#tableDiv"), data,1);
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
//Table
function makeTable(container, data, currentPage) {
    //Pagination setup
    var pageSize = 5; //objects per page
    var totalPages = Math.ceil(data.length / pageSize);
    //Table setup
    var table = $("<table/>").addClass('table table-bordered table-striped').attr('id', 'table');
    //Pagination start
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var toShow = data.slice(startIndex, endIndex);
    //Table row
    var row = $("<tr/>");
    row.append("<th>Name<a href='#' id='nameDesc' style='float:right' onclick='getObjectNameDesc()'>↓</a><a href='#' id='nameAsc' style='float:right' onclick='getObjectNameAsc()'>↑</a></th>");
    row.append("<th>Captain<a href='#' id='captainDesc' style='float:right' onclick='getObjectCaptainDesc()'>↓</a><a href='#' id='captainAsc' style='float:right' onclick='getObjectCaptainAsc()'>↑</a></th>");
    row.append("<th>Colour<a href='#' id='colourDesc' style='float:right' onclick='getObjectColourDesc()'>↓</a><a href='#' id='colourAsc' style='float:right' onclick='getObjectColourAsc()'>↑</a></th>");
    row.append("<th>Actions</th>");
    table.append(row);
    //Table cells 3 attribute columns 1 action column
    $.each(toShow, function (rowIndex, r) {
      var row = $("<tr/>");
      //Name
      if (r.name != null) row.append("<td class='table-cell'>" + r.name + "</td>");
      else row.append("<td class='table-cell'>" + "</td>");
      //Captain
      if (r.captain?.firstName != null) row.append("<td class='table-cell' id='" + r.captain?.id + "'>" + r.captain?.firstName + " " + r.captain?.lastName + "</td>");
      else row.append("<td class='table-cell'>" + "</td>");
      //Colour
      if (r.colour != null) row.append("<td class='table-cell'>" + r.colour + "</td>");
      else row.append("<td class='table-cell'>" + "</td>");
      //Actions 2 buttons
      var deleteButton = $('<input type="button" value="Delete" class="btn-danger">');
      deleteButton.on('click', function () {
        deleteObject(r.id, this);
      });
      var updateButton = $('<input type="button" value="Update" class="btn-info">');
      updateButton.on('click', function () {
        updateObject(r.id, this);
      });
      var actionsCell = $("<td/>").append(deleteButton, updateButton).addClass('table-cell');
      row.append(actionsCell);
      table.append(row);
    });
    //Table insert
    container.empty().append(table);
    //Pagination
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
//Form
function makeForm(container, playerData) {
    //Form setup next 2 inputs, 1 select, 1 button
    var form = $("<form/>").attr("id", "objectForm");
    //Name input
    form.append('<div class="form-group"><label for="name">Name:</label><input type="text" name="name" id="name" class="form-control"/></div>');
    //Captain select
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
    //Colour input
    form.append('<div class="form-group"><label for="colour">Colour:</label><input type="text" name="name" id="colour" class="form-control"/></div>');
    //Submit button
    form.append('<input type="submit" value="Submit" id="save_data" onclick="post(event)" class="btn-success"/>');
    //Insert
    return container.append(form);
}
function toggleForm() {//Toggle form visibility
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
function setupFormClose() {//Clicking outside the form window should close it
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
//Post
function post(event){
    //Setup
    event.preventDefault(); //prevents page refresh when submitting
    //Attributes and validation
    //Name
    var name = document.getElementById('name').value;
    var flagName = validateInput("name");;
    if(!flagName) return false;
    var data = {name:name};
    //Colour
    var colour = document.getElementById('colour').value;
    var flagColour = validateInput("colour");;
    if(!flagColour) return false;
    data.colour=colour;
    //Captain
    if($("#captain option:selected").attr("name")!="empty"){
        data.captain={id:$("#captain option:selected").attr("name")}
    }
    if(!validateCaptain("captain")) return false;
    //Validate all conditions
    if (!validateAllInputs(data,"name", "colour")) return false;
    //Request
    $.ajax({
        url : address +'/create',
        type : 'POST',
        data : JSON.stringify(data),
        contentType: "application/json",
        success : function(data) {
                clearErrors();
                document.getElementById('name').value = '';
                document.getElementById('colour').value = '';
                $("#captain").val("empty");
                getObjectData();
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
//Validation and errors
function validateInput(myInput) {
    var input = document.getElementById(myInput);
    var inputValue = input.value;
    var isValid = inputValue.length <= 20 && inputValue.length >= 3 && /^[A-Z]/.test(inputValue);
    if (!isValid) {
        addErrors(input, "Text should be between 3 and 20 characters and should start with uppercase");
    }
    return isValid;
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
function validateAllInputs(data, name, colour) {
    //Check for each object if the differentiating attributes are identical
    for (var i = 1; i < tempObjectData.length; i++) {
        var object = tempObjectData[i];
        //Attributes to check
        var objectName = object.name;
        var objectColour = object.colour;

        if (objectName === data.name && objectColour === data.colour) {
            var colourInput = document.getElementById(colour);
            addErrors(colourInput, 'This name and colour combination already exists.');
            return false;
        }
    }
    return true;
}
//Delete
function deleteObject(id, button) {
  var confirmation = confirm("Are you sure you want to delete this object?");
  if (confirmation) {
    deleteObjectRequest(id);
  }
}
function deleteObjectRequest(id) {
  var deleteUrl = address + '/delete/' + id;
  $.ajax({
    url: deleteUrl,
    type: 'DELETE',
    success: function(data) {
      getObjectData();
      getPlayerData();
    },
    error: function(request, error) {
      return [];
      alert("Request: " + JSON.stringify(request));
    }
  });
}
//Update
function updateObject(id, button) {
    //Setup getting the position of the data
    var row = $(button).closest('tr');
    var name = row.find('td:eq(0)').text();
    var captain = row.find('td:eq(1)').text();
    var captainId = row.find('td:eq(1)').attr('id');
    var colour = row.find('td:eq(2)').text();
    //Creating update environment
    var newRow = $("<tr/>");
    //New name
    newRow.append('<td><input type="text" name="newName" id="newName" value="' + name + '" class="form-control-plaintext pulse-animation"/></td>');
    //New captain
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
    //New colour
    newRow.append('<td><input type="text" name="newColour" id="newColour" value="' + colour + '" class="form-control-plaintext pulse-animation"/></td>');
    //Buttons
    //Cancel
    var cancelButton = $('<input type="button" value="Cancel" class="btn-danger"/>');
    cancelButton.on('click', function () {
        restoreTableRow(row); // Restore the original table row
    });
    //Submit
    var submitButton = $('<input type="button" value="Submit" id="submitUpdate" class="btn-success"/>');
    submitButton.on('click', function () {
    //Data assignment
    var data = { name: newRow.find('#newName').val() };
    if ($("#newCaptain option:selected").attr("name") != "empty") {
        data.captain = { id: $("#newCaptain option:selected").attr("name") };
    }
    data.colour = newRow.find('#newColour').val();
    //Validation
    if (!validateInput("newName") || !validateInput("newColour") || !validateCaptain("newCaptain") || !validateAllInputs(data,"newName","newColour")) {
        return false;
    }
    //Request
    var updateUrl = address+ '/update/' + id;
    $.ajax({
    url: updateUrl,
    type: 'PUT',
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (data) {
        getObjectData();
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
//Filter
function search() {
    //May give duplicates if one object has the same string found in multiple places, solution in player search
    var searchInput = document.getElementById('searchInput').value;
    if(searchInput==""){
        $('#searchInput').attr("placeholder", "Search term");
        getObjectData();
    }
    else{
        $.ajax({
            url: address +'/findByNameCaptainColour/' + searchInput,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#table").remove();
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
