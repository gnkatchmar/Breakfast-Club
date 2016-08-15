//document.getElementById("timeselect").addEventListener()


document.getElementById("dropdown").addEventListener("change", getIndex);

function myFunction() {
    console.log("this is a test");
}

function getIndex() {
    var selectDropDown = document.getElementById("dropdown");
	var userSelectTime = selectDropDown.options[selectDropDown.selectedIndex].text;
	console.log("this is a time selected "+ parseInt(userSelectTime));
	
	for (var index = 0; index < brunchArr.length; index++) {
		if (brunchArr[index].nhd == "SE" && parseInt(userSelectTime) > parseInt(brunchArr[index].opentime)) {
		var currentRestaurant = brunchArr[index];
		currentRestaurant.addInfo();
		}
		
	}	
}

//var e = document.getElementById("ddlViewBy");
//var strUser = e.options[e.selectedIndex].text;

/*
for (var index = 0; index < brunchArr.length; index++) {
	if (brunchArr[index].nhd == "SE" && brunchArr[index].opentime == "7:00 AM")	 {
		var currentRestaurant = brunchArr[index];
		currentRestaurant.addInfo();
	}
}
*/

/*
for (var index = 0; index < brunchArr.length; index++) {
	var currentRestaurant = brunchArr[index];
	currentRestaurant.addInfo();
}
*/

/*

for (var index = 0; index < stores.length; index++) {
  var currentStore = stores[index];
  currentStore.cookieRandomHourlySales();
  currentStore.addInfo();
}
*/
/*
this.addInfo = function() {
     		var locationRow = document.createElement("tr");
			var nameCell = document.createElement("td");//
			nameCell.innerText = this.name;
			locationRow.appendChild(nameCell);
			
			for (var i=0; i < 8; i++){
				var cookieCell = document.createElement("td");
				cookieCell.innerText = this.hourlyCookiesSales[i];
				locationRow.appendChild(cookieCell);
			}
			
			var totalCell = document.createElement("td");
			totalCell.innerText = this.total;
			locationRow.appendChild(totalCell);
			
			var table = document.getElementById("locations");
			table.appendChild(locationRow);
	};
*/	