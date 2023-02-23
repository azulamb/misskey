import { Misskey } from '../mod.ts';

const misskey = new Misskey();

const accessToken = prompt('Please input misskey access token:');
if (!accessToken) {
	throw new Error(`Invalid access token.`);
}
misskey.setAccessToken(accessToken);
console.log(await misskey.api.meta());
//const notes = await misskey.api.notes({});
//console.log(notes);
//misskey.api.notes.children();
