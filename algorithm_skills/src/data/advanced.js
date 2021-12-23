export const advancedCollection = {
    url: "advanced",
	name: "심화유형",
	areas: [
		{	
			url: "hash",
			name: "Hash",
			skills: [
				{
					svg_name: "definition",
					name: "정의",
					category: 0,
					description: {
						text: "Key-Value 쌍으로 데이터를 저장하는 자료구조",
						links_0: [
							["해시테이블 자료구조의 이해", "https://velog.io/@cyranocoding/Hash-Hashing-Hash-Table%ED%95%B4%EC%8B%9C-%ED%95%B4%EC%8B%B1-%ED%95%B4%EC%8B%9C%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-6ijyonph6o"],
							["파이썬으로 구현하는 해시 테이블", "https://davinci-ai.tistory.com/19"],
						]
					},
				},
				{
					svg_name: "example",
					name: "Example1",
					category: 0,
					description: {
						text: "각 언어별 해시 예제코드",
						links_0: [
							["Python docs - hashlib", "https://docs.python.org/3/library/hashlib.html"],
							["C++ docs - std::hash", "https://devdocs.io/cpp/utility/hash"],
							]
					},
					skills: [
						{
							svg_name: "C++",
							name: "C++",
							category: 0,
							description: {
								text: "C/C++ 해시 예제코드",
								links_0: [
									["C/C++에서 해시테이블 구현", "https://twpower.github.io/139-hash-table-implementation-in-cpp"],
								]
							},
						},
						{
							svg_name: "python",
							name: "Python",
							category: 0,
							description: {
								text: "Python에서 해시테이블 구현",
								links_0: [
									["파이썬으로 구현하는 자료구조 요약정리 - 해시테이블","https://davinci-ai.tistory.com/19"],
								]
							},
						},
						{
							svg_name: "JAVA",
							name: "Java",
							category: 0,
							description: {
								text: "JAVA에서 해시테이블 구현",
								links_0: [
									["JAVA 해시 기본 개념과 구조", "https://hyeonstorage.tistory.com/265"],
								]
							}
						}
					]
				},
				{
					svg_name: "quiz",
					name: "Quiz",
					category: 1,
					description: {
						text: "난이도 별 해시테이블 문제",
						links_1: [
							["프로그래머스 - 완주하지 못한 선수","https://programmers.co.kr/learn/courses/30/lessons/42576"],
						],
						links_2: [
							["프로그래머스 - 전화번호 목록","https://programmers.co.kr/learn/courses/30/lessons/42577"]
						],
						links_3: [
							["프로그래머스 - 베스트앨범","https://programmers.co.kr/learn/courses/30/lessons/42579"],
						]
					},
				},
			]
		},
        {	
			url: "dp",
			name: "DP",
			skills: [
				{
					svg_name: "definition",
					name: "정의",
					category: 0,
					description: {
						text: "특정 범위까지의 값을 구하기 위해서 그것과 다른 범위까지의 값을 이용하여 효율적으로 값을 구하는 알고리즘",
						links_0: [
							["위키백과-동적 계획법", "https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%EA%B3%84%ED%9A%8D%EB%B2%95"],
							["Introduction to DP", "https://www.hackerearth.com/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/"],
						]
					},
				},
				{
					svg_name: "example",
					name: "Example2",
					category: 0,
					description: {
						text: "각 언어별 DP 예제코드",
						links_0: [
							]
					},
					skills: [
						{
							svg_name: "C++",
							name: "C++",
							category: 0,
							description: {
								text: "C/C++ DP 예제코드",
								links_0: [
									["다이나믹 프로그래밍 DP", "https://hongku.tistory.com/161"],
								]
							},
						},
						{
							svg_name: "python",
							name: "Python",
							category: 0,
							description: {
								text: "Python에서 DP 구현",
								links_0: [
									["Dynamic Programming(DP,동적계획법)","https://lee-seul.github.io/algorithm/2017/03/16/dynamic-programming.html"],
								]
							},
						},
						{
							svg_name: "JAVA",
							name: "Java",
							category: 0,
							description: {
								text: "JAVA에서 DP 구현",
								links_0: [
									["[코딩테스트 대비] 동적 계획법 -Java", "https://developer-mac.tistory.com/77"],
								]
							}
						}
					]
				},
				{
					svg_name: "quiz",
					name: "Quiz",
					category: 1,
					description: {
						text: "난이도 별 DP 문제",
						links_1: [
								["백준 10826번 - 피보나치 수 4","https://www.acmicpc.net/problem/10826"],
								["백준 2748번 - 피보나치 수 2","https://www.acmicpc.net/problem/2748"],
						],
						links_2: [
								["프로그래머스 - N으로 표현","https://programmers.co.kr/learn/courses/30/lessons/42895"]
						],
						links_3: [
								["프로그래머스 - 도둑질","https://programmers.co.kr/learn/courses/30/lessons/42897"]
						],
					},
				},
			]
		},
		{	
			url: "greedy",
			name: "Greedy",
			skills: [
				{
					svg_name: "definition",
					name: "정의",
					category: 0,
					description: {
						text: "매 선택에서 지금 이 순간 당장 최적인 답을 선택하여 적합한 결과를 도출하는 모토를 가진 알고리즘",
						links_0: [
							["위키백과-greedy", "https://ko.wikipedia.org/wiki/%ED%83%90%EC%9A%95_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98"],
							["Greedy Algorithm(욕심쟁이 알고리즘)", "https://ujink.tistory.com/10"],
						]
					},
				},
				{
					svg_name: "example",
					name: "Example3",
					category: 0,
					description: {
						text: "각 언어별 greedy 예제코드",
						links_0: [

							]
					},
					skills: [
						{
							svg_name: "C++",
							name: "C++",
							category: 0,
							description: {
								text: "C/C++ Greedy 예제코드",
								links_0: [
									["[알고리즘 강좌]002.그리디 알고리즘", "https://m.blog.naver.com/PostView.nhn?blogId=seiyeonyim&logNo=100192981326&proxyReferer=https:%2F%2Fwww.google.com%2F"],
								]
							},
						},
						{
							svg_name: "python",
							name: "Python",
							category: 0,
							description: {
								text: "Python에서 Greedy 예제코드",
								links_0: [
									["탐욕 알고리즘의 이해","https://www.fun-coding.org/Chapter19-greedy-live.html"],
								]
							},
						},
						{
							svg_name: "JAVA",
							name: "Java",
							category: 0,
							description: {
								text: "JAVA에서 Greedy 예제코드",
								links_0: [
									["그리디(Greedy) 알고리즘", "https://mygumi.tistory.com/121"],
								]
							}
						}
					]
				},
				{
					svg_name: "quiz",
					name: "Quiz",
					category: 1,
					description: {
						text: "난이도 별 Greedy 문제",
						links_1: [
							["프로그래머스 - 체육복","https://programmers.co.kr/learn/courses/30/lessons/42862"],
						],
						links_2: [
							["프로그래머스 - 구명보트","https://programmers.co.kr/learn/courses/30/lessons/42885"],
						],
						links_3: [
							["백준 2109번 - 순회강연","https://www.acmicpc.net/problem/2109"],
						],
					},
				},
			]
		},
    ]}
