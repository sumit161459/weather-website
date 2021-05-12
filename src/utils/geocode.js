const request=require('request');

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3JhajE2MTQiLCJhIjoiY2tvaW8zNWNwMG1jaTJvanppcTdvazFvdyJ9.hhrzUqbN6EM2nCOa0h9cVw&limit=1';
    request({url,json:true},(err,{body}={})=>{
        if(err){
            callback('check out connection')
        }else if(!body.features.length){
            callback('check your url');
        }else{
            const latitude=body.features[0].center[1];
            const longitude=body.features[0].center[0];
            const place_name=body.features[0].place_name;
            // console.log(latitude,longitude);
            callback(undefined,{latitude,longitude,place_name})
        }
    
    })
}

module.exports=geoCode