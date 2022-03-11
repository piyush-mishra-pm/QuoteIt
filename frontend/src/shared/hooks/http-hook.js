import {useState, useCallback, useRef, useEffect} from 'react';

function useHttpClient(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]); // Stores data across re-render cycles.

    useCallback(async function sendRequest(url, method='GET', body=null, header={}){
        try{
            setIsLoading(true);

            const httpAbortController = new AbortController();
            activeHttpRequests.current.push(httpAbortController);

            const response = await fetch(url, {
                method,
                body,
                headers,
                signal:httpAbortController.signal
            });

            const data = response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        }catch(err){
            setError(err.message);
        }

        setIsLoading(false);
    }, []);

    function clearErrorHandler(){
        setError(null);
    }

    // Runs when this element mounts.
    useEffect(() =>{

        // Returned Function: Runs a clean up logic when this element unmounts.
        return () => {
            activeHttpRequests.current.forEach(abortController => abortController.abort());
        };
    }, []);

    return {isLoading, error, sendRequest, clearErrorHandler};
}

export default useHttpClient;