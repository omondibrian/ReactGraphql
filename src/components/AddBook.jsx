import React,{useState} from 'react'
import {useQuery,useMutation} from 'react-apollo'
import { getAuthorsQuery, addBookMutation,getBooksQuery } from '../Queries/queries';

function AddBook() {
    const [state,setState] = useState({
        name:'',genre:'',authorId:''
    })
    const {name,genre,authorId} = state
    const {loading,data} = useQuery(getAuthorsQuery);
    const[addBook,{error}] = useMutation(addBookMutation,{
       variables:{name,genre,authorId},
       refetchQueries:[{query:getBooksQuery}]
         
       
   })
   if(error){
       console.log("error:",error);
   }
   const handleChange = (e) => {
       setState({
           ...state,
           [e.target.name]:e.target.value
       })
   }
   const handleSubmit = (e)=> {
        e.preventDefault();
        addBook()
   }
    const displayAuthors = ()=>{
        if (loading) {
            return <option disabled> Loading Authors</option>
        } else {
            return data.authors.map(author=>{
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }
    return (
        <form  id="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label >Book name:</label>
                <input type="text" name='name' onChange={handleChange}/>
            </div>

            <div className="field">
                <label >Genre:</label>
                <input type="text" name='genre' onChange={handleChange}/>
            </div>

            <div className="field">
                <label >Author:</label>
               <select name='authorId' onChange={handleChange} >
                   <option> Select Author </option>
                   {displayAuthors()}
               </select>
            </div>
            <button>+</button>
        </form>
    )
}


export default AddBook

