var positions = [
 
];

let lastcnt=0;
let cnt;


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

