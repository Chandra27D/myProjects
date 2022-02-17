//custom hooks in React need to start with the word use, otherwise it will be just a function.

/* import{ useState, useEffect} from 'react';

const useFetch = (url) =>{ 
    const [data, setData] = useState(null) //State for data
    const [isPending, setIsPending] = useState(true); //State for loading
    const [error, setError] = useState(null); //state for error
    useEffect(() => {
        
        const abortCont = new AbortController();

        setTimeout(() =>{
            fetch(url, {signal: abortCont.signal}) //Do not hardcode, instead pass a url
            .then (res =>{
              if (!res.ok) {
                throw Error ('Can not fetch the data'); //throws the error when res is not ok
              }
              return res.json();
            })
            .then (data =>{
              setData(data);
              setIsPending(false);
              setError(null); //When the data is getting fetched, set the pending to false and error to null
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else{
                    setIsPending(false);
                    setError(err.message); //When the error is catched pending is set to false and error throws the error message
                }
            })
        }, 1000)
       
          return () => abortCont.abort();
    }, [url]); //Pass the url as the dependency

    return { data, isPending, error }
}

export default useFetch; */




import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;