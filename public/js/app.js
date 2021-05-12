console.log('client side running');

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
let message1=document.querySelector('#message-1')
let message2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message1.textContent='Loading!!!'
    message2.textContent=''
    const location=search.value;
    fetch('/weather?address='+location).then(response=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                message1.textContent=data.error;
            }
            else{
                message2.textContent=data.forecast;
                message1.textContent=data.location;
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    })
})

