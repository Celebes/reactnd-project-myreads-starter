import React, {Component} from 'react';

class BookshelfChanger extends Component {
    handleSelectChange = (event) => {
        const {book, changeBookshelf} = this.props;
        const newShelf = event.target.value;
        this.setState({selectedShelf: newShelf});
        changeBookshelf(book, newShelf);
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedShelf: props.shelf || 'none'
        }
    }

    render() {

        const {selectedShelf} = this.state;

        return (
            <div className="book-shelf-changer">
                <select value={selectedShelf}
                        onChange={(event) => this.handleSelectChange(event)}>
                    <option value="empty" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookshelfChanger;
