export interface LoginValues {
    email: string;
    password: string;
}

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
}

export interface AuthServiceProps {
    onSuccess?: () => void;
    // eslint-disable-next-line no-unused-vars
    onFail?: (value: string) => void;
}

class AuthService {
    private onSuccess?: () => void;

    // eslint-disable-next-line no-unused-vars
    private onFail?: (value: string) => void;

    constructor(props: AuthServiceProps) {
        // Assign Callbacks
        this.onSuccess = props.onSuccess;
        this.onFail = props.onFail;
    }

    public login(values: LoginValues) {
        // Validate Data
        if (!this.validateEmail(values.email)) {
            this.errorHandler('Email error.');

            return;
        }

        if (!this.validatePassword(values.password)) {
            this.errorHandler('Password error.');

            return;
        }

        // eslint-disable-next-line no-undef
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        };

        fetch('http://localhost:8000/auth/login', requestOptions)
            .then((res) => res.json())
            .then((res) => {
                if (res.detail) {
                    this.errorHandler(res.detail);
                } else {
                    this.successHandler(res.token);
                }
            })
            .catch(() => {
                this.errorHandler('Network error.');
            });
    }

    public register(values: RegisterValues) {
        // Validate Data
        if (!this.validateEmail(values.email)) {
            this.errorHandler('Email error.');

            return;
        }

        if (!this.validateUsername(values.username)) {
            this.errorHandler('Password error.');

            return;
        }

        if (!this.validatePassword(values.password)) {
            this.errorHandler('Password error.');

            return;
        }

        // eslint-disable-next-line no-undef
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        };

        fetch('http://localhost:8000/auth/register', requestOptions)
            .then((res) => res.json())
            .then((res) => {
                if (res.detail) {
                    this.errorHandler(res.detail);
                } else {
                    this.successHandler(res.token);
                }
            })
            .catch(() => {
                this.errorHandler('Network error.');
            });
    }

    public refresh = () => {
        // eslint-disable-next-line no-undef
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        return fetch('http://localhost:8000/auth/refresh', requestOptions)
            .then((res) => res.json())
            .then((res) => {
                if (res.detail) {
                    this.errorHandler(res.detail);
                } else {
                    this.successHandler(res.token);
                }
            })
            .catch(() => {
                this.errorHandler('Network error.');
            });
    }

    public logout = () => localStorage.removeItem('token');

    public getToken = () => localStorage.getItem('token');

    // Helpers
    private errorHandler(value: string) {
        console.log(`[Auth Service] - ${value}`);

        if (this.onFail) {
            // TODO
            this.onFail(value);
        }
    }

    private successHandler(token: string) {
        localStorage.setItem('token', token);

        if (this.onSuccess) {
            this.onSuccess();
        }
    }

    // Validation
    private validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    private validatePassword = (value: string) => !!value.length;

    private validateUsername = (value: string) => !!value.length;
}

export default AuthService;
