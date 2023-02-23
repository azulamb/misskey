import { APIBase } from './api_base.ts';

class Notes extends APIBase {
	public _(option: NotesOption) {
		return this.fetch<Note[]>(this.baseURL, option);
	}

	public children() {
		console.log(2);
	}
}

export function createNotes(path: string, parent: MisskeyAPI): NotesAPI {
	const notes = new Notes(path, parent);
	// deno-lint-ignore no-explicit-any
	const NotesApi: NotesAPI = <any> function (option: NotesOption) {
		return notes._(option);
	};

	Object.defineProperty(NotesApi, 'baseURL', {
		get: () => {
			return notes.baseURL;
		},
	});

	NotesApi.children = () => {
		return notes.children();
	};

	return NotesApi;
}
