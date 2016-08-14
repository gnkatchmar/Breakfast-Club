

for (var index = 0; index < brunchArr.length; index++) {
	var currentRestaurant = brunchArr[index];
	currentRestaurant.addInfo();
}


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