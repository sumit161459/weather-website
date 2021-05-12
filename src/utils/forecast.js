const request=require('request');

forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=77eb2ceac28bbeb241d26f28af6e4a4e&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f';
    request({url,json:true},(err,{body}={})=>{
        if(err){
            callback('check out connection')
        }else if(body.error){
            console.log('check your url');
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. The temperature is ${body.current.temperature}. The temperature feels like ${body.current.feelslike}`);
        }
    })
}

module.exports=forecast;