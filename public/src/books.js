function findAuthorById(authors, id) {
  return authors.find(author=>author.id === id)
}

function findBookById(books, id) {
  return books.find(book=>book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let loanedout = books.filter(book=>book.borrows.some(borrow=>!borrow.returned))
  let returned = books.filter(book=>!loanedout.map(book=>book.id).includes(book.id) )
  return [loanedout, returned]
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
          .slice(0,10)
          .map(borrow=> {
            let account = accounts.find(account=>account.id === borrow.id)
            return { ...account, returned : borrow["returned"]}
          })
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
