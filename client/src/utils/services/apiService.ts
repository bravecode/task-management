/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import AuthService from './authService';

interface APIServiceProps {
    useTokenHeader?: boolean;
    useJSONHeader?: boolean;
    onSuccess?: (data: any) => void;
    onFail?: () => void;
    onDone?: () => void;
}

class APIService {
    private authService = new AuthService({});

    // ENV Configuration
    private baseURL = 'http://localhost:8000';

    // Configuration
    private useJWT: boolean = true;

    private useJSON: boolean = true;

    // Callbacks
    private onSuccess: (data: any) => void = () => {};

    private onFail: (message: string) => void = () => {};

    private onDone: () => void = () => {};

    constructor(props: APIServiceProps) {
        console.log('API Service Initialized.');

        if (typeof props.useTokenHeader !== 'undefined') {
            this.useJWT = props.useTokenHeader;
        }

        if (typeof props.useJSONHeader !== 'undefined') {
            this.useJSON = props.useJSONHeader;
        }

        if (props.onSuccess) {
            this.onSuccess = props.onSuccess;
        }

        if (props.onFail) {
            this.onFail = props.onFail;
        }

        if (props.onDone) {
            this.onDone = props.onDone;
        }
    }

    public get(path: string, { headers, ...options }: RequestInit = {}) {
        this.handleRequest(path, {
            method: 'GET',
            headers: this.getHeaders(headers),
            ...options,
        });
    }

    public post(path: string, data: string, { headers, ...options }: RequestInit = {}) {
        this.handleRequest(path, {
            method: 'POST',
            headers: this.getHeaders(headers),
            body: data,
            ...options,
        });
    }

    public put(path: string, data: string, { headers, ...options }: RequestInit = {}) {
        this.handleRequest(path, {
            method: 'PUT',
            headers: this.getHeaders(headers),
            body: data,
            ...options,
        });
    }

    public delete(path: string, { headers, ...options }: RequestInit = {}) {
        this.handleRequest(path, {
            method: 'DELETE',
            headers: this.getHeaders(headers),
            ...options,
        });
    }

    private handleRequest(path: string, options: RequestInit) {
        return fetch(this.getURL(path), options)
            .then((res) => res.json())
            .then((res) => {
                if (res.detail) {
                    this.onFail(res.detail);
                } else {
                    this.onSuccess(res);
                }
            })
            .catch(() => {
                this.onFail('Network error, try again later.');
            })
            .finally(() => {
                this.onDone();
            });
    }

    // Helpers
    private getHeaders(initial: HeadersInit = {}) {
        const headers = new Headers(initial);

        // Include Token
        if (this.useJWT) {
            const token = this.authService.getToken();
            headers.append('Authorization', `Bearer ${token}`);
        }

        // Assume data is JSON
        if (this.useJSON) {
            headers.append('Content-Type', 'application/json');
        }

        return headers;
    }

    private getURL = (path: string) => `${this.baseURL}${path}`;
}

export default APIService;
