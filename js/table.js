//document.getElementById("timeselect").addEventListener()


document.getElementById("dropdown").addEventListener("change", getIndex);

function myFunction() {
    console.log("this is a test");
}

function getIndex() {
	var tableContainer = document.getElementById("restaurantListTable");
	tableContainer.innerHTML = "";
	
    var selectDropDown = document.getElementById("dropdown");
	var userSelectTime = selectDropDown.options[selectDropDown.selectedIndex].text;
	console.log("this is a time selected "+ parseInt(userSelectTime));
	
	// check if SE is checked or not, if yes set the variable to "SE"
	var SEboxChecked = document.getElementById("cb0").checked;
	if (SEboxChecked == true){
		console.log("se is true");
		var SEboxTrue = "SE";
		console.log("SEboxTrue is "+ SEboxTrue);
	}
	
	// check if NE is checked or not, if yes set the variable to "NE"
	var NEboxChecked = document.getElementById("cb1").checked;
	if (NEboxChecked == true){
		console.log("ne is true");
		var NEboxTrue = "NE";
		console.log("NEboxTrue is "+ NEboxTrue);
	}
		console.log("this is ne box " + NEboxChecked);
	
	// check if SW is checked or not, if yes set the variable to "SW"
	var SWboxChecked = document.getElementById("cb2").checked;
	console.log("this is sw box " + SWboxChecked);
	if (SWboxChecked == true){
		console.log("sw is true");
		var SWboxTrue = "SW";
		console.log("SWboxTrue is "+ SWboxTrue);
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




