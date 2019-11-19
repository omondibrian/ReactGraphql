import React,{useState} from 'react'
import {useQuery} from 'react-apollo'
import { getBooksQuery } from '../Queries/queries';
import BookDetails from './bookDetails';

function BookList() {
   const [selected,setSelected] = useState('')
   const {loading,data } = useQuery(getBooksQuery)

 const displayBooks = ()=> { 
     if(loading){ 
       return <div> loading ...</div>
    }else{
        return data.books.map(book =>{
        const handleClick = () =>{
             setSelected(book.id)
        }
            return <li key={book.id} onClick={handleClick}>{book.name}</li>
        } )
    }}

    return (
        <div>
            <ul id="book-list">  
                {displayBooks()}
                
            </ul>
            <div id='book-details'>
            {selected ? <BookDetails bookId={selected} />:<div>No book Selected</div>}
            
            </div>
        </div>
    )
}


export default BookList

