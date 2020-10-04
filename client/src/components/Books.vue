<template>
    <div>
        <div>
            Book Name:
            <input type="text" v-model="newBook" />
            <button @click="addBook">Add Book</button>
        </div>
        <div v-for="book in books" :key="book.id">
            {{ book.name }} --
            <button @click="delBook(book.id)">Delete</button>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

const ALL_BOOKS_QUERY = gql`
    query {
        books {
            id
            name
        }
    }
`;

const ADD_NEW_BOOK_MUTATION = gql`
    mutation addNewBook($name: String!) {
        addNewBook(book: { name: $name }) {
            name
        }
    }
`;

const DELETE_BOOK_MUTATION = gql`
    mutation deleteBook($id: Int!) {
        deleteBook(id: $id) {
            name
        }
    }
`;

export default {
    data() {
        return {
            newBook: "",
        };
    },
    apollo: {
        books: {
            query: ALL_BOOKS_QUERY,
        },
    },
    methods: {
        addBook() {
            this.$apollo.mutate({
                mutation: ADD_NEW_BOOK_MUTATION,
                variables: {
                    name: this.newBook,
                },
                update: (store) => {
                    let data = store.readQuery({ query: ALL_BOOKS_QUERY });
                    data.books.push({ name: this.newBook });
                },
            });
        },
        delBook(id) {
            this.$apollo.mutate({
                mutation: DELETE_BOOK_MUTATION,
                variables: {
                    id,
                },
                update: (store) => {
                    let data = store.readQuery({ query: ALL_BOOKS_QUERY });
                    data.books = data.books.filter((book) => book.id !== id);
                },
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
