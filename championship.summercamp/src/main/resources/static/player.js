$(document).ready(function() {
    getTeamData();
    getObjectData();
    getCaptainData();
    setupFormClose();
});
var address = "http://localhost:8080/player";
var isFormVisible = false;
var tempTeamData;
var tempObjectData;
var tempCaptainData;

function getObjectData(){
    $.ajax({
        url : address+'/all',
        type : 'GET',
        dataType:'json',
        success : function(data) {
            tempObjectData = data;
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
function getTeamData(){
    $.ajax({
        url : 'http://localhost:8080/team/all',
        type : 'GET',
        dataType:'json',
        success : function(teamData) {
            $("#objectForm").remove();
            makeForm($("#formDiv"),teamData);
            tempTeamData = teamData;
            getObjectData();
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
function getCaptainData(){
    $.ajax({
        url : 'http://localhost:8080/player/findByTeamCaptainIsNotNull',
        type : 'GET',
        dataType:'json',
        success : function(captainData) {
            tempCaptainData = captainData;
        },
        error : function(request,error)
        {
            return [];
            alert("Request: "+JSON.stringify(request));
        }
    });
}
//Sort functions
 function getObjectFirstNameAsc(){
     $.ajax({
         url : address+'/findByOrderByFirstNameAsc',
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
function getObjectFirstNameDesc(){
  $.ajax({
      url : address+'/findByOrderByFirstNameDesc',
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
function getObjectLastNameAsc(){
  $.ajax({
      url : address+'/findByOrderByLastNameAsc',
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
function getObjectLastNameDesc(){
  $.ajax({
      url : address+'/findByOrderByLastNameDesc',
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
function getObjectAgeAsc(){
  $.ajax({
      url : address+'/findByOrderByAgeAsc',
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
function getObjectAgeDesc(){
  $.ajax({
      url : address+'/findByOrderByAgeDesc',
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
function getObjectNumberAsc(){
  $.ajax({
      url : address+'/findByOrderByNumberAsc',
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
function getObjectNumberDesc(){
  $.ajax({
      url : address+'/findByOrderByNumberDesc',
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
function getObjectTeamColourAsc(){
  $.ajax({
      url : address+'/findByOrderByTeamColourAsc',
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
function getObjectTeamColourDesc(){
  $.ajax({
      url : address+'/findByOrderByTeamColourDesc',
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
function uppercase(s){
    news=s.replace(/\b[a-z]/g, function(s1) {
    return s1.toUpperCase();})
    return news;}
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
    var array = ["firstName", "lastName", "age", "number","teamColour"];
    for(let i=0;i<array.length;i++){
        row.append("<th>"+uppercase(array[i])+"<a href='#' id='"+array[i]+"Desc' style='float:right' onclick='getObject"+uppercase(array[i])+"Desc()'>↓</a><a href='#' id='"+array[i]+"Asc' style='float:right' onclick='getObject"+uppercase(array[i])+"Asc()'>↑</a></th>");
    }
    row.append("<th>Actions</th>");
    table.append(row);
    //Table cells 5 attribute columns 1 action column
    $.each(toShow, function(rowIndex, r) {
        var row = $("<tr/>");
        //First name
        if(r.firstName!=null) row.append("<td class='table-cell'>" + r.firstName + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Last name
        if(r.lastName!=null) row.append("<td class='table-cell'>" + r.lastName + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Age
        if(r.age!=null) row.append("<td class='table-cell'>" + r.age + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Number
        if(r.number!=null) row.append("<td class='table-cell'>" + r.number + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Team
        //Check if the player is the captain of a team
        var text = "";
        var flagCaptain=1;
        $.each(tempTeamData,function(i, element){//This check is very slow, should be done in backend
            //Checking each team, the player is the captain of this team
            if(r.id==element.captain?.id){
                if(element.name!=null){
                    text +="Captain " +element.colour+" "+element.name;
                    row.append("<td class='table-cell'>" + text + "</td>");
                }
                else{ //This just checks if the team has no name
                row.append("<td class='table-cell'>" + "</td>");}
                flagCaptain=1;
                return false;
            }
            else flagCaptain=0;
        });
        //If the player is not a captain just put team colour + name straight from team
        text="";
        if(flagCaptain==0){
            if(r.team?.name!=null){
                text +=r.team?.colour+" "+r.team?.name;
                row.append("<td class='table-cell'>" + text + "</td>");
            }
            else
            row.append("<td class='table-cell'>" + "</td>");
        }
        table.append(row);
        //Actions 2 button
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
function makeForm(container, teamData){
    //Form setup next 4 inputs, 1 select, 1 button
    var form = $("<form/>").attr("id", "objectForm");
    //First name input
    form.append('<div class="form-group"><label for="firstName">First name:</label><input type="text" name="firstName" id="firstName" class="form-control"/></div>');
    //Last name input
    form.append('<div class="form-group"><label for="lastName">Last name:</label><input type="text" name="lastName" id="lastName" class="form-control"/></div>');
    //Age input
    form.append('<div class="form-group"><label for="age">Age:</label><input type="text" name="age" id="age" class="form-control"/></div>');
    //Number input
    form.append('<div class="form-group"><label for="number">Number:</label><input type="text" name="number" id="number" class="form-control"/></div>');
    //Team select
    var div = $("<div/>").addClass("form-group");
    div.append('<label for="team">Team:</label>');
    var select = $("<select/>").addClass("custom-select").attr("id", "team").attr("onfocus",'this.size=5;').attr("onblur",'this.size=1;').attr("onchange",'this.size=1; this.blur();');
    var option = $("<option/>").attr('name', "empty");
    select.append(option);
    $.each(teamData, function(i, element) {
    var text = "";
    if (element.name!= null || element.colour!=null)
        text += element.colour + " " + element.name;
    var option = $("<option/>").text(text).attr('name', element.id);
    select.append(option);
    });
    div.append(select);
    form.append(div);
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
    //First name
    var firstName = document.getElementById('firstName').value;
    var flagFirstName = validateInput("firstName");
    if(!flagFirstName) return false;
    var data = {firstName:firstName};
    //Last name
    var lastName = document.getElementById('lastName').value;
    var flagLastName = validateInput("lastName");
    if(!flagLastName) return false;
    data.lastName = lastName;
    //Age
    var age = Number(document.getElementById('age').value);
    var flagAge = validateInput("age");
    if(!flagAge) return false;
    data.age = age;
    //Number
    var number = Number(document.getElementById('number').value);
    var flagNumber = validateInput("number");
    if(!flagNumber) return false;
    data.number = number;
    //Team
    if($("#team option:selected").attr("name")!="empty"){
        data.team={id:$("#team option:selected").attr("name")}
    }
    if(!validateTeam("team")) return false;
    //Validate all conditions
    if (!validateAllInputs(data,"firstName", "lastName", "number", "team")) return false;
    //Request
    $.ajax({
        url : address +'/create',
        type : 'POST',
        data : JSON.stringify(data),
        contentType: "application/json",
        success : function(data) {
                clearErrors();
                document.getElementById("firstName").value = '';
                document.getElementById("lastName").value = '';
                document.getElementById("age").value = '';
                document.getElementById("number").value = '';
                $("#team").val("empty");
                getObjectData();
                getTeamData();
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
function isInteger(str) {
  return /^\d+$/.test(str);
}
function validateInput(myInput){
    var input = document.getElementById(myInput);
    var inputValue = input.value;
    var isValid
    if(myInput == "age"){
        if(isInteger(inputValue)){
            inputValue = Number(inputValue);
            isValid = inputValue>=14 && inputValue<=80;
            if (!isValid) {
                addErrors(input, "Age must be between 14 and 80");
            }
        }
        else{
            addErrors(input, "Age must be a whole number");
        }
    }
    if(myInput=="number"){
        if(isInteger(inputValue)){
            inputValue = Number(inputValue);
            isValid = inputValue>=0 && inputValue<=100;
            if (!isValid) {
                addErrors(input, "The number must be between 0 and 100");
            }
        }
        else{
            addErrors(input, "Number must be a whole number");
        }

    }
    if(myInput=="firstName"||myInput=="lastName"){
        isValid = inputValue.length <= 20 && inputValue.length >= 3 && /^[A-Z]/.test(inputValue);
        if (!isValid) {
            addErrors(input, "Text should be between 3 and 20 characters and should start with uppercase");
        }
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
function validateTeam(id){
  var teamSelect = $('#'+id);
  var selectedOption = $("#"+id+" option:selected");
  var selectedOptionName = selectedOption.attr('name');
  if (selectedOptionName === 'empty') {
    addErrors(teamSelect, 'Please select a team.');
    return false;
  }
  return true;
}
function validateAllInputs(data, firstName, lastName, number, team) {
    //Check for each object if the differentiating attributes are identical
    for (var i = 1; i < tempObjectData.length; i++) {
        var object = tempObjectData[i];
        //Attributes to check
        var objectFirstName = object.firstName;
        var objectLastName = object.lastName;
        var objectNumber = object.number;
        var objectTeamId = object.team?.id;

        if (objectFirstName === data.firstName && objectLastName === data.lastName && objectNumber === data.number && objectTeamId === Number(data.team?.id)) {
            var firstNameInput = document.getElementById(firstName);
            addErrors(firstNameInput, 'This first name, last name, number, and team combination already exists.');
            return false;
        }
    }
    return true;
}
//Delete + optional Add check when deleting the captain of a team to confirm that the team will be
//deleted as well so you should first change the captain of the team and make sure the cascade deletes the team
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
      getTeamData();
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
    var firstName = row.find('td:eq(0)').text();
    var lastName = row.find('td:eq(1)').text();
    var age = Number(row.find('td:eq(2)').text());
    var number = Number(row.find('td:eq(3)').text());
    var team = row.find('td:eq(4)').text();
    var teamId = row.find('td:eq(4)').attr('id');
    //Creating update environment
    var newRow = $("<tr/>");
    //New first name
    newRow.append('<td><input type="text" name="newFirstName" id="newFirstName" value="' + firstName + '" class="form-control-plaintext pulse-animation"/></td>');
    //New last name
    newRow.append('<td><input type="text" name="newLastName" id="newLastName" value="' + lastName + '" class="form-control-plaintext pulse-animation"/></td>');
    //New age
    newRow.append('<td><input type="number" name="newAge" id="newAge" value="' + age + '" class="form-control-plaintext pulse-animation"/></td>');
    //New number
    newRow.append('<td><input type="number" name="newNumber" id="newNumber" value="' + number + '" class="form-control-plaintext pulse-animation"/></td>');
    //New team
    //Different if captain
    if(/Captain/.test(team)){
        newRow.append("<td>Delete team for captains</td>");
    }
    else{
        var select = $("<select/>").addClass("form-control-plaintext pulse-animation").attr("onfocus",'this.size=5;').attr("onblur",'this.size=1;').attr("onchange",'this.size=1; this.blur();');
        var option = $("<option/>").text(team).attr('name', teamId).attr("id", "newTeamOption");
        select.append(option).attr('id', 'newTeam');
        $.each(tempTeamData, function (i, element) {
            var text = ""
            if (element.name != null) {
                text += element.colour + " " + element.name;
        }
        var option = $("<option/>").text(text).attr('name', element.id).attr("id", "newTeamOption");
        select.append(option);
        });
        if (/^[a-zA-Z]+$/.test(team)) {
            var option = $("<option/>").text(team).attr('name', teamId).attr("id", "newTeamOption");
            select.append(option);
        }
        select.find('option[name="' + teamId + '"]').prop('selected', true);
        newRow.append(select);
    }
    //Buttons
    //Cancel
    var cancelButton = $('<input type="button" value="Cancel" class="btn-danger"/>');
    cancelButton.on('click', function () {
        restoreTableRow(row); // Restore the original table row
    });
    //Submit
    var submitButton = $('<input type="button" value="Submit" id="submitUpdate" class="btn-success"/>');
    var data;
    submitButton.on('click', function () {
        //Data assignment
        data = { firstName: newRow.find('#newFirstName').val() };
        data.lastName = newRow.find('#newLastName').val();
        data.age = Number(newRow.find('#newAge').val());
        data.number = Number(newRow.find('#newNumber').val());
        if(/Captain/.test(team)){}
        else{
            if ($("#newTeam option:selected").attr("name") != "empty") {
                data.team = { id: $("#newTeam option:selected").attr("name") };
            }
        }
    //TODO:This specific validation does not work no matter what I do, the answer may be add error with that instance of jquerry
    //Validation
//    if (/Captain/.test(team)) {
//        if (!validateInput("newFirstName") || !validateInput("newLastName") || !validateInput("newAge") || !validateInput("newNumber")) {
//            return false;
//        }
//    }
//    else{
//        if (!validateInput("newFirstName") || !validateInput("newLastName") || !validateInput("newAge") || !validateInput("newNumber") || !validateTeam(teamId) || !validateAllInputs(data,"newFirstName", "newLastName", "newNumber", "newTeam")) {
//            return false;
//        }
//    }
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
    var searchInput = document.getElementById('searchInput').value;
    if(searchInput==""){
        $('#searchInput').attr("placeholder", "Search term");
        getObjectData();
    }
    else{
        $.ajax({
            url: address +'/findByFirstNameLastNameAgeNumberTeamNameTeamColour/' + searchInput,
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
