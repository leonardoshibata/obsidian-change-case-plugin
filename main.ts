import { Editor, MarkdownView, Plugin } from 'obsidian';


// Remember to rename these classes and interfaces!


interface ChangeCaseSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: ChangeCaseSettings = {
	mySetting: 'default'
}



export default class ChangeCase extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'lowercase',
			name: 'Change to lowercase',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection(editor.getSelection().toLowerCase());
			}
		});

		this.addCommand({
			id: 'uppercase',
			name: 'Change to UPPERCASE',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection(editor.getSelection().toUpperCase());
			}
		});

		this.addCommand({
			id: 'sentence-case',
			name: 'Change to Sentence case',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const sentence: string = editor.getSelection();

				editor.replaceSelection(
					sentence[0].toUpperCase() + sentence.substring(1).toLowerCase());
			}
		});

		this.addCommand({
			id: 'capitalize-each-word',
			name: 'Capitalize Each Word',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const sentence: string = editor.getSelection();

				editor.replaceSelection(
					sentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))
			}
		});


	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
