import {useState, useCallback, useRef, useEffect} from 'react';

const useHttpClient=()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]); // Stores data across re-render cycles.

    const sendRequest = useCallback(
        async (url, method='GET', body=null, headers={})=>{
            setIsLoading(true);

            const httpAbortController = new AbortController();
            activeHttpRequests.current.push(httpAbortController);
            
            try{

                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal:httpAbortController.signal
                });

                const data = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    requestController => requestController !== httpAbortController
                );

                if (!response.ok) {                    
                    throw new Error(data.message);
                }
                setIsLoading(false);
                return data;
            }catch(err){
                setError(err.message || 'Something went wrong!'); // Default error message shouldn't be required, as backend has a default error message anyways.
                setIsLoading(false);
                throw err;
            }
    }, []);

    function clearErrorHandler(){
        setError(null);
    }

    // Runs when this element mounts.
    useEffect(() => {
        return () => {
            // Returned function: Runs a clean up logic when this element unmounts.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);


    return {isLoading, error, sendRequest, clearErrorHandler};
}

export default useHttpClient;