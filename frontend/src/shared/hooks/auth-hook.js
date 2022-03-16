import {useState, useCallback, useEffect} from 'react';

let logoutTimer;

function useAuth(){
    const [token, setToken] = useState(false);
    const [tokenExpiryDateState, setTokenExpiryDateState] = useState();
    const [userId, setUserId] = useState(); //useState(false);

    const login = useCallback((uid, token, expirationDateStored) => {
        setToken(token);
        setUserId(uid);

        // 1hr token expiry time or default to expiry time present in storage:
        const tokenExpiryDate =
            expirationDateStored ||
            new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpiryDateState(tokenExpiryDate);

        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpiryDate.toISOString(),
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpiryDateState(null);
        localStorage.removeItem('userData');
    }, []);

    // Use the timer, whenever the token changes (due to login or logout).
    useEffect(() => {
        // When login, we set a new timer.
        // When logout, we clear the timer.
        if (token && tokenExpiryDateState) {
            const remainingTime =
                tokenExpiryDateState.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpiryDateState]);

    // Use effect occurs after the render cycle.
    // Only runs once, after the component mounts.
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        // Is there any stored data and has the token not expired yet?
        if (
            storedUserData &&
            storedUserData.token &&
            inFuture(storedUserData.expiration)
        ) {
            login(
                storedUserData.userId,
                storedUserData.token,
                new Date(storedUserData.expiration)
            );
        }

        function inFuture(futureDate) {
            return new Date(futureDate) > new Date();
        }
    }, [login]);

    return {token, login, logout, userId};
}

export default useAuth;