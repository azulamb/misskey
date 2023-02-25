// Request types.

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

// https://misskey-hub.net/docs/api/endpoints/notes/children.html
type NotesChildrenOption = {
	noteId: string;
	limit?: number; // 10
	sinceId?: string;
	untilId?: string;
};

// https://misskey-hub.net/docs/api/endpoints/notes/create.html
type NotesCreateOption = {
	visibility?: 'public' | 'home' | 'followers' | 'specified'; // public
	visibleUserIds?: string[];
	text?: string | null;
	cw?: string | null;
	localOnly?: boolean; // false
	noExtractMentions?: boolean; // false
	noExtractHashtags?: boolean; // false
	noExtractEmojis?: boolean; // false
	fileIds?: string[];
	mediaIds?: string[];
	replyId?: string | null;
	renoteId?: string | null;
	channelId?: string | null;
	poll?: {
		choices: string[];
		multiple?: boolean; // false
		expiresAt?: number | null;
		expiredAfter?: number | null;
	} | null;
};

type NotesDeleteOption = {
	noteId: string;
};

// Response types.

interface NotesCreateResponse {
	createdNote: Note;
}

type NotesResponse = Note[];

// Misskey object types.

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

// https://misskey-hub.net/docs/api/endpoints/meta.html
interface Meta {
	maintainerName: string | null;
	maintainerEmail: string | null;
	version: string;
	name: string;
	uri: string;
	description: string | null;
	langs: string[];
	tosUrl: string | null;
	repositoryUrl: string; // https://github.com/misskey-dev/misskey
	feedbackUrl: string; // https://github.com/misskey-dev/misskey/issues/new
	defaultDarkTheme: string | null;
	defaultLightTheme: string | null;
	disableRegistration: boolean;
	disableLocalTimeline: boolean;
	disableGlobalTimeline: boolean;
	driveCapacityPerLocalUserMb: number;
	driveCapacityPerRemoteUserMb: number;
	cacheRemoteFiles: boolean;
	emailRequiredForSignup: boolean;
	enableHcaptcha: boolean;
	hcaptchaSiteKey: string | null;
	enableRecaptcha: boolean;
	recaptchaSiteKey: string | null;
	swPublickey: string | null;
	mascotImageUrl: string; // /assets/ai.png
	bannerUrl: string;
	errorImageUrl: string; // https://xn--931a.moe/aiart/yubitun.png
	iconUrl: string | null;
	maxNoteTextLength: number;
	emojis: Emoji[];
	ads: Ad[];
	requireSetup: boolean;
	enableEmail: boolean;
	enableTwitterIntegration: boolean;
	enableGithubIntegration: boolean;
	enableDiscordIntegration: boolean;
	enableServiceWorker: boolean;
	translatorAvailable: boolean;
	proxyAccountName: string | null;
	features: {
		registration: boolean;
		localTimeLine: boolean;
		globalTimeLine: boolean;
		elasticsearch: boolean;
		hcaptcha: boolean;
		recaptcha: boolean;
		objectStorage: boolean;
		twitter: boolean;
		github: boolean;
		discord: boolean;
		serviceWorker: boolean;
		miauth: boolean; // true
	};
}

interface Emoji {
	id: string;
	aliases: string[];
	category: string | null;
	host: string | null;
	url: string;
}

interface Ad {
	place: string;
	url: string;
	imageUrl: string;
}
