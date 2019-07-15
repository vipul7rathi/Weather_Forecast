function display_c()
{
var refresh=1000; 
mytime=setTimeout('timer()',refresh);
}

function timer()
{
var today = new Date();
var min = today.getMinutes();;
var hour = today.getHours();
var session="AM";
var hr = hour;
	if(min<10){
		min = "0"+min;
	}
	if(hour == 12)
	{
			session="PM";
	}			
	else if(hour > 12){
	session="PM";
	hr=hour-12;
	}
document.getElementById("date").innerHTML = "Time is "+ hr + " : " + min + " " + session;
display_c(); 
}
