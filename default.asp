<%EnableSessionState=False
host = Request.ServerVariables("HTTP_HOST")

if host = "weatherapp.vladimirchavez.com" or host = "www.weatherapp.vladimirchavez.com" then
response.redirect("https://weatherapp.vladimirchavez.com/")

else
 response.redirect("https://www.vladimirchavez.com/error.htm")

end if
%>