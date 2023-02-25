export class APIBase implements MisskeyAPI {
	protected path: string;
	protected parent: MisskeyAPI;

	get baseURL() {
		return this.parent.baseURL + '/' + this.path;
	}
	get accessToken() {
		return this.parent.accessToken;
	}

	constructor(path: string, parent: MisskeyAPI) {
		const addPath = path.replace(/\s+/g, '').replace(/\/{1,}/g, '/').replace(/^\//, '').replace(/\/$/, '');
		if (!addPath) {
			throw new Error(`Invalid path: "${path}".`);
		}
		this.path = path;
		this.parent = parent;
	}

	protected beforeFetch(requestInit?: RequestInit) {
		const init: RequestInit = requestInit ? Object.assign({}, requestInit) : {};

		if (!init.method) {
			init.method = 'POST';
		}

		if (!init.headers) {
			init.headers = new Headers();
		} else {
			init.headers = new Headers(init.headers);
		}
		init.headers.set('Content-Type', 'application/json');

		return init;
	}

	public fetch<T>(input: string | URL | Request, params: Record<string, unknown>, requestInit?: RequestInit): Promise<T> {
		const init = this.beforeFetch(requestInit);

		const accessToken = this.accessToken;
		init.body = JSON.stringify(
			accessToken
				? Object.assign({
					i: this.accessToken,
				}, params)
				: params,
		);

		return fetch(input, init).then((response) => {
			return response.json().then((result) => {
				if (!response.ok) {
					throw new Error('API Error:', { cause: result });
				}
				return <T> result;
			});
		});
	}

	public authorizedFetch<T>(input: string | URL | Request, params: Record<string, unknown>, requestInit?: RequestInit): Promise<T> {
		const init = this.beforeFetch(requestInit);

		const accessToken = this.accessToken;

		if (!accessToken) {
			return Promise.reject(new Error('No access token has been set.'));
		}

		init.body = JSON.stringify(Object.assign({
			i: accessToken,
		}, params));

		return fetch(input, init).then((response) => {
			return response.text().then((result) => {
				if (!response.ok) {
					throw new Error('API Error:', { cause: result });
				}
				return <T> (result ? JSON.parse(result) : {});
			});
		});
	}
}
