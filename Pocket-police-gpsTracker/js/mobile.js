const set=document.getElementById('set');
const canBtn=document.getElementById('cancleBtn');
const shareM=document.getElementById('shareBtnMobile')


function handleClick(){
    set.classList.toggle('off');
}


function init(){
    shareM.addEventListener("click",handleClick);
    canBtn.addEventListener("click",handleClick);
}



init();
