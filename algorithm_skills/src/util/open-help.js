import {html, render} from "../../web_modules/lit-html.js";
import {APP_VERSION} from "./../config.js";
import "../atoms/button.js";

/**
 * Opens the dialog dialog.
 * @returns {Promise<void>}
 */
export async function openHelp () {
	const {openDialog} = await import("../../web_modules/web-dialog.js");
	const {$dialog, resolver} = openDialog({
		$content: $dialog => render(html`
			<style>
				* {
					box-sizing: border-box;
				}
				
				h2 {
					margin: var(--spacing-xl) 0 var(--spacing-m);
				}
				
				h3 {
					margin: var(--spacing-m) 0 var(--spacing-s);
				}
				
				p {
					margin: 0 0 var(--spacing-m);
				}
				
				a {
					color: var(--link);
				}
				
				#close {
					position: absolute;
					top: 0;
					right: 0;
					padding: var(--spacing-l);
					cursor: pointer;
					font-size: 1.5rem;
				}
				
				#version {
					position: absolute;
					right: var(--spacing-m);
					bottom: var(--spacing-m);
					color: var(--shade-500);
				}
				
			</style>
			
			<div tabindex="0"></div>
			<ws-button id="close" @click="${() => $dialog.close()}" aria-label="Close dialog">✖️</ws-button>
			
			<h2>Algotithm Skills FAQ</h2>

			<h3>Algorithm Skills가 뭔가요?</h3>
			<p>Algorithm Skills는 알고리즘 개요를 시각적으로 표현한 것입니다.</p>

			<h3>이 페이지에 나와있는 알고리즘의 선정 기준은 무엇인가요?</h3>
			<p>최근 코딩테스트 문제에서 많이 나오고, 활용되는 알고리즘들을 우선적으로 선정했습니다</p>

			<h3>이 프로젝트에 도움을 주려면 어떻게 하나요?</h3>
			<p> <a target="_blank" href="https://github.com/cbnu-community/algorithm_skills/issues" rel="noopener" aria-label="Open get involved">Github</a> 이 페이지로 가서 철자 수정을 도와주시거나, 오류를 알려주시거나 새로운 기능을 제안해주시면 됩니다! 어떤 도움이든 감사합니다!</p>


			<h3>해결한 문제는 풀었다고 표시해두고 싶은데 어떻게 하나요?</h3>
			<p>페이지 하단에 가면 "구글 로그인"이라는 버튼이 있습니다. 그 버튼을 눌러 로그인 하시면, 문제 앞에 체크박스가 생깁니다. 푼 문제는 체크박스를 클릭해서 풀었다고 표시하면 됩니다!</p>

			<h3>옆으로 스크롤하는 거 불편한데, 세로로 스크롤 할 수 없나요?</h3>
			<p>페이지 상단 왼쪽에 보면 컴팩트 모드로 바꿀 수 있는 스위치가 있습니다! 만약 컴팩트 모드를 다른 사람에게 공유하고 싶다면, url 끝에 ?compact 를 추가해서 공유해주세요</p>

			<h3>제작자와 컨택하려면 어떻게 해야하나요?</h3>
			<p>brill_be@naver.com로 이메일 주세요! 이 프로젝트에 관해 더 알고싶으면 연락주시면 됩니다.</p>
	
			<span id="version">v${APP_VERSION}</span>
		`, $dialog)
	});

	// Flip the colors
	$dialog.style.setProperty(`--dialog-bg`, `var(--foreground)`);
	$dialog.style.setProperty(`--dialog-color`, `var(--background)`);

	return resolver;
}