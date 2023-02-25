import { APIBase } from './api_base.ts';

class Notes extends APIBase {
	public _(option: NotesOption) {
		return this.fetch<NotesResponse>(this.baseURL, option);
	}

	public children(option: NotesChildrenOption) {
		return this.fetch<NotesResponse>(this.baseURL + '/children', option);
	}

	public create(option: NotesCreateOption) {
		return this.authorizedFetch<NotesCreateResponse>(this.baseURL + '/create', option);
	}

	public delete(option: NotesDeleteOption) {
		return this.authorizedFetch(this.baseURL + '/delete', option).then(() => {
			return;
		});
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

	/*NotesApi.children = (option: NotesChildrenOption) => {
		return notes.children(option);
	};*/

	NotesApi.create = (option: NotesCreateOption) => {
		return notes.create(option);
	};

	NotesApi.delete = (option: NotesDeleteOption) => {
		return notes.delete(option);
	};

	return NotesApi;
}
