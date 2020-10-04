let { books, authors } = require("./db");

const addNewBook = ({ book }) => {
    const newId = books.length === 0 ? 1 : books[books.length - 1].id + 1;
    books = [...books, { ...book, id: newId }];
    console.log("newId is: ", newId);
    return book;
};

const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find((book) => book.id === id),
    },
    Mutation: {
        addNewBook: (_, { book }) => addNewBook({ book }),
        deleteBook: (_, { id }) => {
            console.log("deleting id: ", id);
            return books.find((book) => book.id === id);
        },
    },
};

module.exports = resolvers;
