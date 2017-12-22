import React from 'react';
import Book from "./Book";

function Bookshelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(book => <Book key={book.id} book={book} changeBookshelf={props.changeBookshelf}/>)}
                </ol>
            </div>
        </div>
    )
}

export default Bookshelf;
