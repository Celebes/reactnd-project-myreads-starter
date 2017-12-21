import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((booksFromAPI) => {
            this.setState({
                books: booksFromAPI
            })
        })
    }

    changeBookshelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            let newBooks = this.state.books.slice();
            if (shelf === 'none') {
                // if book's shelf changed to none, remove it from shelves
                newBooks = newBooks.filter(b => b.id !== book.id);
            } else {
                // check if book was edited or freshly added to bookshelf
                let found = false;
                for (let b of newBooks) {
                    if (b.id === book.id) {
                        // if it was moved between bookshelves then update it
                        b.shelf = shelf;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // if it is a new book from search result, assign to shelf and add
                    book.shelf = shelf;
                    newBooks.push(book);
                }
            }

            this.setState({
                books: newBooks
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks books={this.state.books} changeBookshelf={this.changeBookshelf}/>
                )}/>
                <Route path="/search" render={() => (
                    <SearchBooks books={this.state.books} changeBookshelf={this.changeBookshelf}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
