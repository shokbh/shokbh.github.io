/*
*
* view.js
* CS2550 Spring 2017
* Assn 5
* By: Sophy Hok
*
*/

//generate table with row and cell dynamically
//generate id & class and input box for each cell
function createTable(numRow, numCell)
{                     
    var table = document.getElementById("table");
    for (var i = 0; i < numRow; i++)
    {
        var row = table.insertRow(i);
        var check = i+1;
        for (var j = 0; j < numCell; j++)
        {
            var cell = row.insertCell(j);
            var c = j;
            cell.setAttribute('id', 'd' + (i+1) + j);
            cell.setAttribute('class', 'c' + (i+1) + j);
        }
    }
}//end creatTable()

//used in genObject() and timer();
var mytimer;

//generate given grid to the table as readonly value
//if the value is negative, meaning it is given
//if the value is positive, it is the user input, ouput in brown color
function genObject(numRow,numCol)
{
    mytimer = clearInterval(mytimer);
    second = 0;
    minute = 0;
    min = 0;
    mytimer = setInterval(timer, 1000);
    var gridTable = document.getElementById("table");
    var mySelect = document.getElementById("level");
    var level = mySelect.options[mySelect.selectedIndex].value;
    var p = document.getElementById("gridMsg");
    p.innerHTML = "";
    var k = 0;

    for (var i = 0; i < numRow; i++)
    {
        for (var j = 0; j < numCol; j++)
        {
            var cell = gridTable.rows[i].cells[j];
            var content;

            cell.style.fontSize = "20px";
            //if content=givenGrid 
            content = getSquare(i,j,level);
            if (content < 0){
                content = content * (-1);
                cell.innerHTML = content.toString();
            }
            else {
                cell.innerHTML = '<input id="i' + k + '" maxlength="1" size="1"/>'
                k++;
            }
        }
    }
} 

//to test in console window that the return value is right
function gen() {
    for (r = 0; r < 9; r++) {
        for (c = 0; c < 9; c++) {
            var content = getSquare(r, c);
            console.log("row: " + r + " col: " + " " + c
                + " content: " + content);
        }
    }
}

//make the grid clickable
function clickableGrid()
{
    var cells = document.getElementsByTagName("td");
    var p = document.getElementById("gridMsg");
    var mySelect = document.getElementById("level");
    var level = mySelect.options[mySelect.selectedIndex].value;
    for (var i =0; i < 81; i++)
    {
        cells[i].onclick = function() {
        var gridTable = document.getElementById("table");

            var col = this.cellIndex;
            var row = this.parentNode.rowIndex;
            var cell = gridTable.rows[row].cells[col];
                cell.style.fontSize = "30px";
                p.innerHTML = 'You clicked row ' + row + ' col ' + col;
        }
    }
}

//to test correct user input
function testAge()
{
    var text = document.getElementById("age").value;
    var p = document.getElementById("myAge");
    if (text == "")
        p.innerHTML = "Please enter a number!!";
    else p.innerHTML = text + '? You\'re cute!!!!!!!!!!';
}

// //start animation fun.png
// function startMove() {
//   var elem = document.getElementById("funImg");   
//   var pos = 0;
//   var id = setInterval(frame, 5);
//   function frame() {
//     if (pos == 350) {
//       clearInterval(id);
//     } else {
//       pos++; 
//       elem.style.top = pos + 'px'; 
//       elem.style.bottom = pos + 'px'; 
//     }
//   }
// }
//end animation

//clear all user input
function clearAll(){
    
    genObject(9,9);
}



//disable submit button

//call createTable() when page load
//row=9 cell=9 sudoku grid
window.onload = createTable(9,9);
//window.onload = document.getElementById('submitBtn').disabled = true;
//window.onload = genObject(9,9,"easy");
clickableGrid();
