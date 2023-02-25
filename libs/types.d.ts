interface MisskeyAPI {
	// Base URL. ex: https://misskey.io
	readonly baseURL: string;
	readonly accessToken: string;
}

interface NotesAPI extends MisskeyAPI {
	// https://misskey-hub.net/docs/api/endpoints/notes.html
	(option: NotesOption): Promise<NotesResponse>;
	// https://misskey-hub.net/docs/api/endpoints/notes/children.html
	// children(option: NotesChildrenOption): Promise<Notes>;
	// https://misskey-hub.net/docs/api/endpoints/notes/clips.html
	// clips();
	// https://misskey-hub.net/docs/api/endpoints/notes/conversation.html
	// conversation();
	// https://misskey-hub.net/docs/api/endpoints/notes/create.html
	create(option: NotesCreateOption): Promise<NotesCreateResponse>;
	delete(option: NotesDeleteOption): Promise<void>;
}
