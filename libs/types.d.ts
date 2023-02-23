interface MisskeyAPI {
	// Base URL. ex: https://misskey.io
	readonly baseURL: string;
	readonly accessToken: string;
}

interface NotesAPI extends MisskeyAPI {
	// https://misskey-hub.net/docs/api/endpoints/notes.html
	(option: NotesOption): Promise<Note[]>;
	children(): void;
}

// https://misskey-hub.net/docs/api/endpoints/notes.html
type NotesOption = {
	local?: boolean;
	reply?: boolean;
	renote?: boolean;
	withFiles?: boolean;
	poll?: boolean;
	limit?: number;
	sinceId?: string;
	untilId?: string;
};

// Response types.

// https://misskey-hub.net/docs/api/entity/note.html
interface Note {
	id: string;
	createdAt: string;
	text: string | null;
	cw: string | null;
	user: User;
	userId: string;
	visibility: 'public' | 'home' | 'followers' | 'specified';
}

// https://misskey-hub.net/docs/api/entity/user.html
interface User {
	id: string;
	createdAt: string;
	username: string;
	host: string | null;
	name: string;
	onlineStatus: 'online' | 'active' | 'offline' | 'unknown';
	avatarUrl: string;
	avatarBlurhash: string;
}
