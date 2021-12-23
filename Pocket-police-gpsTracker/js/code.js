let startAddress=document.getElementsByClassName("address");
let startTime=document.getElementsByClassName("clock");
let changeUserName=document.getElementById("navtitle");
let changeUserName_m=document.getElementById("notification");
let onCnt=true;
const container = document.getElementById("map");
const options={
    center: new kakao.maps.LatLng(36.629221, 127.456285),
    level:3
};
//36.629173, 127.456339
try{
changeUserName.innerHTML=`${name}님의 이동경로`;}
catch(e){console.log("여기 모바일임")}

try{changeUserName_m.innerHTML=`${name}님의 이동경로`;
}catch(e){
    console.log("여기 피씨임");
}
let map=new kakao.maps.Map(container,options);
let firstPath=[];
let linePath=[];
let time=[];
let firstTime=[];
let tmpCnt=0;

var geocoder = new kakao.maps.services.Geocoder();


var presentSet = function(result,status){
    if(status === kakao.maps.services.Status.OK){
        //console.log(result[0].address.address_name);
        startAddress[2].innerHTML=result[0].address.address_name;
        startTime[2].innerHTML=time[time.length-1];
        //console.log("성공");
    }
}//현재 위치 밑에 있는 주소랑 시간 실시간 반영


//날짜 구하기
let today=new Date();
let dayCheck=`${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`;
var id=database.ref('GPS/'+uid+'/'+dayCheck);
id.on('value',function(snapshot){
    console.log("변화감지");
    tmpCnt=0;
    console.log(snapshot.val())
    for(var i in snapshot.val()){
        if(tmpCnt<linePath.length-1){
            console.log(tmpCnt,linePath.length-1);
            tmpCnt++;
            continue;
        }
        console.log(tmpCnt);
        var childKey=snapshot.child(`GPS/${uid}/${dayCheck}/${i}`).key;
        console.log(childKey);
        database.ref(`GPS/${uid}/${dayCheck}/${i}`).once('value').then(function(snapshot){
            toMap(Object.values(snapshot.val())[0],Object.keys(snapshot.val())[0]);
            geocoder.coord2Address(linePath[linePath.length-1].getLng(), linePath[linePath.length-1].getLat(), presentSet);

        });
        tmpCnt++;
    }
    setTimeout(function(){markerNew();},500);
    if(onCnt==true){
        setTimeout(function(){
            console.log(linePath);
            geocoder.coord2Address(linePath[0].getLng(),linePath[0].getLat(),function(result,status){
                if(status === kakao.maps.services.Status.OK){
                    startAddress[0].innerHTML=result[0].address.address_name;
                    startTime[0].innerHTML=time[0];
                }
            });
            geocoder.coord2Address(linePath[linePath.length-1].getLng(), linePath[linePath.length-1].getLat(), function(result,status){
                if(status === kakao.maps.services.Status.OK){
                    startAddress[1].innerHTML=result[0].address.address_name;
                    startTime[1].innerHTML=time[time.length-1];
                }
            });
            markerInit();
            onCnt=false;
        },1000);
    }


});



function toMap(lat,t){ 
    var a=lat.split(',');
    var b=a[0]*1;
    var c=a[1]*1;
    //console.log(b,c);
    linePath.push(new kakao.maps.LatLng(b,c));
   /*var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeiSght: 6, // 선의 두께 입니다
        strokeColor: '#ff0000', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });*/
    time.push(t);
    var polyline=new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 6, // 선의 두께 입니다
        strokeColor: '#ff0000', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    })
    //console.log(polyline.getMap());
    polyline.setMap(map);
    //console.log(polyline.getPath());
    map.setCenter(linePath[linePath.length-1]);
    //console.log(map.getCenter());
    //새로 들어올 때 마다 실행되는함수
}


function toFirstMap(lat,t){
    var a=lat.split(',');
    var b=a[0]*1;
    var c=a[1]*1;
    //console.log(b,c);
    firstPath.push(new kakao.maps.LatLng(b,c));
    var polyline=new kakao.maps.Polyline({
        path: firstPath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 6, // 선의 두께 입니다
        strokeColor: '#ff0000', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    })
    //console.log(polyline.getMap());
    polyline.setMap(map);
    firstTime.push(t);
    //console.log(polyline.getPath());
    map.setCenter(firstPath[firstPath.length-1]);
    //console.log(map.getCenter());
}

//새로 들어올 때 마다 polyline에는 위도경도 저장되고 time에는 저장된 시각 저장됨
//출발 시간은 time[0],linePath[0]일 때
//



