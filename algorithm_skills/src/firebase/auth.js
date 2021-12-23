import {measureLogin} from "../util/measure.js";

export const AuthEvents = {
	authStateChanged: "authStateChanged",
	completedSkillsChanged: "completedSkillsChanged",
	solvingProblemChanged:"solvingProblemChanged"
	//custom : 탭에 있는 문제 체크박스 클릭했을 때 문제 해결했다고 인식.
};

export const CollectionNames = {
	users: "users"
};

export const StorageNames = {
	sessionUser: "sessionUser",
	completedSkills: "completedSkills",
	solvingProblems: "solvingProblems"
	//custom : db에 solvingProblem 따로 만들 것임. 
};

/**
 * Class controlling the auth state of the app.
 * Ideally we would like to extend EventTarget, but that doesnt work on Safari.
 * Instead we extend HTMLElement to extend the EventTarget.
 */
export class Auth extends HTMLElement {

	constructor () {
		super();
		this.setup();
	}

	/**
	 * Sets up the authentication.
	 */
	setup () {
		this.db = null;

		// Grab the skills from localstorage before firebase has loaded.
		this.completedSkills = (() => {
			try {
				return JSON.parse(localStorage.getItem(StorageNames.completedSkills));
			} catch (err) {
				return [];
			}
		})();


		// Grab the problems from localstorage before firebase has loaded.
		this.solvingProblems=(()=>{
			try{
				return JSON.parse(localStorage.getItem(StorageNames.solvingProblems));
			} catch (err) {
				return [];
			}
		})();


		// Grab the session user from localstorage before firebase has loaded.
		this.user = (() => {
			try {
				return JSON.parse(localStorage.getItem(StorageNames.sessionUser));
			} catch (err) {
				return null;
			}
		})();

		// Measure the user if one exists
		if (this.user != null) {
			measureLogin(this.user);
		}
	}

	/**
	 * Determines whether the user is authenticated.
	 */
	get isAuthenticated () {
		return this.user != null;
	}

	/**
	 * Set the firebase instance.
	 * @param firebase
	 */
	setFirebase (firebase) {
		this.firebase = firebase;
	}

	/**
	 * Sets the user and saves it to local storage.
	 * @param {*} user
	 */
	setUser (user) {
		if (user != null) {
			localStorage.setItem(StorageNames.sessionUser, JSON.stringify(user));
			measureLogin(user);

		} else {
			localStorage.removeItem(StorageNames.sessionUser);
			localStorage.removeItem(StorageNames.completedSkills);
		}

		this.user = user;
		auth.dispatchEvent(new CustomEvent(AuthEvents.authStateChanged, {detail: user}));
	}

	/**
	 * Sets the completed skills and saves it to local storage.
	 * @param {*} skills
	 */
	setCompletedSkills (skills) {
		skills = skills || [];
		localStorage.setItem(StorageNames.completedSkills, JSON.stringify(skills));

		this.completedSkills = skills;
		auth.dispatchEvent(new CustomEvent(AuthEvents.completedSkillsChanged, {detail: skills}));
	}


	/**
	 * 
	 * @param {*} problems 
	 */
	setSolvingProblems(problems){
		problems = problems || [];
		localStorage.setItem(StorageNames.solvingProblems, JSON.stringify(problems));

		this.solvingProblems=problems;
		auth.dispatchEvent(new CustomEvent(AuthEvents.solvingProblemChanged, {detail: problems}));
	}

	/**
	 * Sets the database.
	 * @param {*} db
	 */
	setDb (db) {
		this.db = db;
	}

	/**
	 * Signs in with Google.
	 */
	async signInWithGoogle () {
		const firebase = this.firebase;
		if (firebase == null) return;
		const provider = new firebase.auth.GoogleAuthProvider();
		return await firebase.auth().signInWithPopup(provider);
	}

	/**
	 * Signs out.
	 */
	async signOut () {
		const firebase = this.firebase;
		if (firebase == null) return;
		await firebase.auth().signOut();
	}

	/**
	 * Returns whether the skill is completed.
	 * @param {*} skillId
	 */
	hasCompletedSkill (skillId) {
		return this.completedSkills.includes(skillId);
	}



	/**
	 * Adds a skill to the list of completed skills and saves it.
	 * @param {*} skillId
	 */
	async addCompletedSkill (skillId) {
		if (!this.hasCompletedSkill(skillId)) {
			return await this.updateCompletedSkills([...this.completedSkills, skillId]);
		}

		return false;
	}

	/**
	 * Removes a skill from the list of completed skills and saves it.
	 * @param {*} skillId
	 */
	async removeCompletedSkill (skillId) {
		if (this.hasCompletedSkill(skillId)) {
			return await this.updateCompletedSkills(this.completedSkills.filter(id => id !== skillId));
		}

		return false;
	}

	/**
	 * Toggles whether a skill is completed and saves it.
	 * @param {*} skillId
	 */
	async toggleCompleteSkill (skillId) {
		if (this.hasCompletedSkill(skillId)) {
			console.log("흔적2");
			return this.removeCompletedSkill(skillId);

		} else {
			console.log("흔적3");
			return this.addCompletedSkill(skillId);
		}
	}

	/**
	 * Updates the list of completed skills and saves it.
	 * @param {*} skills
	 */
	async updateCompletedSkills (skills) {
		if (this.user == null) {
			return false;
		}
		await this.db.collection(CollectionNames.users).doc(this.user.uid).set({completedSkills: skills});
	}



	//여기부터 custom. firebase에 problem-set 설정
	/**
	 * Returns whether the skill is completed.
	 * @param {*} problemId
	 */
	hasSolvingProblem (problemId) {
		return this.solvingProblems.includes(problemId);
	}



	/**
	 * Adds a skill to the list of completed skills and saves it.
	 * @param {*} problemId
	 */
	async addSolvingProblem (problemId) {
		if (!this.hasSolvingProblem(problemId)) {
			return await this.updateSolvingProbelems([...this.solvingProblems, problemId]);
		}

		return false;
	}

	/**
	 * Removes a skill from the list of completed skills and saves it.
	 * @param {*} problemId
	 */
	async removeSolvingProblem (problemId) {
		if (this.hasSolvingProblem(problemId)) {
			return await this.updateSolvingProbelems(this.solvingProblems.filter(id => id !== problemId));
		}

		return false;
	}

	/**
	 * Toggles whether a skill is completed and saves it.
	 * @param {*} problemId
	 */
	async toggleSolvingProblem (problemId) {
		if (await this.hasSolvingProblem(problemId)) {
			return await this.removeSolvingProblem(problemId);

		} else {
			return await this.addSolvingProblem(problemId);
		}
	}

	/**
	 * Updates the list of completed skills and saves it.
	 * @param {*} problems
	 */
	async updateSolvingProbelems (problems) {
		if (this.user == null) {
			return false;
		}

		await this.db.collection(CollectionNames.users).doc(this.user.uid).set({solvingProblems: problems});
	}

}

customElements.define("ws-auth", Auth);
export const auth = new Auth();