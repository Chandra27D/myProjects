/* import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My Encounter with Voldemort', body: 'He is so mean and filthy', author: 'Harry Potter', id: 1 },
    { title: 'Why I hate Ron?', body: 'He is too stupid and does not understand even a single thing about love', author: 'Hermione Granger', id: 2 },
    { title: 'My Broken Wand', body: 'I do not why I am like this. Anything that I use kinda need reair the next time', author: 'Ron Weasley', id: 3 },
    { title: 'Experiment with Memory', body: 'I have been faking through all those times, I have actually very sharp memomy but the Hogwarts is so freaking scary that I do not want to keep anything in my memomry', author: 'Neville Longbottom', id: 4 },
    { title: 'Courage and Winning', body: 'Any battle can be defeated with courage and perseverance', author: 'Harry Potter', id: 5 },
  ])

  const [name, setName] = useState('Harry Potter');


  // Remember it doesn't change the original data instead it just updates the data as the function fires and returns a new array
  const handleDelete = (id) =>{
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs); 
  }


  useEffect(() =>{
    console.log('useEffect ran');
    console.log(name);
  }, [name])

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />
      {<BlogList blogs={blogs.filter ((blogs) => blogs.author === "Harry Potter")} title="Harry's Blogs!" />}
      <button onClick={() => setName ('Ginny')}>Change Name</button>
      <p>{ name}</p>
      </div>
  );
}
 
export default Home; */







/* import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null); */

  /* useEffect(() => {
      fetch('http://localhost:8000/blogs')
        .then (res =>{
          return res.json();
        })
        .then (data =>{
          setBlogs(data);
          setIsPending(false);
        });
  }, []); */

  //Just to see the loading message we are going to delay fetching the data for 2 extra seconds 

 /*  useEffect(() => {
    setTimeout(() =>{
      fetch('http://localhost:8000/blogs')
        .then (res =>{
          return res.json();
        })
        .then (data =>{
          setBlogs(data);
          setIsPending(false);
        });
    }, 2000);
  }, []);
 */

// Handling errors - Remember this is not an optimum method to handle errors and it can not be reused for all the pages, for that we need to set the custom hook that can be reused

/* import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true); //State for loading
  const [error, setError] = useState(null); //state for error

  useEffect(() => {
    fetch('http://localhost:8000/blogs') //Try changing blogs to blogss and you will be able to get the error message
      .then (res =>{
        if (!res.ok) {
          throw Error ('Can not fetch the data'); //throws the error when res is not ok
        }
        return res.json();
      })
      .then (data =>{
        setBlogs(data);
        setIsPending(false);
        setError(null); //When the data is getting fetched, set the pending to false and error to null
      })
      .catch(err =>{
        setIsPending(false);
        setError(err.message); //When the error is catched pending is set to false and error throws the error message
      })
      
}, []);


  return (
    <div className="home">
      { error && <div>{ error }</div> }
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
      </div>
  );
}
 
export default Home; */

// Using custom hook to fetch data and handling errors

import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
    </div>
  );
}
 
export default Home;