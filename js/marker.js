var positions = [
 
];

let lastcnt=0;
let cnt;

/*setInterval(function(){
    cnt=linePath.length-1;
    if(cnt!=lastcnt){//처음에만 출발/ 중간점 marker표시!
    positions.push({title:'출발',latlng:linePath[0]});

    positions.push({title:'현재',latlng:linePath[cnt]});
    lastcnt=cnt;
    }

// 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
}},3000);
*/
var remember=[];

function markerNew(){
    for (var i = 0; i < remember.length; i++) {
        remember[i].setMap(null);
    }   
    var lastMarker="presentmarker.png",
    markersize=new kakao.maps.Size(35,35),
    lastImg=new kakao.maps.MarkerImage(lastMarker,markersize);
    console.log
    var setDefault=new kakao.maps.Marker({
        map:map,
        position:linePath[linePath.length-1],
        title:'현재',
        image:lastImg
    });
    remember.push(setDefault);
    setDefault.setMap(map);
}

function markerInit(){
    var defaultMarker="marker.png",
    defaultMarkerSize=new kakao.maps.Size(35,35),
    defaultMarkerImg=new kakao.maps.MarkerImage(defaultMarker,defaultMarkerSize);

    positions.push({title:'출발',latlng:linePath[0]});
    positions.push({title:'신고',latlng:linePath[linePath.length-1]});//중간, 처음꺼만 일단 저장해놈.
    for(var i =0;i<2;i++){
    var setDefault=new kakao.maps.Marker({
        map:map,
        position:positions[i].latlng,
        title:positions[i].title,
        image:defaultMarkerImg
    });
    }
    console.log(setDefault);
    setDefault.setMap(map);
}