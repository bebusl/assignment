import {writeFileSync} from "fs";
import {collections} from "./src/data.js";

const LINE_BREAK = `\r\n`;
const PARAGRAPH_BREAK = `${LINE_BREAK}${LINE_BREAK}`;
const INITIAL_TITLE_LEVEL = 2;
const FILE_NAME = `blueprint.md`;
const DEFAULT_URL_ICON = "๐";
const URL_ICON_MAPPER = [
	["๐น", ["youtube"]],
	["๐", ["wikipeia"]],
	["๐งช", ["codelab", "github"]],
	["โ๏ธ", ["toolbox", "webaim", "w3c", "thinkwithgoogle", "w3"]],
	["๐", ["course", "udacity"]],
	["๐", ["book", "amazon", "refactoringui.com"]],
	["๐", ["resource", "glitch.me", "codepen"]],
	["โ", ["quora", "stackoverflow"]],
];

/**
 * Returns the origin of the url.
 * @param url
 * @returns {string}
 */
function getURLOrigin (url) {
	try {
		return (new URL(url)).origin;
	} catch (err) {
		return url;
	}
}

/**
 * Returns an icon for a URL.
 * @param url
 * @returns {string}
 */
function iconForUrl (url) {
	for (const [icon, keywords] of URL_ICON_MAPPER) {
		if (keywords.find(k => url.includes(k)) != null) {
			return icon;
		}
	}

	return DEFAULT_URL_ICON;
}

/**
 * Returns a logo for a URL.
 * @param url
 * @returns {string}
 */
function logoForUrl (url) {
	return `<img style="margin-bottom: 0;" src="https://plus.google.com/_/favicon?domain_url=${encodeURIComponent(getURLOrigin(url))}" alt="Logo" />`;
}

/**
 * Generals markdown for a heading.
 * @param text
 * @param level
 * @returns {string}
 */
function generateMarkdownHeading (text, level) {
	return `${Array(Math.min(level, 6)).fill("#").join("")} ${text}`;
}

/**
 * Generates markdown for an array of links.
 * @param links
 * @returns {string}
 */
function generateLinksMarkdown (links) {
	//const parts = links.map(([name, url]) => `* [ ] ${iconForUrl(url)} [${name}](${url}) ${logoForUrl(url)}`);
	const parts = links.map(([name, url]) => `* [ ] [${logoForUrl(url)} ${name}](${url})`);
	//const parts = links.map(([name, url]) => `* [ ] <a href="${url}" target="_blank">${logoForUrl(url)} ${name}</a>`);
	return parts.join(LINE_BREAK);
}

/**
 * Generates markdown for a skill.
 * @param skill
 * @param area
 * @param collection
 * @param level
 * @returns {string}
 */
function generateSkillMarkdown (skill, area, collection, level) {
	const {name, description, skills} = skill;
	let markdown = `${generateMarkdownHeading(name, level)}${PARAGRAPH_BREAK}${description != null ? `${description.text != null ? `${description.text}${PARAGRAPH_BREAK}` : ""}${generateLinksMarkdown(description.links || [])}` : ""}${LINE_BREAK}`;
	if (skills != null) {
		markdown = `${markdown}${LINE_BREAK}${generateSkillsMarkdown(skills, area, collection, level + 1)}`
	}

	return markdown;
}

/**
 * Generates markdown for an array of skills.
 * @param skills
 * @param area
 * @param collection
 * @param level
 * @returns {string}
 */
function generateSkillsMarkdown (skills, area, collection, level) {
	const parts = skills.map(skill => generateSkillMarkdown(skill, area, collection, level));
	return parts.join(LINE_BREAK);
}

/**
 * Generates markdown for an area.
 * @param area
 * @param collection
 * @param level
 * @returns {string}
 */
function generateAreaMarkdown (area, collection, level) {
	return `${area.name != null ? `${generateMarkdownHeading(area.name, level)}${PARAGRAPH_BREAK}` : ""}${generateSkillsMarkdown(area.skills, area, collection, level)}`
}

/**
 * Generates markdown for a collection.
 * @param collection
 * @param level
 * @returns {string}
 */
function generateCollectionMarkdown (collection, level) {
	const parts = collection.areas.map(area => generateAreaMarkdown(area, collection, level + 1));
	return `${generateMarkdownHeading(collection.name, level)}${PARAGRAPH_BREAK}${parts.join(PARAGRAPH_BREAK)}`;
}

/**
 * Generates markdown for an array of collections.
 * @param collections
 * @returns {string}
 */
function generateCollectionsMarkdown (collections) {
	const parts = collections.map(collection => generateCollectionMarkdown(collection, INITIAL_TITLE_LEVEL));
	return parts.join(PARAGRAPH_BREAK);
}

// Generate the collections markdown
const collectionsMarkdown = generateCollectionsMarkdown(collections);

// Create the blueprint file.
writeFileSync(FILE_NAME, 
`
{{ template:title }}
{{ template:badges }}
{{ template:description }}

<p align="center">
	<a href="https://github.com/cbnu-community/algorithm_skills" target="_blank">
		<img src="https://raw.githubusercontent.com/andreasbm/web-skills/master/demo.gif" alt="Algorithm Skills Demo" width="800" />
	</a>
</p>
<br />
<details>
<summary>๐ ๋ชฉ์ฐจ</summary>
<br />
{{ template:toc }}
</details>

## FAQ

### Algorithm Skills๊ฐ ๋ญ๊ฐ์?
Algorithm Skills๋ ์๊ณ?๋ฆฌ์ฆ ๊ฐ์๋ฅผ ์๊ฐ์?์ผ๋ก ํํํ ๊ฒ์๋๋ค.

### ์ด ํ์ด์ง์ ๋์์๋ ์๊ณ?๋ฆฌ์ฆ์ ์?์? ๊ธฐ์ค์ ๋ฌด์์ธ๊ฐ์?
์ต๊ทผ ์ฝ๋ฉํ์คํธ ๋ฌธ์?์์ ๋ง์ด ๋์ค๊ณ?, ํ์ฉ๋๋ ์๊ณ?๋ฆฌ์ฆ๋ค์ ์ฐ์?์?์ผ๋ก ์?์?ํ์ต๋๋ค

### ์ด ํ๋ก์?ํธ์ ๋์์ ์ฃผ๋?ค๋ฉด ์ด๋ป๊ฒ ํ๋์?
Github ์ด ํ์ด์ง๋ก ๊ฐ์ ์ฒ?์ ์์?์ ๋์์ฃผ์๊ฑฐ๋, ์ค๋ฅ๋ฅผ ์๋?ค์ฃผ์๊ฑฐ๋ ์๋ก์ด ๊ธฐ๋ฅ์ ์?์ํด์ฃผ์๋ฉด ๋ฉ๋๋ค! ์ด๋ค ๋์์ด๋? ๊ฐ์ฌํฉ๋๋ค!

### ํด๊ฒฐํ ๋ฌธ์?๋ ํ์๋ค๊ณ? ํ์ํด๋๊ณ? ์ถ์๋ฐ ์ด๋ป๊ฒ ํ๋์?
ํ์ด์ง ํ๋จ์ ๊ฐ๋ฉด "๊ตฌ๊ธ ๋ก๊ทธ์ธ"์ด๋ผ๋ ๋ฒํผ์ด ์์ต๋๋ค. ๊ทธ ๋ฒํผ์ ๋๋ฌ ๋ก๊ทธ์ธ ํ์๋ฉด, ๋ฌธ์? ์์ ์ฒดํฌ๋ฐ์ค๊ฐ ์๊น๋๋ค. ํผ ๋ฌธ์?๋ ์ฒดํฌ๋ฐ์ค๋ฅผ ํด๋ฆญํด์ ํ์๋ค๊ณ? ํ์ํ๋ฉด ๋ฉ๋๋ค!

### ์์ผ๋ก ์คํฌ๋กคํ๋ ๊ฑฐ ๋ถํธํ๋ฐ, ์ธ๋ก๋ก ์คํฌ๋กค ํ? ์ ์๋์?
ํ์ด์ง ์๋จ ์ผ์ชฝ์ ๋ณด๋ฉด ์ปดํฉํธ ๋ชจ๋๋ก ๋ฐ๊ฟ ์ ์๋ ์ค์์น๊ฐ ์์ต๋๋ค! ๋ง์ฝ ์ปดํฉํธ ๋ชจ๋๋ฅผ ๋ค๋ฅธ ์ฌ๋์๊ฒ ๊ณต์?ํ๊ณ? ์ถ๋ค๋ฉด, url ๋์ ?compact ๋ฅผ ์ถ๊ฐํด์ ๊ณต์?ํด์ฃผ์ธ์

### ์?์์์ ์ปจํํ๋?ค๋ฉด ์ด๋ป๊ฒ ํด์ผํ๋์?
brill_be@naver.com ๋ก ์ด๋ฉ์ผ ์ฃผ์ธ์! ์ด ํ๋ก์?ํธ์ ๊ดํด ๋ ์๊ณ?์ถ์ผ๋ฉด ์ฐ๋ฝ์ฃผ์๋ฉด ๋ฉ๋๋ค.

${collectionsMarkdown}
{{ template:contributors }}
{{ template:license }}`);