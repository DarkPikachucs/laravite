import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	// set user to local storage
	const setUser = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};

	const fetchUser = async () => {
		try {
			const token = localStorage.getItem('currentToken');
			const headers = {};
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}
			const response = await axios.get('/user', { headers });
			setUser(response.data);
		} catch (error) {
			console.error("Error fetching user info:", error);
			if (error.response?.status === 401) {
				setUser(null);
				localStorage.removeItem('currentToken');
			}
		}
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const ssoToken = urlParams.get('sso_token');
		if (ssoToken) {
			localStorage.setItem('currentToken', ssoToken);
			window.history.replaceState({}, document.title, window.location.pathname);
		}

		if (localStorage.getItem('user') || localStorage.getItem('currentToken')) {
			fetchUser();
		}

		const handleStorageChange = (e) => {
			if (e.key === 'user' && e.newValue) {
				try {
					_setUser(JSON.parse(e.newValue));
				} catch (err) {}
			} else if (e.key === 'user' && !e.newValue) {
				_setUser(null);
			}
			
			if (e.key === 'currentToken' && e.newValue) {
				axios.defaults.headers.common['Authorization'] = `Bearer ${e.newValue}`;
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	// csrf token generation for guest methods
	const csrfToken = async () => {
		await axios.get('http://laravit.test/sanctum/csrf-cookie');
		return true;
	};

	return (
		<AuthContent.Provider value={{ user, setUser, csrfToken, fetchUser }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};
