/*
*
* login.js
* CS2550 Spring 2017
* Final project
* By: Sophy Hok
*
*/

//send username password to server and validate using ajax
function loadSyncPost() {
    var name = document.getElementById("username").value;
    var pwd= document.getElementById("password").value;
    var data = "userName=" + name + "&password=" + pwd;
    //alert(data);
    var url = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php";
    var localRequest = new XMLHttpRequest();

    // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    localRequest.open("POST", url, false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(data);

    // NOTE THAT THE status WILL NOT BE 200 IF THE REQUEST IS FOR A
    // LOCAL FILE.
    if (localRequest.status == 200) {
        var dataDiv = document.getElementById("checkInput");

        var responseJson = JSON.parse(localRequest.responseText);
        if (responseJson["result"] == "invalid")
        {
            dataDiv.style.color = "red";
            dataDiv.innerHTML = "Your username/password is: " + responseJson["result"];
        }
        else {
            window.location.href = "game.html";
            login = "Username: " + responseJson["userName"] + "<br/> Timestamp: " + responseJson["timestamp"];
            localStorage.setItem('cs2550timestamp', login);
    }
    }
}

function getLocalStorage () 
{
    var storage = document.getElementById("storage");
    storage.innerHTML = localStorage.getItem('cs2550timestamp');
    //alert(localStorage.getItem('cs2550timestamp'));
}

function clearLocalStorage()
{
    var storage = document.getElementById("storage");
    localStorage.removeItem('cs2550timestamp');
    storage.innerHTML = "";

}

getLocalStorage();
