import React, {Component} from 'react';
import BookshelfChanger from "./BookshelfChanger";

class Book extends Component {
    render() {
        const {book, changeBookshelf} = this.props;

        const bookCoverStyle = {
            backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : 'none'
        };

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={bookCoverStyle}></div>
                        <BookshelfChanger book={book} shelf={book.shelf} changeBookshelf={changeBookshelf}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && (
                        <div className="book-authors">{book.authors.join(', ')}</div>
                    )}
                </div>
            </li>
        )
    }
}

export default Book;
