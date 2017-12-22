import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from "./Book";
import * as BooksAPI from './BooksAPI'
import {Debounce} from 'react-throttle';

class SearchBooks extends Component {
    state = {
        showingBooks: []
    }

    updateQuery = (query) => {
        if (!query) {
            this.setState({showingBooks: []});
            return;
        }

        console.log('query', query);

        const {books} = this.props;

        BooksAPI.search(query).then(result => {
            console.log('result', result);
            if ('error' in result) { // api didn't find any results
                this.setState({showingBooks: []});
            } else {
                let showingBooks = result; // books from search results
                let booksOnShelvesIds = this.props.books.map(b => b.id); // ids of books already on shelf
                for (let b of showingBooks) {
                    if (booksOnShelvesIds.includes(b.id)) { // if book from search result is on any shelf
                        let bookFromShelf = books.find(bookFromShelf => bookFromShelf.id === b.id); // find it on shelf
                        if (bookFromShelf) {
                            b.shelf = bookFromShelf.shelf; // assign its current shelf to it on the search result view
                        }
                    }
                }
                this.setState({showingBooks: showingBooks});
            }
        });
    }

    render() {
        const {showingBooks} = this.state;
        const {changeBookshelf} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="500" handler="onChange">
                            <input type="text"
                                   placeholder="Search by title or author"
                                   onChange={(event) => this.updateQuery(event.target.value.trim())}/>
                        </Debounce>
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
