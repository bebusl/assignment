let returnValue=[];
let temp;
let uid;
let name;

console.log("firebase 시작");
var firebaseConfig = {
   apiKey: "AIzaSyB31xXsVd5yDwyxUgg-44vCHRMFooD8Ego",
   authDomain: "pocketpolice-74e0c.firebaseapp.com",
   databaseURL: "https://pocketpolice-74e0c.firebaseio.com",
   projectId: "pocketpolice-74e0c",
   storageBucket: "pocketpolice-74e0c.appspot.com",
   messagingSenderId: "329620828310",
   appId: "1:329620828310:web:30ff13107464026b69d2b7",
   measurementId: "G-CQX2JSL0CG"
 };
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();




function getParser(paramName,paramUserId){
    returnValue=[];
    let url=location.href;
    console.log(url);
    let parameters=(url.slice(url.indexOf('?')+1,url.length)).split('&');
    console.log(parameters);
    for (let i=0;i<parameters.length;i++){
        var varName=parameters[i].split('=')[0];
        console.log(varName);
        if(varName.toUpperCase()==paramName.toUpperCase()){
            temp=parameters[i].split('=')[1];
            console.log(temp);
            returnValue.push(decodeURIComponent(temp)); 
        }
        if(varName.toUpperCase()==paramUserId.toUpperCase()){
            temp=parameters[i].split('=')[1];
            console.log(temp);
            returnValue.push(decodeURIComponent(temp)); 
        }
    }
    if(returnValue.length==2){
        return true;
    }
    return false;
}


function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//파라미터 제대로 안건내줬을 때 잘못된 페이지로 넘기기 위해서 만든 함수
function checkId(){//name이랑 uid랑 맞나 확인!
    var urlcheck=getParser('name','uid');
    if (urlcheck==false){
        return false;
    }//url체크했을 때 파라미터 2개 아니거나 없으면 불량이므로 false반환해서 WrongPage열도록 해줌
    uid=returnValue[0];
    name=returnValue[1];//파라미터 입력할 땐 uid id순으로 넣게하기
    console.log(uid,name);
    var checkId_=database.ref('Users/'+name);
    checkId_.once('value').then(function(snapshot){
        if(uid==snapshot.val().uid){
            return true;
        }
        return false;
    //for(var i in snapshot.val()){
        /*var childKey=snapshot.child(`Users/${name}/${uid}`).key;
        database.ref(`Users/${name}/${uid}`).once('value').then(function(snapshot){
        toMap(Object.values(snapshot.val())[0],Object.keys(snapshot.val())[0]);//경로 배열에 넣어주고, 이동 경로 표시해주는 함수
        console.log("HELLO");
                console.log(linePath[linePath.length-1].getLng(),linePath[linePath.length-1].getLat());
                geocoder.coord2Address(linePath[linePath.length-1].getLng(), linePath[linePath.length-1].getLat(), presentSet);
                geocoder.coord2Address(linePath[0].getLng(),linePath[0].getLat(),function(result,status){
                    if(status === kakao.maps.services.Status.OK){
                        startAddress[0].innerHTML=result[0].address.address_name;
                        startTime[0].innerHTML=time[0];
                }
            });
            

        });*/
    //    console.log("몇번쨰? :", i);
   //}
});


}

function init(){
    if(checkId()==false){
    window.location.replace("http://www.brillbe.kro.kr:8080/WrongPage.html");
    }
    else if(isMobile()==true&&location.href!=`http://www.brillbe.kro.kr:8080/mobile.html?uid=${uid}&name=${name}`){
    window.location.replace(`http://www.brillbe.kro.kr:8080/mobile.html?uid=${uid}&name=${name}`);
    }
}

init();
