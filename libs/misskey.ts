import { API } from './api.ts';

export class Misskey implements MisskeyAPI {
	protected misskeyBaseURL = 'https://misskey.io';
	protected misskeyAccessToken = '';

	get baseURL() {
		return this.misskeyBaseURL;
	}

	get accessToken() {
		return this.misskeyAccessToken;
	}

	public api: API;

	constructor() {
		this.api = new API('api', this);
	}

	public setAccessToken(accessToken: string) {
		this.misskeyAccessToken = accessToken;

		return this;
	}
}
