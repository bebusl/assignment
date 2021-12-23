import {CLOSE_DESCRIPTION_EVENT, IS_TOUCH} from "../config.js";
import {auth, AuthEvents} from "../firebase/auth.js";
import {sharedStyles} from "../styles/shared.js";
import {googleIconTemplate, youtubeIconTemplate} from "../util/icons.js";
import {measureCompleteSkill, measureShowDescription} from "../util/measure.js";
import {getId, getSkillSearchQuery, getURLOrigin, onClickLink} from "../util/util.js";
import {css, html, LitElement} from "./../../web_modules/lit-element.js";
import {repeat} from "./../../web_modules/lit-html/directives/repeat.js";
import "./icon.js";

/**
 * An element that presents the description of a skill.
 */
export class Description extends LitElement {

	static get properties () {
		return {
			skill: {
				type: Object
			},
			area: {
				type: Object
			},
			collection: {
				type: Object
			},
			compact: {
				type: Boolean,
				reflect: true
			},
			directionX: {
				type: String,
				reflect: true
			},
			directionY: {
				type: String,
				reflect: true
			}
		}
	}

	static get styles () {
		return [
			sharedStyles,
			css`
			/* Style the tab */
			.tab {
			overflow: hidden;
			border: 1px solid #ccc;
			background-color: #f1f1f1;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 5px 0 0 0;
			}
			
			/* Style the buttons that are used to open the tab content */
			.tab button {
			float: left;
			background-color: inherit;
			border: none;
			outline: none;
			cursor: pointer;
			padding: 5px 5px;
			width: 5rem;
			transition: 0.3s;
			}
			
			/* Change background color of buttons on hover */
			.tab button:hover {
			background-color: #ddd;
			}
			
			/* Create an active/current tablink class */
			.tab button.active {
			background-color: #ccc;
			}
			
			/* Style the tab content */
			.tabcontent {
			display: none;
			padding: 6px 12px;
			border: 1px solid #ccc;
			border-top: none;
			}

				:host {
					background: var(--background);
					color: var(--foreground);
					padding: var(--spacing-l);
					border-radius: var(--border-radius-s);
					text-align: left;
					z-index: 123456789;
					position: absolute;
					width: 22rem;
					top: 50%;
    			    left: 0;
					transform: translate(-7%, -5px);
					cursor: default;
				}
				
				:host([directionX="left"]) {
					left: unset;
					right: 0;
					transform: translate(7%, -5px);
				}
				
				:host([directionY="up"]) {
					top: unset;
					bottom: 50%;
				}
				
				:host:before {
					content: "";
					border-style: solid;
					border-width: 0 var(--spacing-sm) var(--spacing-sm) var(--spacing-sm);
					border-color: transparent transparent var(--background) transparent;
					position: absolute;
					bottom: 100%;
					left: 15%;
				}
				
				:host([directionX="left"]):before {
					left: unset;
					right: 15%;
				}
				
				:host([directionY="up"]):before {
					top: unset;
					top: 100%;
					transform: rotate(180deg);
				}
				
				#text {
					margin: 0;
				}

				#title {
					margin: 0 0 var(--spacing-s) 0;
				}

				#links {
					margin: var(--spacing-m) 0 0 0;
    			    padding: 0 0 0 var(--spacing-s);
				}
				
				.link {
					display: flex;
    			    align-items: center;
				}

				.link:not(:last-child) {
					margin: 0 0 var(--spacing-s);
				}

				.link .img {
					margin: 0 var(--spacing-s) 0 0;
					width: var(--link-img-size);
					height: var(--link-img-size);
					flex-shrink: 0;
				}

				.link:not(:last-child) {
					margin: 0 0 var(--spacing-s);
				}

				a {
					color: var(--link);
					word-break: break-word;
				}
				
				a:visited {
					color: var(--link-visited);
				}
				
				.img {
					font-size: 0;
				}
				
				#complete-button {
					margin: var(--spacing-l) 0 0 0;
					width: 100%;
				}

				#smart-search {
					--icon-size: 1rem;
					position: absolute;
					top: var(--spacing-m);
					right: var(--spacing-m);
					display: flex;
					align-items: center;
				}

				#smart-search > :not(:last-child) {
					margin: 0 var(--spacing-s) 0 0;
				}
				
				@media (any-pointer: coarse) and (max-width: 700px) {
					:host {
						position: fixed;
						bottom: 0;
						left: 0;
						top: unset;
						width: 100%;
						max-height: 60vh;
						overflow-y: auto;
						overscroll-behavior: contain;
						-webkit-overflow-scrolling: touch;
						transform: translate(0) !important;
					}
					
					.link {
					    padding: var(--spacing-m);
						border: 1px solid currentColor;
						border-radius: var(--border-radius-s);
					}
					
					.link:not(:last-child) {
						margin: 0 0 var(--spacing-m);
					}

					.check-box{
						cursor: pointer;
					}
				}
			`
		];
	}

	get skillId () {
		return getId(this.collection, this.area, this.skill);
	}

	get isAuthenticated () {
		return auth.isAuthenticated;
	}

	get isCompleted () {
		return !this.isAuthenticated ? true : auth.hasCompletedSkill(this.skillId);
	}

	get skillSearchQuery () {
		return getSkillSearchQuery(this.collection, this.area, this.skill);
	}

	constructor () {
		super();
		this.directionX = "right";
		this.directionY = "down";


		this.requestClose = this.requestClose.bind(this);
		this.checkOutsideClick = this.checkOutsideClick.bind(this);
		this.onClick = this.onClick.bind(this);
		this.requestUpdate = this.requestUpdate.bind(this);
	}

	/**
	 * Hook up listeners when connected.
	 */
	connectedCallback () {
		super.connectedCallback();
		this.measureDidShow();

		this.addEventListener("click", this.onClick);
		window.addEventListener(CLOSE_DESCRIPTION_EVENT, this.requestClose);
		auth.addEventListener(AuthEvents.authStateChanged, this.requestUpdate);
		auth.addEventListener(AuthEvents.completedSkillsChanged, this.requestUpdate);

		if (IS_TOUCH) {
			window.addEventListener("touchstart", this.checkOutsideClick);
			window.addEventListener("scroll", this.requestClose, {passive: true});

		} else {
			this.addEventListener("focusout", this.requestClose, {passive: true});
		}
	}

	firstUpdated (e) {
		super.firstUpdated(e);
		this.updateDirection();
	}

	/**
	 * Updates the direction of the description.
	 */
	updateDirection () {
		const {left, width, top, height} = this.getBoundingClientRect();
		const directionOffset = 50;
		this.directionX = left + width + directionOffset >= window.innerWidth ? "left" : "right";
		this.directionY = window.scrollY + top + height + directionOffset >= document.body.scrollHeight ? "up" : "down";
	}

	/**
	 * Remove listener when disconnected.
	 */
	disconnectedCallback () {
		super.disconnectedCallback();
		this.removeEventListener("focusout", this.requestClose);
		this.removeEventListener("click", this.onClick);
		window.removeEventListener("scroll", this.requestClose);
		window.removeEventListener("touchstart", this.checkOutsideClick);
		window.removeEventListener(CLOSE_DESCRIPTION_EVENT, this.requestClose);
		auth.removeEventListener(AuthEvents.authStateChanged, this.requestUpdate);
		auth.removeEventListener(AuthEvents.completedSkillsChanged, this.requestUpdate);
	}

	/**
	 * Measure that the description was shown.
	 */
	measureDidShow () {
		const {name} = this.skill;
		measureShowDescription(name);
	}

	/**
	 * Checks whether a click happened outside of the element.
	 * @param e
	 */
	checkOutsideClick (e) {
		if (!("composedPath" in e)) {
			return;
		}

		// Check if the parent is in the event path
		if (!e.composedPath().includes(this.parentElement)) {
			this.requestClose();
		}
	}

	/**
	 * Stops clicks from propagating.
	 * @param e
	 */
	onClick (e) {
		e.stopPropagation();
	}

	/**
	 * Requests closing the skill.
	 */
	requestClose () {
		this.dispatchEvent(new CustomEvent("close"));
	}

	/**
	 * Toggles the completion of the skill.
	 */
	async toggleCompleteSkill () {
		const newIsCompleted = !this.isCompleted;
		auth.toggleCompleteSkill(this.skillId).then();
		if (newIsCompleted) {
			const {currentConfettiCount, sprayConfettiOnce, playAudio} = await import("./../util/confetti-helper.js");
			if (currentConfettiCount() <= 2) {
				sprayConfettiOnce();
			}

			// Add audio for lols
			requestAnimationFrame(() => {
				playAudio(`../../audio/party.mp3`, 0.2);
				playAudio(`../../audio/shot.mp3`, 0.7);
				setTimeout(() => {
					playAudio(`../../audio/paper.mp3`, 0.3);
				}, 150);
			});

			// Measure that the skill was completed
			measureCompleteSkill(name);
		}
	}

	/*문제 체크 */
	async toggleSolvingProblem(id){
		auth.toggleSolvingProblem(id).then();//id 인자로 받아서 그거 넣고 빼고 하는거 .
	}


	checkboxClickHandler(e){
		const node=this.shadowRoot.getElementById(`${e.target.id}`);
		this.toggleSolvingProblem(e.target.id);
		node.classList.toggle("on");
		if(node.classList.contains("on")){
			node.innerHTML="■";
		}
		else{
			node.innerHTML="□";
		}
	}

	

	/**
	 * Renders a link.
	 * @param link
	 * @returns {f}
	 */
	renderLink (link) {
		const [name, url] = link;
		if(auth.hasSolvingProblem()){
			node.classList.add("on");
		}

		
		return html`
			<div class="link">
				${auth.hasSolvingProblem(name) ? html`<div class="check-box on" id="${name}" style="cursor: pointer" @click="${e=>this.checkboxClickHandler(e)}">■</div>` : html`<div class="check-box" id="${name}" style="cursor: pointer" @click="${e=>this.checkboxClickHandler(e)}">□</div>`}
				<img class="img" loading="lazy" width="16" height="16" intrinsicsize="16x16" src="https://plus.google.com/_/favicon?domain_url=${encodeURIComponent(getURLOrigin(url))}" alt="Logo for ${name}" />
				<a class="url" href="${url}" target="_blank" rel="noopener" @click="${e => onClickLink(e)}">${name}</a>
			</div>
		`;
	}





	setCategory (index) {
		this.skill.category = index;
		this.requestUpdate();
	}

	/**
	 * Renders the description.
	 * @returns {f}
	 */
	render () {
		const {skill, isCompleted, isAuthenticated, skillSearchQuery} = this;
		const {description, name, category} = skill;

		return html`
			<h4 id="title">${name}</h4>
			${description != null && description.text != null ? html`<p id="text">${description.text}</p>` : undefined}
			
			${category != null && category > 0 ? html`<div class="tab">
				<button @click="${()=>{ this.setCategory(1); }}">초급</button>
				<button @click="${()=>{ this.setCategory(2); }}">중급</button>
				<button @click="${()=>{ this.setCategory(3); }}">고급</button>
			</div>` : undefined}

			${category != null && category == 0 ? html`${description != null && description.links_0 != null && description.links_0.length > 0 ? html`
			<div id="links">${repeat(description.links_0, link => link, this.renderLink.bind(this))}</div>
			` : undefined}` : undefined}

			${category != null && category == 1 ? html`${description != null && description.links_1 != null && description.links_1.length > 0 ? html`
			<div id="links">${repeat(description.links_1, link => link, this.renderLink.bind(this))}</div>
			` : undefined}` : undefined}

			${category != null && category == 2 ? html`${description != null && description.links_2 != null && description.links_2.length > 0 ? html`
			<div id="links">${repeat(description.links_2, link => link, this.renderLink.bind(this))}</div>
			` : undefined}` : undefined}

			${category != null && category == 3 ? html`${description != null && description.links_3 != null && description.links_3.length > 0 ? html`
			<div id="links">${repeat(description.links_3, link => link, this.renderLink.bind(this))}</div>
			` : undefined}` : undefined}
			
			<div id="smart-search">
				<a id="search-google" href="https://www.google.com/search?q=${encodeURIComponent(skillSearchQuery)}" target="_blank" aria-label="Search on Google" rel="noopener" @click="${e => onClickLink(e)}">
					<ws-icon hoverable .template="${googleIconTemplate}"></ws-icon>
				</a>
				<a id="search-youtube" href="https://www.youtube.com/results?search_query=${encodeURIComponent(skillSearchQuery)}" target="_blank" aria-label="Search on Youtube" rel="noopener" @click="${e => onClickLink(e)}">
					<ws-icon hoverable .template="${youtubeIconTemplate}"></ws-icon>
				</a>
			</div>
			
			${isAuthenticated ? html`
				<ws-button bordered id="complete-button" @click="${this.toggleCompleteSkill}">${isCompleted ? `Uncomplete Skill` : `Complete Skill`}</ws-button>
			` : undefined}
		`;
	}
}

customElements.define("ws-description", Description);