export const basicCollection = {
	url: "basic",
	name: "기초유형",
	areas: [
		{
			url: "data-structure",
			name: "자료구조",
			skills: [
				{
					svg_name: "stack",
					name: "스택",
					category: 0,
					description: {
						text: "LIFO(Last In First Out)형 자료구조, 접근이 항상 목록 끝에서 일어난다.",
						links_0: [
							["위키백과 - 스택", "https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%83%9D"],
							["자료구조 : 스택 설명", "https://blog.naver.com/justkukaro/220503515118"],
						],
					},
					skills: [
						{
							svg_name: "example",
							name: "Example1",
							category: 0,
							description: {
								text: "언어 및 자료형 별로 스택을 구현한 예제",
								links_0: [
									["Java로 스택 구현", "https://gmlwjd9405.github.io/2018/08/03/data-structure-stack.html"],
									["Python으로 스택 구현", "https://wayhome25.github.io/cs/2017/04/18/cs-20/"],
									["C++ STL 스택 기본 사용법과 예제", "https://twpower.github.io/75-how-to-use-stack-in-cpp"],
								],
							},
						},
					]

				},
				{
					svg_name: "queue",
					name: "큐",
					category: 0,
					description:{
						text: "FIFO(First In First Out)형 자료구조, 먼저 들어간 데이터가 먼저 나오는 형태다.",
						links_0: [
							["위키백과 - 큐","https://ko.wikipedia.org/wiki/%ED%81%90_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)"],
							["Python Queue 3.7.8 docs","https://docs.python.org/ko/3.7/library/queue.html"],
						]
					},
					skills: [
						{
							svg_name: "example",
							name: "Example2",
							category: 0,
							description: {
								text: "언어 및 자료형 별로 큐를 구현한 예제",
								links_0: [
									["C/C++ 큐 예제", "https://m.blog.naver.com/PostView.nhn?blogId=fewus28&logNo=221010697277&proxyReferer=https:%2F%2Fwww.google.com%2F"],
									["JAVA 큐 예제", "https://pridiot.tistory.com/68"],
									["Python 큐 예제", "https://www.daleseo.com/python-queue/"],
								]
							},
						},
					]
				},
				{
					svg_name: "tree",
					name: "트리",
					category: 0,
					description:{
						text: "그래프의 일종으로, 여러 노드가 한 노드를 가리킬 수 없는 구조",
						links_0: [
							["위키백과 - 트리","https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC_%EA%B5%AC%EC%A1%B0"],
							["wikipedia - Tree structure","https://en.wikipedia.org/wiki/Tree_structure"]

						]
					},
					skills: [
						{
							svg_name: "example",
							name: "Example3",
							category: 0,
							description: {
								text: "언어 및 자료형 별로 트리를 구현한 예제",
								links_0: [
									["대표적인 자료구조: 트리", "https://www.fun-coding.org/Chapter10-tree.html"],
									["자바로 Tree 구현하기", "https://ktko.tistory.com/entry/%EC%9E%90%EB%B0%94%EB%A1%9C-Tree-%EC%84%A0%ED%9A%8C-%EC%BD%94%EB%93%9C%EC%A7%9C%EA%B8%B0s"],
									["C++ 포인터를 이용한 트리 구현", "https://xtar.tistory.com/39"],
								]
							},
						},
					]
				},
				{
					svg_name: "quiz",
					name: "Quiz",
					category: 1,
					description:{
						text: "",
						links_1: [
							["백준 1068번 - 트리","https://www.acmicpc.net/problem/1068"],
							["백준 10828번 - 스택","https://www.acmicpc.net/problem/10828"],
							["백준 10845번 - 큐","https://www.acmicpc.net/problem/10845"]

						],
						links_2:[
							["백준 1298번 - 트리의 가중치","https://www.acmicpc.net/problem/1289"],
							["백준 3425번 - 고스택","https://www.acmicpc.net/problem/3425"]

						],
						links_3:[
							["백준 2250번 - 트리의 높이와 너비","https://www.acmicpc.net/problem/2250"]
						],
					},
				},                     
            ]
        },{
			url: "sorting",
			name: "정렬",
			skills: [
				{
					svg_name: "definition",
					name: "정의",
					category: 0,
					description: {
						text: "n개의 수가 주어졌을 때, 사용자가 지정한 조건에 따라 정렬하는 알고리즘",
						links_0: [
							["기본 정렬 알고리즘 요약정리", "https://hsp1116.tistory.com/33"],
							["15 Sorting Algorithms in 6 Minute", "https://www.youtube.com/watch?v=kPRA0W1kECg&feature=emb_title"],
						]
					}
				}, 
				{
					svg_name: "example",
					name: "Example4",
					category: 0,
					description: {
						text: "정렬 알고리즘의 종류별 예제이다. 기본적으로 python의 경우 sort()라는 메소드가 있다.",
						links_0: [
						]
					},
					skills: [
						{
							svg_name: "O(n²)",
							name: "O(n²)",
							category: 0,
							description: {
								text: "수행 방식이 단순하지만, 시간이 비교적 오래걸리는 정렬이다.",
								links_0: [
								]
							},
							skills: [
								{
									svg_name: "bubble",
									name: "버블정렬",
									category: 0,
									description: {
									text: "거품이 올라오는 것 처럼, 앞에서부터 두 수를 마지막까지 비교하면서 큰 수가 뒤로오는 정렬",
									links_0: [
										["포크댄스로 보는 버블정렬", "https://www.youtube.com/watch?v=lyZQPjUT5B4&feature=emb_title"],
										["C/C++로 보는 버블정렬", "https://gmlwjd9405.github.io/2018/05/06/algorithm-bubble-sort.html"],
										["버블정렬 예제 - Java", "https://dpdpwl.tistory.com/14"],
									]
									},
								},
								{
									svg_name: "select",
									name: "선택정렬",
									category: 0,
									description: {
									text: "첫 번째부터 마지막까지 훑어서, 가장 작은 수부터 정렬하는 방식",
									links_0: [
										["포크댄스로 보는 선택정렬", "https://www.youtube.com/watch?v=ROalU379l3U&feature=emb_title"],
										["선택정렬 이란 - C/C++", "https://gmlwjd9405.github.io/2018/05/06/algorithm-selection-sort.html"],
										["선택정렬 - Java", "https://hahahoho5915.tistory.com/7"],
									]
									},
								},
								{
									svg_name: "insert",
									name: "삽입정렬",
									category: 0,
									description: {
									text: "n 번째 원소를 n-1번째 원소부터 1번째 원소까지 비교하며 삽입하는 정렬",
									links_0: [
										["포크댄스로 보는 삽입정렬", "https://www.youtube.com/watch?v=ROalU379l3U&feature=emb_title"],
										["삽입정렬 이란 - C/C++", "https://gmlwjd9405.github.io/2018/05/06/algorithm-insertion-sort.html"],
										["삽입정렬 - Java", "https://marobiana.tistory.com/85"],
									]
									},
								},
							]
						},
						{
							svg_name: "O(nlogn)",
							name: "O(n log n)",
							category: 0,
							description: {
								text: "수행 방식이 O(n²)에 비해 복잡하지만, 수행시간이 빠르다.",
								links_0:[
								]
							},
							skills: [
								{
									svg_name: "quick",
									name: "퀵정렬",
									category: 0,
									description: {
									text: "한 원소를 기준(pivot)으로 잡아, 기준보다 작으면 앞으로, 크면 뒤로 보내는 정렬이다. 최악의 경우 O(n²)도 나온다.",
									links_0: [
										["포크댄스로 보는 퀵정렬", "https://www.youtube.com/watch?v=ywWBy6J5gz8&feature=emb_title"],
										["퀵 정렬 with JAVA", "https://heekim0719.tistory.com/282"],
										["퀵 정렬 알고리즘(C++)", "https://dpdpwl.tistory.com/46"],
									]
									},
								},
								{
									svg_name: "heap",
									name: "힙정렬",
									category: 0,
									description: {
									text: "원소를 모두 힙에 삽입해, 힙의 루트에 있는 값은 남은 수들 중에서 최솟값을 출력하고 힙에서 제거하는 방식",
									links_0: [
										["포크댄스로 보는 힙정렬", "https://www.youtube.com/watch?v=Xw2D9aJRBY4&feature=emb_title"],
										["힙 구현 - Java", "https://hongku.tistory.com/166"],
										["C/C++에서 힙 구현하기", "https://hongku.tistory.com/154"],
									]
									},
								},
								{
									svg_name: "merge",
									name: "병합정렬",
									category: 0,
									description: {
										text: "원소를 모두 1개로 쪼개서 자른 순서의 역순으로 크기를 비교해 붙이는 방식",
										links_0: [
											["포크댄스로 보는 병합정렬", "https://www.youtube.com/watch?v=XaqR3G_NVoo&feature=emb_title"],
											["Java로 구현하는 쉬운 Merge Sort", "https://yunmap.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Java%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-%EC%89%AC%EC%9A%B4-Merge-Sort-%EB%B3%91%ED%95%A9-%EC%A0%95%EB%A0%AC-%ED%95%A9%EB%B3%91-%EC%A0%95%EB%A0%AC"],
											["[C/C++] 병합 정렬원리와 오름차순구현", "https://swblossom.tistory.com/44"]
										]
									}
								},
							]
						},
					]
				},
				{
					svg_name: "quiz",
					name: "Quiz",
					category: 1,
					description:{
						text: "",
						links_1: [
							["백준 2832번 - 정렬","https://www.acmicpc.net/problem/2832"],

						],
						links_2:[
							["백준 3322번 - 정렬의 시간복잡도","https://www.acmicpc.net/problem/3322"],
							["프로그래머스 - K번째 수","https://programmers.co.kr/learn/courses/30/lessons/42748"]

						],
						links_3:[
							["프로그래머스 - H-Index","https://programmers.co.kr/learn/courses/30/lessons/42747"]
						],
					},
				},                    
            ]

        },{
			url: "searching",
			name: "탐색",
			skills: [
				{
					svg_name: "brute_force",
					name: "완전탐색",
					category: 0,
					description: {
						text: "가능한 모든 상황을 찾는 탐색",
						links_0: [
							["[알고리즘] 완전탐색", "https://brenden.tistory.com/10"],
							["[코딩테스트 대비]완전탐색(BP-브루트포스)", "https://developer-mac.tistory.com/81"],
						]
					},
					skills: [
						{
							svg_name: "binary_search",
							name: "이진탐색",
							category: 0,
							description: {
								text: "중간을 기준으로 찾아내는 값을 기준과 비교하여 크면 오른쪽 작으면 왼쪽으로 반복하며 찾아내는 탐색",
								links_0: [
								]
							},
							skills: [
								{
									svg_name: "example",
									name: "Example5",
									category: 0,
									description:{
										text: "각 언어별 이진탐색 예제",
										links_0: [
											["이진탐색 알고리즘 개념 이해 및 추가 예제 C/C++", "https://cjh5414.github.io/binary-search/"],
											["[탐색] 이진탐색(Binary Search) 알고리즘 - Python", "https://wayhome25.github.io/cs/2017/04/15/cs-16/"],
											["이진탐색 - Java", "https://blog.opid.kr/489"],
										]
									}
								}
							],
						},
						{
							svg_name: "string_search",
							name: "문자열탐색",
							category: 0,
							description: {
								text: "문자열에서 어떤 패턴을 가진 문장을 찾아내는 알고리즘",
								links_0: [
								]
							},
							skills: [
								{
									svg_name: "example",
									name: "Example6",
									category: 0,
									description:{
										text: "",
										links_0: [
											["C++ 레퍼런스 - string의 find함수", "https://modoocode.com/241"],
											["[Java] 문자열 찾기/검색하는 다양한 방법", "https://coding-factory.tistory.com/534"],
											["[PYthon] 특정문자 찾기", "https://dpdpwl.tistory.com/119"],
										]
									}
								}
							],
						},

					]

				},
				{
					svg_name: "graph",
					name: "그래프",
					category: 0,
					description: {
						text: "정점(Vertex)과 정점 사이를 연결하는 변(Edge)으로 구성, 형태에 따라 특징이 달라진다.",
						links_0: [
							["위키백과 - 그래프(자료구조)", "https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%9E%98%ED%94%84_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)"],
							["그래프(Graph)", "https://johngrib.github.io/wiki/graph/"],
						]
					},
					skills: [
						{
							svg_name: "bfs",
							name: "BFS",
							category: 0,
							description: {
								text: "Breadth First Search(너비 우선 탐색),루트에서 시작해 부모 노드와 연결된 모든 자식 노드들을 방문하고 이 과정을 반복한다.",
								links_0: [

								]
							},
							skills: [
								{
									svg_name: "example",
									name: "Example7",
									category: 0,
									description:{
										text: "각 언어별 예제",
										links_0: [
											["C++에서 그래프 탐색(DFS와 BFS) 구현하기", "https://twpower.github.io/73-how-to-implement-dfs-and-bfs-in-cpp"],
											["너비 우선 탐색이란? - Java", "https://gmlwjd9405.github.io/2018/08/15/algorithm-bfs.html"],
											["[Daily PS] 파이썬으로 구현하는 BFS와 DFS", "https://cyc1am3n.github.io/2019/04/26/bfs_dfs_with_python.html"],
										]
									}
								}
							],
						},
						{
							svg_name: "dfs",
							name: "DFS",
							category: 0,
							description: {
								text: "Depth First Search(깊이 우선 탐색), 루트에서 시작해 최대한 깊숙히 있는 자식노드를 방문하고 돌아오는 탐색하는 방식이다.",
								links_0: [
								]
							},
							skills: [
								{
									svg_name: "example",
									name: "Example8",
									category: 0,
									description:{
										text: "각 언어별 예제",
										links_0: [
											["C++에서 그래프 탐색(DFS와 BFS) 구현하기", "https://twpower.github.io/73-how-to-implement-dfs-and-bfs-in-cpp"],
											["Java DFS구현하기", "https://freestrokes.tistory.com/88"],
											["[Daily PS] 파이썬으로 구현하는 BFS와 DFS", "https://cyc1am3n.github.io/2019/04/26/bfs_dfs_with_python.html"],
										]
									}
								}
							],
						},

					]

				},
				{
					svg_name: "quiz",
					name: "Quiz",
					category: 1,
					description:{
						text: "",
						links_1: [
							["백준 1260번 - DFS와 BFS","https://www.acmicpc.net/problem/1260"],

						],
						links_2:[
							["프로그래머스 - 타겟 넘버","https://programmers.co.kr/learn/courses/30/lessons/43165"]

						],
						links_3:[
							["백준 15686번 - 치킨 배달","https://www.acmicpc.net/problem/15686"]
						],
					},
				},                     
            ]
        },
    ]}
