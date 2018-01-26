$(document).ready(function(){
    $("#ok").click(function(){
        var city=$("#city").val();
        var code=$("#code").val();
        if(city.length>1){
            var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
            urllink=urllink+city;
                
        if(code.length==2){
            urllink=urllink+','+code;
        }
        urllink=urllink+'&appid=2fa5453653013b40d0b014222bcba483';
        console.log(urllink);
        $.ajax({
            url:urllink,
            data: {format: 'json'}
               ,
            error : function(){
                $('#content').html("Error");
            },
            dataType: 'json',
            success : function(data){
                console.log('temp: '+data.main.temp);
                console.log('desc: '+data.weather[0].description);
                $('#content').empty();
                var table=$('<table/>');
                table.attr('id', 'cont');
                var tr=getLine('City',city);
                table.append(tr);
                
                tr=getLine("Temperature", Math.floor(data.main.temp-273.15));
                table.append(tr);
                
                tr=getLine("Humidity", data.main.humidity);
                table.append(tr);
                
                tr=getLine("Description", data.weather[0].description);
                table.append(tr);
                
                tr=getLine("Pressure", data.main.pressure);
                table.append(tr);
                
                if($("#details").is(':checked')){
                    
                    var rise=new Date(data.sys.sunrise*1000);
                    var set=new Date(data.sys.sunset*1000);
                    
                tr=getLine("Sunrise", new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
                table.append(tr);
                
                tr=getLine("Sunset", new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
                table.append(tr);
                
                tr=getLine("Wind", data.wind.speed+' km/h');
                table.append(tr);
                
                tr=getLine("Min temperature", Math.floor(data.main.temp_min));
                table.append(tr);
                
                tr=getLine("Max temperature", Math.floor(data.main.temp_max));
                table.append(tr);
                
                tr=getLine("Visibility", data.visibility);
                table.append(tr);
                    
                tr=getLine("Link on Google Maps","<a href=\"https://google.com/maps/search/?api=1&query="+data.coord.lat+","+data.coord.lon+"\" target=\"blank\">"+city+"</a>");
                table.append(tr);
                    
                    
                
                
                
                }
                
                $('#content').append(table);
                
            },
            type: 'GET'
               });
    
    }
    });
    
    function getLine(data1,data2){
        var tr=$("<tr/>");
        var td1=$("<td/>");
        $(td1).append(data1);
        var td2=$("<td/>");
        $(td2).append(data2);
        tr.append(td1);
        tr.append(td2);
        return tr;
    }
    
});