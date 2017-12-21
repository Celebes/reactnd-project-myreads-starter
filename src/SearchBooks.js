import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from "./Book";
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        showingBooks: []
    }

    updateQuery = (newQuery) => {
        const {books} = this.props;
        this.setState({query: newQuery});

        if (!newQuery) {
            return;
        }

        BooksAPI.search(newQuery).then(result => {
            if ('error' in result) {
                this.setState({showingBooks: []});
            } else {
                let showingBooks = result;
                let booksOnShelvesIds = this.props.books.map(b => b.id);
                for (let b of showingBooks) {
                    if (booksOnShelvesIds.includes(b.id)) {
                        b.shelf = books.filter(bookFromShelf => bookFromShelf.id === b.id).shelf;
                    }
                }
                this.setState({showingBooks: showingBooks});
            }
        });
    }

    render() {
        const {query, showingBooks} = this.state;
        const {changeBookshelf} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value.trim())}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {showingBooks && (
                        <ol className="books-grid">
                            {showingBooks.map(book => <Book key={book.id}
                                                            book={book}
                                                            changeBookshelf={changeBookshelf}/>)}
                        </ol>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBooks;
