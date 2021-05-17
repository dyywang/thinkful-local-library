function findAccountById(accounts, id) {
  return accounts.find(account=>account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2)=> account1.name.last > account2.name.last ? 1 : -1 )
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce( (borrowcount, book) => {
    const borrowedthisbook = book.borrows.reduce( (count, borrow)=> { 
      if (borrow.id === account.id) count ++
      return count;
    } , 0)
    borrowcount += borrowedthisbook
    return borrowcount
  }, 0) 
}


function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce( (checkedout, book) =>{
    if (book.borrows.filter(borrow => borrow.id === account.id && !borrow.returned).length > 0) {
      const author = authors.find(author=>author.id === book.authorId)
      checkedout.push({...book, author})
    }  
    return checkedout
  }, [] )
}




module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
