const DEFAULT_GIF_PATH = "https://i.pinimg.com/originals/36/ee/50/36ee50b371a196a9d9af22ec8a8402bf.gif";
function changeGif(gifPath){
    const gifElemen = document.getElementById('current-gif');
    if(gifElemen){
        gifElemen.src = gifPath;
        gifElemen.alt =  "Anh dong:" + gifPath;
    }
    else{
        console.log('loi roi');
    }
}
document.addEventListener('DOMContentLoaded', (event)=>{
    console.log
})