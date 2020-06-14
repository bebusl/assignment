const share=document.getElementById('share');
const set=document.getElementById('set');
const canBtn=document.getElementById('cancleBtn');

function handleClick(){
    set.classList.toggle('off');
}


function init(){
    share.addEventListener("click",handleClick);
    canBtn.addEventListener("click",handleClick);

}



init();
