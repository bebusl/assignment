# 1. 과제 주제 설명
- 4주차에 배운 레이아웃 css를 활용하여 홈페이지의 레이아웃을 구성해 보는 것이 이번 과제의 주제입니다.
- 블로그 레이아웃을 만들어봤습니다.
  
  <br/>
# 2. 주요 코드 설명
![레이아웃](https://user-images.githubusercontent.com/49019236/96097836-63018400-0f0c-11eb-9707-19bd7086dc2d.png)
위와 같은 구성으로 레이아웃을 짜봤습니다.
## HTML 구조
``` 
HTML
html은 아래와 같이 구성했습니다.
    <header>
        <nav class="top-nav">...</nav>
        <div class="banner-box">...</div>
    </header>

    <div class="main">
        <section class="area-main">
            <article class="area-main-content">...</article>
            <article class="area-main-list">...</article>
        </section>

        <aside class="area-aside">
            <div class="area-aside-profile">...</div>
            <ulc lass="category">...</ul>
        </aside>
    </div>
```
## CSS 
### **header, content(.main), footer**
```
body{
    margin:0;
}

header{
    min-height: 10vh;
}

.main{
    min-height:80vh;    
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-end;
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
}

footer{
    min-height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    }

```
* 헤더, 콘텐츠(.main), 푸터는 모두 width가 100%이고 세로로 쌓이는 형태여서<br /> 따로 flex를 사용하지 않고 margin을 0으로 준 후 각자 크기를 적정하게 지정해 주었습니다.<br />
* 컨텐츠 영역은 내부에서 크게 두 영역으로 나뉘는데, 이를 좌 우로 배치하기 위해 .main은 display를 flex로 설정하고 flex-direction을 row로 변경해주었습니다.
* 푸터에서는 display:flex 에 justify-content:center; align-items:center;값을 주어 푸터의 문구를 푸터영역의 정중앙에 표시하게 했습니다.
  
### ** 헤더영역 ( nav, banner)**
```
.top-nav{
    background-color: black;
    height:4em;
    display: flex;
    align-items: center;
}

.top-nav ul:after{
    content:'';
    display:block;
    clear:both;
}

.banner-box{
    width:100vw;
    height:350px;
    background-size : cover;
    z-index: 11;
}
```
* 헤더는 내비게이션영역과 배너 영역으로 나뉘는데, 위에서 아래로 쌓이는 형식이여서 두 영역은 그냥 높이를 지정해주고 끝냈습니다.
* 내비게이션 영역에서는 리스트로 메뉴를 구현했는데 이 때 리스트들이 떠있는 높이를 중앙으로 맞추기 위해 .top-nav에서 display로 flex를 주고 align-items:center로 높이를 맞춰주었습니다.
<hr />

### **컨텐츠영역(section, aside)**

```
.area-main{
    max-width: 640px;
    width:100%;
    padding:0 30px;
}


.area-aside{
    width:300px;
    margin: 32px 0 0 80px;
}
```
* section으로는 좀 더 큰 메인 영역(.area-main)을 만들어 콘텐츠 영역의 왼쪽에 배치하고 aside로는 서브 영역(.area-aside)으로 오른쪽에 배치했습니다.
    ### **세부영역**
  * 메인 영역, 서브 영역 모두 다시 2영역으로 나뉘는데, 여기서 리스트태그를 이용해 이미지 , 카테고리 메뉴 등을 표현했습니다. 이 때 배치를 쉽게하기 위해 display:flex 속성을 주어 적절히 배치했습니다. 너무 세세한 영역이라서 코드는 생략했습니다. css에 어떤 부분인지 주석을 달아두었습니다.
* .main에서 이미 flex속성으로 위치는 배치해주었기 때문에 크기와 패딩/마진만 적절히 지정해 주었습니다. 


<hr/>

# 3. 비고 및 고찰 
- 플렉스 속성을 상위 태그에 넣어야 하는데 가끔 배치하고 싶은 태그의 스타일 속성에 넣는 실수를 해서 flex속성이 활성화되지 않아 조금 애먹었습니다. flex를 사용할 때는 어떤 태그에 속성을 넣어야 하는지 한번더 생각하고 입력해야 할 것 같습니다. 또, flex를 적용하고자 할 때는 잊지말고 배치하고자 하는 요소들을 감싸는 wrap요소를 만드는 것이 중요한 것 같습니다.

<br />

- 리스트에서 제목, 내용, 기타내용을 입력했을 때 각각 클래스를 부여하기 보다는 nth-child 선택자를 잘 사용하면 좋을 것 같습니다. 원래는 모두 class를 부여했었는데 html문서가 너무 복잡해 보여 css에서 nth-child선택자를 사용하니 html문서가 좀 더 깔끔해보이는 것 같습니다.

<br />

- 비교적 간단한 레이아웃에서 flex를 많이 쓰고 좀 더 복잡한 레이아웃에서는 grid를 쓴다고 알고 있는데 다음에는 grid 레이아웃도 실습해 보면 좋을 것 같습니다.
