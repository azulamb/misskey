import { Misskey } from '../mod.ts';

const misskey = new Misskey();

//console.log(await misskey.api.meta());

// Load access token.
try {
	const config = await import('../config.json', {
		assert: { type: 'json' },
	});
	if (!config.default.access_token) {
		throw new Error('No config.');
	}
	misskey.setAccessToken(config.default.access_token);
	// deno-lint-ignore no-unused-vars
} catch (error) {
	const accessToken = prompt('Please input misskey access token:');
	if (!accessToken) {
		throw new Error(`Invalid access token.`);
	}
	misskey.setAccessToken(accessToken);
}

console.log(await misskey.api.notes({}));
/*const noteId = '9bmuoqzuq7';
if (noteId) {
	console.log(await misskey.api.notes.delete({ noteId: noteId }));
} else {
	console.log(
		await misskey.api.notes.create({
			visibility: 'home',
			text: 'テスト4',
		}),
	);
}*/
