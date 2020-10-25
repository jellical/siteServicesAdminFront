import React, {
    createContext,
    useEffect,
    useReducer
} from 'react'
import SplashScreen from '../components/SplashScreen'
import axios from 'axios'

import { User } from '../types/User'

interface State {
    isAuthenticated: Boolean,
    isInitialised: Boolean,
    user: User | null
}

const initialAuthState : State = {
    isAuthenticated: false,
    isInitialised: false,
    user: null
};

const isValidToken = (accessToken:string) => {
    return accessToken

};

const setSession = (accessToken:string|null) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
};

const reducer = (state:any, action:any) => {
    switch (action.type) {
        case 'INITIALISE': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user
            };
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        default: {
            return { ...state }
        }
    }
};

const AuthContext = createContext({
    ...initialAuthState,
    login: (email: string, password: string) => Promise.resolve(),
    logout: () => { },
    register: (email: string, password: string, firstName: string, lastName: string) => Promise.resolve()
});

export const AuthProvider = ({ children }:{children:any}) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState)

    const login = async (email:string, password:string) => {
        const response = await axios.post('/api/user/login', { email, password })

        const { token, user } = response.data;

        setSession(token);
        dispatch({
            type: 'LOGIN',
            payload: {
                user
            }
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    };

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        const response = await axios.post('/api/users', {
            email,
            password,
            firstName,
            lastName
        })

        const { token, user } = response.data

        setSession(token)

        dispatch({
            type: 'REGISTER',
            payload: {
                user
            }
        });
    };



    useEffect(() => {
        const initialise = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)

                    const response = await axios.get('/api/self')
                    const  user  = { id:response.data.ref.id, ...response.data.data }


                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALISE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    })
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALISE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialise()
    }, [])

    if (!state.isInitialised) {
        return <SplashScreen />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;