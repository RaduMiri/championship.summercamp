$(document).ready(function() {
    getTeamData();
    getObjectData();
    setupFormClose();
});
var address = "http://localhost:8080/game";
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
//Sort functions
function getObjectGameTypeAsc(){
    $.ajax({
        url : address+'/findByOrderByGameTypeAsc',
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
function getObjectGameTypeDesc(){
    $.ajax({
        url : address+'/findByOrderByGameTypeDesc',
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
function getObjectFieldAsc(){
    $.ajax({
        url : address+'/findByOrderByFieldAsc',
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
function getObjectFieldDesc(){
    $.ajax({
        url : address+'/findByOrderByFieldDesc',
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
function getObjectScore1Asc(){
    $.ajax({
        url : address+'/findByOrderByScore1Asc',
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
function getObjectScore1Desc(){
    $.ajax({
        url : address+'/findByOrderByScore1Desc',
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
function getObjectScore2Asc(){
    $.ajax({
        url : address+'/findByOrderByScore2Asc',
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
function getObjectScore2Desc(){
    $.ajax({
        url : address+'/findByOrderByScore2Desc',
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
//TODO:Review team sorts
function getObjectTeam1Asc(){
    $.ajax({
        url : address+'/findByOrderByTeam1ColourAscTeam1NameAsc',
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
function getObjectTeam1Desc(){
    $.ajax({
        url : address+'/findByOrderByTeam1ColourDescTeam1NameDesc',
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
function getObjectTeam2Asc(){
    $.ajax({
        url : address+'/findByOrderByTeam2ColourAscTeam2NameAsc',
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
function getObjectTeam2Desc(){
    $.ajax({
        url : address+'/findByOrderByTeam2ColourDescTeam2NameDesc',
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
    var array = ["gameType", "field", "team1", "score1", "team2", "score2"];
    for(let i=0;i<array.length;i++){
        row.append("<th>"+uppercase(array[i])+"<a href='#' id='"+array[i]+"Desc' style='float:right' onclick='getObject"+uppercase(array[i])+"Desc()'>↓</a><a href='#' id='"+array[i]+"Asc' style='float:right' onclick='getObject"+uppercase(array[i])+"Asc()'>↑</a></th>");
    }
    row.append("<th>Actions</th>");
    table.append(row);
    //Table cells 5 attribute columns 1 action column
    $.each(toShow, function(rowIndex, r) {
        var row = $("<tr/>");
        //Game type
        if(r.gameType!=null) row.append("<td class='table-cell'>" + r.gameType + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Field
        if(r.field!=null) row.append("<td class='table-cell'>" + r.field + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Team1
        var text1 = "";
        if(r.team1?.name!=null){
            text1 +=r.team1?.colour+" "+r.team1?.name;
            row.append("<td class='table-cell' id= '"+r.team1?.id+"'>" + text1 + "</td>");
        }
        else row.append("<td class='table-cell'>" + "</td>");
        //Score1
        if(r.score1!=null) row.append("<td class='table-cell'>" + r.score1 + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");
        //Team2
        var text2 = "";
        if(r.team2?.name!=null){
            text2 +=r.team2?.colour+" "+r.team2?.name;
            row.append("<td class='table-cell' id= '"+r.team2?.id+"'>" + text2 + "</td>");
        }
        else row.append("<td class='table-cell'>" + "</td>");
        //Score2
        if(r.score2!=null) row.append("<td class='table-cell'>" + r.score2 + "</td>");
        else row.append("<td class='table-cell'>" + "</td>");

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
    //TODO:A team should not be able to play itself or play different gameTypes
    //Form setup next 4 inputs, 2 select, 1 button
    var form = $("<form/>").attr("id", "objectForm");
    //GameType input
    form.append('<div class="form-group"><label for="gameType">Game type:</label><input type="text" name="gameType" id="gameType" class="form-control"/></div>');
    //Field input
    form.append('<div class="form-group"><label for="field">Field:</label><input type="text" name="field" id="field" class="form-control"/></div>');

    // Team1 select1
    var div1 = $("<div/>").addClass("form-group");
    div1.append('<label for="team1">Team1:</label>');
    var select1 = $("<select/>").addClass("custom-select").attr("id", "team1").attr("onfocus", 'this.size=5;').attr("onblur", 'this.size=1;').attr("onchange", 'this.size=1; this.blur();');
    var option = $("<option/>").attr('name', "empty");
    select1.append(option);
    $.each(teamData, function (i, element) {
        var text = "";
        if (element.name != null || element.colour != null)
            text += element.colour + " " + element.name;
        var option = $("<option/>").text(text).attr('name', element.id);
        select1.append(option);
    });
    div1.append(select1);
    form.append(div1);
    // Score1
    form.append('<div class="form-group"><label for="score1">Score1:</label><input type="text" name="score1" id="score1" class="form-control"/></div>');
    // Team2 select2
    var div2 = $("<div/>").addClass("form-group");
    div2.append('<label for="team2">Team2:</label>');
    var select2 = $("<select/>").addClass("custom-select").attr("id", "team2").attr("onfocus", 'this.size=5;').attr("onblur", 'this.size=1;').attr("onchange", 'this.size=1; this.blur();');
    var optionUnavailable = $("<option/>").attr('name', "unavailable").text("Please select team1");
    select2.append(optionUnavailable);
    select1.on('change', function () {
        var selectedOptionName1 = $(this).find(":selected").attr('name');
        if (selectedOptionName1 !== 'empty') {
            selectTeam2();
        }
    });

    function selectTeam2() {
        // Clear existing options of select2
        select2.empty();

        // Get the selected team1 option
        var selectedOption1 = $("#team1 option:selected");
        var selectedOptionName1 = selectedOption1.attr('name');

        // Check if the selected team1 option is not "empty"
        if (selectedOptionName1 !== 'empty') {
            var option = $("<option/>").attr('name', "empty");
            select2.append(option);

            // Filter out the selected team1 option from teamData
            var filteredTeamData = tempTeamData.filter(function (team) {
                return team.id !== parseInt(selectedOptionName1);
            });

            // Add the remaining options to team2
            $.each(filteredTeamData, function (i, element) {
                var text = "";
                if (element.name != null || element.colour != null)
                    text += element.colour + " " + element.name;
                var option = $("<option/>").text(text).attr('name', element.id);
                select2.append(option);
            });
        }
    }

    div2.append(select2);
    form.append(div2);
    // Score2
    form.append('<div class="form-group"><label for="score2">Score2:</label><input type="text" name="score2" id="score2" class="form-control"/></div>');
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
    //GameType
    var gameType = document.getElementById('gameType').value;
    var flagGameType = validateInput("gameType");
    if(!flagGameType) return false;
    var data = {gameType:gameType};
    //Field
    var field = document.getElementById('field').value;
    var flagField = validateInput("field");
    if(!flagField) return false;
    data.field = field;
    //Team1
    if($("#team1 option:selected").attr("name")!="empty"){
        data.team1={id:$("#team1 option:selected").attr("name")}
    }
    if(!validateTeam("team1")) return false;
    //Score1
    var score1 = document.getElementById('score1').value;
    var flagScore1 = validateInput("score1");
    if(!flagScore1) return false;
    data.score1 = score1;
    //Team2
    if($("#team2 option:selected").attr("name")!="empty"){
        data.team2={id:$("#team2 option:selected").attr("name")}
    }
    if(!validateTeam("team2")) return false;
    //Score2
    var score2 = document.getElementById('score2').value;
    var flagScore2 = validateInput("score2");
    if(!flagScore2) return false;
    data.score2 = score2;
    //Request
    $.ajax({
        url : address +'/create',
        type : 'POST',
        data : JSON.stringify(data),
        contentType: "application/json",
        success : function(data) {
                clearErrors();
                document.getElementById("gameType").value = '';
                document.getElementById("field").value = '';
                document.getElementById("score1").value = '';
                document.getElementById("score2").value = '';
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
function isInteger(str) {return /^\d+$/.test(str);}
function validateInput(myInput){
    var input = document.getElementById(myInput);
    var inputValue = input.value;
    var isValid
    if(myInput == "score1" || myInput == "score2"){
        if(isInteger(inputValue)){
            inputValue = Number(inputValue);
            isValid = inputValue>=-1000 && inputValue<=1000;
            if (!isValid) {
                addErrors(input, "Score must be between -1000 and 1000");
            }
        }
        else{
            addErrors(input, "Score must be a whole number");
        }
    }
    if(myInput=="gameType"||myInput=="field"){
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
//Update
function updateObject(id, button) {
    //Setup getting the position of the data
    //TODO
    var row = $(button).closest('tr');
    var gameType = row.find('td:eq(0)').text();
    var field = row.find('td:eq(1)').text();
    var team1 = row.find('td:eq(2)').text();
    var team1Id = row.find('td:eq(2)').attr('id');
    var score1 = Number(row.find('td:eq(3)').text());
    var team2 = row.find('td:eq(4)').text();
    var team2Id = row.find('td:eq(4)').attr('id');
    var score2 = Number(row.find('td:eq(5)').text());
    //Creating update environment
    var newRow = $("<tr/>");
    //New gameType
    newRow.append('<td><input type="text" name="newGameType" id="newGameType" value="' + gameType + '" class="form-control-plaintext pulse-animation"/></td>');
    //New field
    newRow.append('<td><input type="text" name="newField" id="newField" value="' + field + '" class="form-control-plaintext pulse-animation"/></td>');
    //New team1
    var select1 = $("<select/>").addClass("form-control-plaintext pulse-animation").attr("onfocus",'this.size=5;').attr("onblur",'this.size=1;').attr("onchange",'this.size=1; this.blur();');
    var option1 = $("<option/>").text(team1).attr('name', team1Id).attr("id", "newTeam1Option");
    select1.append(option1).attr('id', 'newTeam1');
    $.each(tempTeamData, function (i, element) {
        var text1 = ""
        if (element.name != null) {
            text1 += element.colour + " " + element.name;
    }
    var option1 = $("<option/>").text(text1).attr('name', element.id).attr("id", "newTeam1Option");
    select1.append(option1);
    });
    if (/^[a-zA-Z]+$/.test(team1)) {
        var option1 = $("<option/>").text(team1).attr('name', team1Id).attr("id", "newTeam1Option");
        select1.append(option1);
    }
    select1.find('option[name="' + team1Id + '"]').prop('selected', true);
    newRow.append(select1);
    //New score1
    newRow.append('<td><input type="text" name="newScore1" id="newScore1" value="' + score1 + '" class="form-control-plaintext pulse-animation"/></td>');
    //New team2
    var select2 = $("<select/>").addClass("form-control-plaintext pulse-animation").attr("onfocus",'this.size=5;').attr("onblur",'this.size=1;').attr("onchange",'this.size=1; this.blur();');
    var option2 = $("<option/>").text(team2).attr('name', team2Id).attr("id", "newTeam2Option");
    select2.append(option2).attr('id', 'newTeam2');
    $.each(tempTeamData, function (i, element) {
        var text2 = ""
        if (element.name != null) {
            text2 += element.colour + " " + element.name;
    }
    var option2 = $("<option/>").text(text2).attr('name', element.id).attr("id", "newTeam2Option");
    select2.append(option2);
    });
    if (/^[a-zA-Z]+$/.test(team2)) {
        var option2 = $("<option/>").text(team2).attr('name', team2Id).attr("id", "newTeam2Option");
        select2.append(option2);
    }
    select2.find('option[name="' + team2Id + '"]').prop('selected', true);
    newRow.append(select2);
    //New score2
    newRow.append('<td><input type="text" name="newScore2" id="newScore2" value="' + score2 + '" class="form-control-plaintext pulse-animation"/></td>');

    // Use a flag variable to track whether newTeam2 options have been updated or not
    var newTeam2OptionsUpdated = false;

    // When an option is selected for newTeam1, update the options for newTeam2
     // When an option is selected for newTeam1, update the options for newTeam2
        select1.on('change', function () {
            var selectedOptionName1 = $(this).find(":selected").attr('name');
            if (selectedOptionName1 !== 'empty') {
                // Clone the temporary team data to avoid modifying the original data
                var filteredTeamDataForTeam2 = tempTeamData.slice();
                // Remove the selected team1 option from the options for newTeam2
                filteredTeamDataForTeam2 = filteredTeamDataForTeam2.filter(function (team) {
                    return team.id !== parseInt(selectedOptionName1);
                });

                // Clear and update the options for newTeam2
                select2.empty();
                $.each(filteredTeamDataForTeam2, function (i, element) {
                    var text = "";
                    if (element.name != null) {
                        text += element.colour + " " + element.name;
                    }
                    var option = $("<option/>").text(text).attr('name', element.id).attr("id", "newTeam2Option");
                    select2.append(option);
                });
            }
        });

        // When an option is selected for newTeam2, update the options for newTeam1
        select2.on('change', function () {
            var selectedOptionName2 = $(this).find(":selected").attr('name');
            if (selectedOptionName2 !== 'empty') {
                // Clone the temporary team data to avoid modifying the original data
                var filteredTeamDataForTeam1 = tempTeamData.slice();
                // Remove the selected team2 option from the options for newTeam1
                filteredTeamDataForTeam1 = filteredTeamDataForTeam1.filter(function (team) {
                    return team.id !== parseInt(selectedOptionName2);
                });

                // Clear and update the options for newTeam1
                select1.empty();
                $.each(filteredTeamDataForTeam1, function (i, element) {
                    var text = "";
                    if (element.name != null) {
                        text += element.colour + " " + element.name;
                    }
                    var option = $("<option/>").text(text).attr('name', element.id).attr("id", "newTeam1Option");
                    select1.append(option);
                });
            }
        });
    //Buttons
    //Cancel
    var cancelButton = $('<input type="button" value="Cancel" class="btn-danger"/>');
    cancelButton.on('click', function (event) {
        event.stopPropagation();
        restoreTableRow(row); // Restore the original table row
    });
    //Submit
    var submitButton = $('<input type="button" value="Submit" id="submitUpdate" class="btn-success"/>');
    var data;
    submitButton.on('click', function (event) {
        event.stopPropagation();
        //Data assignment
        data = { gameType: newRow.find('#newGameType').val() };
        data.field = newRow.find('#newField').val();
        data.score1= Number(newRow.find('#newScore1').val());
        data.score2= Number(newRow.find('#newScore2').val());
        if ($("#newTeam1 option:selected").attr("name") != "empty") {
            data.team1 = { id: $("#newTeam1 option:selected").attr("name") };
        }
        if ($("#newTeam2 option:selected").attr("name") != "empty") {
            data.team2 = { id: $("#newTeam2 option:selected").attr("name") };
        }

    //Validation
    //TODO: Not working here, it enters in the function and says that it can't read values of null
//    if (!validateInput("newGameType") || !validateInput("newField") || !validateInput("newScore1") || !validateInput("newScore2")) {
//        return false;
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
            url: address +'/findByGameTypeFieldScore1Score2Team1NameTeam1ColourTeam2NameTeam2Colour/' + searchInput,
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

