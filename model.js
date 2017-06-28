/*
*
* model.js
* CS2550 Spring 2017
* Assn 6
* By: Sophy Hok
*
*/

var gameState = {
    "easyGrid": [[0,0,0,-4,0,0,-2,0,-3],[0,0,-4,0,-6,-2,0,-9,0],[-2,-1,0,-7,0,-3,0,-4,-6],[-4,-7,0,0,0,-6,0,0,-1],[0,0,0,-2,0,-5,0,-3,0],[-8,0,-3,0,-4,0,0,-6,-5],[-1,0,0,0,-2,0,-8,0,-9],[-7,0,-2,0,-5,0,-6,0,-4],[-5,0,0,0,0,-4,0,-7,0]],
    "mediumGrid":  [[-6,0,-7,0,0,0,0,-8,-3],[0,-8,0,-5,0,0,-1,0,0],[0,-1,-9,0,0,0,-5,-4,0],[0,-7,0,0,-3,-6,0,0,0],[-9,0,0,-2,0,0,-4,0,-8],[-8,0,0,0,-4,-9,0,0,0],[0,-4,0,-3,0,-7,0,0,-9],[-7,0,0,-9,0,0,0,0,0],[-5,-9,0,0,0,0,0,-7,0]],
    "hardGrid":  [[0,-5,0,0,0,0,0,-8,0],[0,-8,0,-5,0,0,0,0,-7],[0,0,0,0,0,0,-5,0,0],[-4,0,0,0,0,0,0,0,-1],[0,-6,0,0,-7,0,0,0,-8],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,-7,0,-5,0],[0,0,0,0,0,0,0,-1,0],[-5,0,0,-6,0,0,0,0,0]],
    "impGrid":  [[0,0,0,0,0,0,0,0,0],[0,-8,0,0,-5,0,0,-9,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,-9,0,0,-7,0,0,-3,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,-3,0,0,-8,0,0,-1,0],[0,0,0,0,0,0,0,0,0]],
    "solutionGrid":  [[6,5,7,4,9,1,2,8,3],[3,8,4,5,6,2,1,9,7],[2,1,9,7,8,3,5,4,6],[4,7,5,8,3,6,9,2,1],[9,6,1,2,7,5,4,3,8],[8,2,3,1,4,9,7,6,5],[1,4,6,3,2,7,8,5,9],[7,3,2,9,5,8,6,1,4],[5,9,8,6,1,4,3,7,2]],
    "difficulty": ["easy", "medium", "hard", "impossible"],
    "easy": [[-6,-5,-7,-4,-9,-1,-2,-8,-3],[-3,-8,-4,-5,-6,-2,-1,-9,-7],[-2,-1,-9,-7,-8,-3,-5,-4,-6],[-4,-7,-5,-8,-3,-6,-9,-2,-1],[-9,-6,-1,-2,-7,-5,-4,-3,-8],[-8,0,-3,0,-4,0,0,-6,-5],[-1,0,0,0,-2,0,-8,0,-9],[-7,0,-2,0,-5,0,-6,0,-4],[-5,0,0,0,0,-4,0,-7,0]],
}

function getSquare(row, col, level) {
	var request = new XMLHttpRequest();
    request.open("GET", "sudokuFunJSON.json", false);
    request.send(null);

    var xmldoc = request.responseText;
    var data = JSON.parse(xmldoc);

	if (level == 1)
    	return data["easyGrid"][row][col];
    else if (level == 2)
    	return data["mediumGrid"][row][col];
 	else if (level == 3)
    	return data["hardGrid"][row][col]; 
    else if (level == 4)
    	return data["impGrid"][row][col];
}

//track time of game being played
var second = 0;
var minute = 0;
var min = 0;
function timer() {
	//var second = 0;
	var minute = 0;
	if (second == 59)
	{
		minute += 1;
		second = 0;
		min += minute;
	}
	document.getElementById("timer").innerHTML = "Timer: " + min + ":" + (second++);
}

//end timer()

//check if all cell is filled and correct
function isGameover()
{
	var mySelect = document.getElementById("level");
    var level = mySelect.options[mySelect.selectedIndex].value;
	var input = [];
	var id = 0;
	var check = false;
	var value = [[],[],[],[],[],[],[],[],[]];

	//console.log("level " + level);
	if (level == 1) count = 20;
	else if (level == 2) count = 53;
	else if (level == 3) count = 67;
	else count = 72;
	//console.log("count " + count);


	if (level == 1)
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.easyGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}
	else if (level == 2 )
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.mediumGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}
	else if (level == 3 )
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.hardGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}
	else if (level == 4 )
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.impGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}

	for(var i = 0; i < 9; i++)
	{
		for (var j = 0; j < 9; j++)
		{
			if (value[i][j] == 0)
			{
				value[i][j] = document.getElementById("i" + id).value;
				//console.log("input " + value[i][j]);
				id++;
				check = true;
			}
			else 
			{
				value[i][j] = value[i][j];
				//console.log("grid " + value[i][j]);
				check = false;
			}
		}	
	}

	for (var i = 0; i < 9; i++)
	{
		for (j= 0; j< 9; j++)
		{
			if (value[i][j] == gameState.solutionGrid[i][j])
			{	
				//console.log("true  " + value[i][j]);
				check = true;
				//id++;
			}
			else {
				//console.log("false " + value[i][j]);
				check = false;
			}
		}
	}

	if (check == true)
	{
		alert("Great job! You win. You took " + min + " minutes and " + second + " seconds.");
	}
	else 
	{
			alert("Sorry! You lose. You took " + min + " minutes and " + second + " seconds.");
	}
	clearInterval(mytimer);
}
//end gameover

//allow only number input
function isValidDigit(input) {
	var num = parseInt(input);
	if (input >= 1)
		return true;
	else return false;
}

//see how user doing
function hint()
{
	var mySelect = document.getElementById("level");
    var level = mySelect.options[mySelect.selectedIndex].value;
	var input = [];
	var check = false;
	var value = [[],[],[],[],[],[],[],[],[]];
	var id = 0;
	var error = "";
	var check = true;
	if (level == 1)
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.easyGrid[i][j] * -1;
				console.log("easyGrid " + value[i][j]) + i;
			}
		}
	}
	else if (level == 2 )
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.mediumGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}
	else if (level == 3 )
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.hardGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}
	else if (level == 4 )
	{
		for (var i = 0; i < 9; i++)
		{
			for (var j = 0; j < 9; j++)
			{
				value[i][j] = gameState.impGrid[i][j] * -1;
				//console.log("value " + value[i][j]) + i;
			}
		}
	}

    for(var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
        	if (value[i][j] == 0)
			{
				value[i][j] = document.getElementById("i" + id).value * 1;
				
				console.log("value " + value[i][j]);
				id++;
				if(value[i][j] != 0)
            	{
            		if (value[i][j] != gameState.solutionGrid[i][j])
            		{
            			error += " row[" + i + "][" + j + "],";
            			check = false;
            		}
            	}
			}
        }
    }

    if (check == false)
    	alert("Incorrect at cell " + error);
    else alert("You're doing good!");
}

