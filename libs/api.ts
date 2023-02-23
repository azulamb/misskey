import { APIBase } from './api_base.ts';
import { createNotes } from './notes.ts';

export class API extends APIBase {
	public notes: NotesAPI;

	constructor(path: string, parent: MisskeyAPI) {
		super(path, parent);

		this.notes = createNotes('notes', this);
	}

	public meta(detail = true) {
		return this.fetch(this.baseURL + '/meta', { detail: detail });
	}
}
