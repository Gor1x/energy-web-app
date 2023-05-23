//import {createAuthProvider} from 'react-token-auth'
import { createAuthProvider } from './react-token-auth/createAuthProvider'

export const {useAuth, authFetch, login, logout} =
    createAuthProvider({
        getAccessToken: (session) => session.access_token,
        onUpdateToken: (session) => 
        fetch('/auth/refresh', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${session.refresh_token}`}
        })
        .then(r => r.json())
        .then(json => ({...json, 'refresh_token': session.refresh_token})),
        expirationThresholdMillisec: 5000
    })