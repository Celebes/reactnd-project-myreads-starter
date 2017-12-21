import React, {Component} from 'react';
import BookshelfChanger from "./BookshelfChanger";

class Book extends Component {
    render() {
        const {book, changeBookshelf} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}></div>
                        <BookshelfChanger book={book} shelf={book.shelf} changeBookshelf={changeBookshelf}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book;
