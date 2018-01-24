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
                
            },
            dataType: 'json',
            success : function(data){
                console.log('temp: '+data.main.temp);
                console.log('desc: '+data.weather[0].description);
            },
            type: 'GET'
               });
    
    }
    });
});