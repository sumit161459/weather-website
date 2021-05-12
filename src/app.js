const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const geoCode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sumit'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        help:'This is some helpful text',
        name:'Sumit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sumit'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            console.log(place_name);
            console.log(forecastData);
            res.send({
                forecast:forecastData,
                address:req.query.address,
                location:place_name
            });
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormsg:'help article not found',
        title:'error',
        name:'Sumit'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormsg:'error 404 page not found',
        title:'error',
        name:'Sumit'
    })
})

app.listen(3000,()=>{
    console.log('server is running');
})