document.getElementById("dropdown").addEventListener("change", getIndex);

function getIndex() {
	var tableContainer = document.getElementById("restaurantListTable");
	tableContainer.innerHTML = "";
	
    var selectDropDown = document.getElementById("dropdown");
	var userSelectTime = selectDropDown.options[selectDropDown.selectedIndex].text;
	
	// check if SE is checked or not, if yes set the variable to "SE"
	var SEboxChecked = document.getElementById("cb0").checked;
	if (SEboxChecked == true){
		var SEboxTrue = "SE";
		var originalHotcakes = new brunchtracker("Original Hotcake House", "1002 SE Powell", "SE", "12:00 AM", "www.hotcakehouse.com/", 45.50114,  -122.65558,  'ChIJ7ctb9noKlVQRUDHDKivog2g');
		originalHotcakes.addInfo();
	}
	
	// check if NE is checked or not, if yes set the variable to "NE"
	var NEboxChecked = document.getElementById("cb1").checked;
	if (NEboxChecked == true){
		var NEboxTrue = "NE";
	}
			
	// check if SW is checked or not, if yes set the variable to "SW"
	var SWboxChecked = document.getElementById("cb2").checked;
	console.log("this is sw box " + SWboxChecked);
	if (SWboxChecked == true){
		var SWboxTrue = "SW";
	}

	// if SE is selected print out se restaurants
	for (var index = 0; index < brunchArr.length; index++) {
		//if (brunchArr[index].nhd == "SE" && parseInt(userSelectTime) > parseInt(brunchArr[index].opentime)) {
		if (brunchArr[index].nhd == SEboxTrue && parseInt(userSelectTime) >= parseInt(brunchArr[index].opentime)) {
			var currentRestaurant = brunchArr[index];
			currentRestaurant.addInfo();
		}
	}
	
	// if NE is selected print out ne restaurants
	for (var index = 0; index < brunchArr.length; index++) {
		//if (brunchArr[index].nhd == "SE" && parseInt(userSelectTime) > parseInt(brunchArr[index].opentime)) {
		if (brunchArr[index].nhd == NEboxTrue && parseInt(userSelectTime) >= parseInt(brunchArr[index].opentime)) {
			var currentRestaurant = brunchArr[index];
			currentRestaurant.addInfo();
		}
	}
	
	// if SW is selected print out sw restaurants
	for (var index = 0; index < brunchArr.length; index++) {
		//if (brunchArr[index].nhd == "SE" && parseInt(userSelectTime) > parseInt(brunchArr[index].opentime)) {
		if (brunchArr[index].nhd == SWboxTrue && parseInt(userSelectTime) >= parseInt(brunchArr[index].opentime)) {
			var currentRestaurant = brunchArr[index];
			currentRestaurant.addInfo();
		}
	}	
}




