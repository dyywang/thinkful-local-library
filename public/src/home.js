function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce( (acc, book) =>{
    if (!book.borrows.every(borrow=>borrow.returned===true)) acc ++
    return acc
  }, 0)
}

function topFive(list, field){
  return list.sort( (item1, item2)=> item1[field] < item2[field] ? 1 : - 1)
          .slice(0,5)
}

function getMostCommonGenres(books) {
  const bygenre = books.reduce( (acc, book) => {
    const genre = book.genre
    const genreindex = acc.findIndex(acciter => acciter.name === genre)
    if ( genreindex < 0) {
      acc.push({name: genre, count: 1})
    } else {
      acc[genreindex].count ++
    }
    return acc
  }, [])
  return topFive(bygenre, "count")
}

function getMostPopularBooks(books) {
  return topFive(books.reduce( (acc, book) => {
            acc.push({name: book.title, count: book.borrows.length})
            return acc
          }, [] ), "count")
}

function getMostPopularAuthors(books, authors) {
  return topFive(authors.map(author=>{
      const booksbyauthor = books.filter(book=>book.authorId === author.id)
      const count = booksbyauthor.reduce( (acc, book) => acc += book.borrows.length, 0)   
      const name = author.name.first + " " + author.name.last
      return {name: name, count: count}
    }) , "count")
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
