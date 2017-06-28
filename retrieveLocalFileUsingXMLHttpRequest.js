/* 
*
* retrieveLocalFileUsingXMLHttpRequest.html
* CS2550 Spring 2017 
* Assn 6
* Writen By: Sophy Hok
* 
*/

//a part of the following code has been provided from the professor
function getSolutionFromFile() {
    var request = new XMLHttpRequest();
    request.open("GET", "sudokuFunJSON.json", false);
    request.send(null);

    var xmldoc = request.responseText;
    var data = JSON.parse(xmldoc);
    //alert(xmldoc["easyGrid"][1]);
    //alert(data["easyGrid"][1]);
    //alert(grid["easyGrid"][1]);
    var text = document.getElementById("fromJsonFile");
    text.innerHTML = data["description"];
    var gridTable = document.getElementById("table");
    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j< 9; j++)
        {
            var cell = gridTable.rows[i].cells[j];
            var content;
            content = data["solutionGrid"][i][j];
            cell.innerHTML = content.toString();
        }
    }

}