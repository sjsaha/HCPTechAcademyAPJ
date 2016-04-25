/**
 * 
 */


function showCustomer(customer,salesarea) {
  var xhttp;    
  if (customer == "") {
    //document.getElementById("txtHint").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      //document.getElementById("txtHint").innerHTML = xhttp.responseText;
      jsonresponse(xhttp.responseText);
    }
  }
  xhttp.open("GET", "rest/v1/so.svc/salesorder/" + customer + "/" + salesarea, true);
  xhttp.send();
}

function jsonresponse(response) {
	var x = response.replace(/([\S]+)\: /g,'"$1": ')
	//document.getElementById("id01").innerHTML = x;
    var so = JSON.parse(x)["SALES_ORDERS"];
    
    var i;
    var out = "<table>";

    for(i = 0; i < so.length; i++) {
    	out += "<tr>"
    	if (i===0) {
	    	for (var column in so[0]) {
	    		out += "<th>" + column + "</th>";
	    	}
	    	out += "</tr><tr>"
    	}
    	for (var column in so[i]) {
    		out += "<td>" + so[i][column] + "</td>";
    	}
    	out += "</tr>";
    }
    out += "</table>";
    document.getElementById("tableoutput").innerHTML = out;
}