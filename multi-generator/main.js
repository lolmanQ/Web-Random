
function getUserInput(){
	this.rowValue = document.getElementById("textRow").value;
	this.columValue = document.getElementById("textColum").value;
	this.rowLengthValue = document.getElementById("textRowLength").value;
	this.colomLengthValue = document.getElementById("textColumLength").value;
	if(this.rowLengthValue != ""){
		this.rowLengthValue = parseInt(this.rowLengthValue);
	}
	else{
		this.rowLengthValue = 10;
	}
	if(this.colomLengthValue != ""){
		this.colomLengthValue = parseInt(this.colomLengthValue);
	}
	else{
		this.colomLengthValue = 10;
	}
	this.colomLengthValue++;
	this.rowLengthValue++;

	generateTable(this.rowValue, this.columValue, this.rowLengthValue, this.colomLengthValue);
}

function generateTable(rows, coloms, rowLength, colomLength){
	if(rows != ""){
		rows = parseInt(rows);
	}
	else{
		rows = 1;
	}
	if(coloms != ""){
		coloms = parseInt(coloms);
	}
	else{
		coloms = 1;
	}
	rows--;
	coloms--;

	this.table = document.getElementById("t01");

	for(rI = rows; rI < rows + rowLength; rI++){
		this.rowElement = document.createElement("tr");
		this.thState = false;
		if(rI != rows){
			for(cI = coloms; cI < coloms + colomLength; cI++){
				if(!thState){
					this.colomElement = document.createElement("th");
					this.colomTextNode = document.createTextNode(rI);
					this.colomElement.appendChild(this.colomTextNode);
					this.thState = true;
				}
				else{
					this.colomElement = document.createElement("td");
					this.colomTextNode = document.createTextNode(rI * cI);
					this.colomElement.appendChild(this.colomTextNode);
				}
				this.rowElement.appendChild(this.colomElement);
			}
		}
		else{
			for(cI = coloms; cI < coloms + colomLength; cI++){
				if(!this.thState){
					this.colomElement = document.createElement("th");
					this.colomTextNode = document.createTextNode("Multi");
					this.colomElement.appendChild(colomTextNode);
					this.thState = true;
				}
				else{
					this.colomElement = document.createElement("th");
					this.colomTextNode = document.createTextNode(cI);
					this.colomElement.appendChild(this.colomTextNode);
				}
				this.rowElement.appendChild(this.colomElement);
			}
		}
		this.table.appendChild(rowElement);
	}
}
