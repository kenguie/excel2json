$(document).ready(function() {

	function parseExcel() {
		// var workbook;  // when i try to make this a declared global var, it fails
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
		  workbook = XLSX.read(bstr, {type:"binary"});  // want this to be a global var but doesnt seem to work

		  /* DO SOMETHING WITH workbook HERE */

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

		  // So I want to split this into a function of it's own but it seems jquery and workbook can't be accessed outside this .onload function
			(function output() {  
				var short = workbook.Sheets.Sheet1;
			  $("#name").append(short.B3.v);
			  $("#class").append(short.B8.v);
			  $("#height").append(short.B9.v);
			  $("#weight").append(short.B10.v);
			  $("#gym").append(short.B11.v);
			  $("#bday").append(short.B15.v);
			  $("#age").append(short.B16.v);
			  $("#country").append(short.B6.v);
			  $("#nickname").append(short.B17.v);
			  $("#stance").append(short.B18.v);
			  $("#reach").append(short.B19.v);
			  $("#discipline").append(short.B20.v);
			  $("#promotor").append(short.B23.v);
			  $("#wins").append(short.B29.v);
			  $("#losses").append(short.B30.v);
			  $("#draws").append(short.B31.v);
			  $("#tko").append(short.B32.v);
			  $("#submission").append(short.B33.v);
			})();
		}

		oReq.send();
	}

	parseExcel();

}); 






