import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Bookshelf from "./Bookshelf";

class ListBooks extends Component {
    render() {
        const {books, changeBookshelf} = this.props;

        let currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading');
        let wantToReadBooks = books.filter(book => book.shelf === 'wantToRead');
        let readBooks = books.filter(book => book.shelf === 'read');

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf bookshelfTitle="Currently Reading"
                                   books={currentlyReadingBooks}
                                   changeBookshelf={changeBookshelf}/>
                        <Bookshelf bookshelfTitle="Want to Read"
                                   books={wantToReadBooks}
                                   changeBookshelf={changeBookshelf}/>
                        <Bookshelf bookshelfTitle="Read"
                                   books={readBooks}
                                   changeBookshelf={changeBookshelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;
