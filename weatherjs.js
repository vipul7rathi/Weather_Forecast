function getdata()
{
	var city_name;
	var weather;
	city_name = document.getElementById("city").value;
	var apistart = "http://api.openweathermap.org/data/2.5/forecast?q=";
	var units = "&units=metric";
	var apkey = "&APPID=fdd1908dfdd36efbfff64c7bb3761f9e";
	var mod = "&mode=xml";
	var url = apistart + city_name + apkey + units + mod;
	console.log(url);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			myFunction(this);
		}
		else if(this.readyState == 4 && this.status == 404)
		{
			
			document.getElementById("info").innerHTML = "<br>Wrong Input";
		}
		else 
		{
		 document.getElementById("info").innerHTML = '<img src="'+ 'https://map.bloomsky.com/img/loading_boys.gif' + '"/>'; 
		 document.getElementById("info").innerHTML += "<br>Accessing Data";
		}	
	};
  xhttp.open("GET", url, true);
  xhttp.send();
}
function myFunction(xml) 
{
	var i;
	var xmlDoc = xml.responseXML;
	var table="<table><tr> <th>Date</th> <th>TIME</th>  <th>TEMPERATURE<br>(celsius)</th>  <th>HUMIDITY<br>(%)</th>";
		table+="<th>Cloudiness</th>  <th>Pressure (in hPa)</th> </tr>";
	var x = xmlDoc.getElementsByTagName("time");
	for (i = 0; i<x.length; i++)	  
	{ 
		timebegin = x[i].getAttribute('from');  						//date and time
		var array = timebegin.split("T");
		var date = array[0];
		var time = array[1];
		var hours = time.split(":");
		var hrs=hours[0];
		var session="A.M.";
		var array =date.split("-");
		var year =array[0];
		var month=array[1];
		var day=array[2];
		var newdate = day + "/" + month + "/" + year;
		
		if(hrs == 12){
			session="P.M.";
		}			
		else if(hrs > 12){
				session="P.M.";
				hrs=hrs-12;
			}
		var temp = x[i].getElementsByTagName("temperature");
		  for (j = 0; j < temp.length; j++) { 
				tempvalue = temp[j].getAttribute('value') ;
				}
		
		var humid = x[i].getElementsByTagName("humidity");
			for (j = 0; j < humid.length; j++) { 
				humidvalue = humid[j].getAttribute('value') ;
				}
		
		var pressure = x[i].getElementsByTagName("pressure");
			for (j = 0; j < pressure.length; j++) { 
				pressurevalue = pressure[j].getAttribute('value') ;
				}
		
		var cloud = x[i].getElementsByTagName("clouds");
			for (j = 0; j < cloud.length; j++) { 
				cloudvalue = cloud[j].getAttribute('value') ;
				}
		
		if(cloudvalue == "clear sky")
			{
					cloudvalue+='<i class="fas fa-circle"></i>';
			}
		else if(cloudvalue == "few clouds")
		{
			cloudvalue+='<i class="fas fa-cloud-sun"></i>';
		}
		else if(cloudvalue == "scattered clouds")
		{
			cloudvalue+='<i class="fas fa-cloud"></i>';
		}
		else if(cloudvalue == "overcast clouds" || cloudvalue == "broken clouds")
		{
			cloudvalue+='<i class="fas fa-cloud-showers-heavy"></i>';
		}
		else if(cloudvalue == "broken clouds") 
		{
			cloudvalue+='<i class="fas fa-clouds"></i>';
		}
		else if(cloudvalue == "shower rain")
		{
			cloudvalue+='<i class="fas fa-cloud-showers-heavy"></i>';
		}
		else if(cloudvalue == "rain")
		{
			cloudvalue+='<i class="fas fa-cloud-sun-rain"></i>';
		}
		else if(cloudvalue == "thunderstorm")
		{
			cloudvalue+='<i class="fas fa-thunderstorm"></i>';
		}
		else if(cloudvalue == "snow")
		{
			cloudvalue+='<i class="fas fa-snowflakes"></i>';
		}
		else if(cloudvalue == "mist")
		{
			cloudvalue+='<i class="fal fa-fog"></i>';
		}			
	table += "<tr><td>" + date + "</td><td>" + hrs + "&nbsp;" + session + "</td><td>" + tempvalue + "</td><td>" + humidvalue + "</td><td>" 
	table += cloudvalue + "</td><td>" + pressurevalue +"</td></tr>";
	}
	table+="</table>";
document.getElementById("info").innerHTML = table;
}