window.onload = function() {

	var worksheet;
	var myArray = [];
	var myParsed = {};
	var target = document.getElementById("list");
	var br = document.createElement("br");

	/* set up XMLHttpRequest */
	var url = "info.xlsx";
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(e) {
	  var arraybuffer = oReq.response;

	  /* convert data to binary string */
	  var data = new Uint8Array(arraybuffer);
	  var arr = new Array();
	  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
	  var bstr = arr.join("");

	  /* Call XLSX */
	  var workbook = XLSX.read(bstr, {type:"binary"});

	  /* DO SOMETHING WITH workbook HERE */
	  // console.log(workbook);

	  function to_json(workbook) {
	    var result = {};
	    workbook.SheetNames.forEach(function(sheetName) {
	        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	        if(roa.length > 0){
	            result[sheetName] = roa;
	        }
	    });
	    return result;
	  }

	  console.log(to_json(workbook));

	  // var sheet_name_list = workbook.SheetNames;
	 	// sheet_name_list.forEach(function(y) { /* iterate through sheets */
	  //   	worksheet = workbook.Sheets[y];
	  //   	for (z in worksheet) {
		 //        /* all keys that do not begin with "!" correspond to cell addresses */
		 //        if (z[0] === '!') continue;
		 //    	// console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
		 //    	myArray.push(JSON.stringify(worksheet[z]));
	  //    	} 
	 	// });

	 	// for (var j=0; j < myArray.length; j++) {
	 	// 	myParsed = JSON.parse(myArray[j]);
	 	// 	console.log(myParsed.v);
	 	// 	var text = document.createTextNode(myParsed.v);
	 	// 	target.appendChild(text);
	 	// 	target.appendChild(br); 
	 	// }

	 	// var name = JSON.parse(myArray[3]);
	 	// target.appendChild(name.v);
	 	// var nationality = JSON.parse(myArray[7]);
	 	// target.appendChild(nationality.v); 

	  }

	oReq.send();


};