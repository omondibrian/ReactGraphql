import React from 'react'
import {useQuery} from 'react-apollo'
import { getBookQuery } from '../Queries/queries';



function BookDetails({bookId}) {
    let id = bookId
   const { data,loading } = useQuery(getBookQuery,{
       variables:{id }
   })
   const displayBookdetails = () =>{
       if(!loading){
        const {book} = data
         return ( <div>
            <h2> Book Title :{book.name}</h2> 
            <p>  Genre      :{book.genre}</p>
            <p>  Author     :{book.author.name}</p>
        {  book.author.books.length > 1 ?<>
            <p>  All books written by {book.author.name}</p>
                <ul className="other-books">
                    {
                        book.author.books.map( item=>{
                            return <li key={item.id}>{item.name}</li>
                        })
                    }
                </ul></>:null
            }
            </div>)
        }
   }
   console.log(data)
    return (
        <div >
           { displayBookdetails() }
        </div>
    )
}


export default BookDetails

