// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAuthors() {
  // Query the database and return all authors 
 


  // Define the SQL query to fetch all books from the 'books' table
  const queryText = "SELECT * FROM authors"; 
  const result = await pool.query(queryText);
// The rows property of the result object contains the retrieved records
  return result.rows;
}
export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null
  // Define the SQL query to fetch the book with the specified id from the 'authors' table
 const queryText = "SELECT * FROM authors WHERE id = $1"; 
//[id] = $1
  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
 const result = await pool.query(queryText, [id]);
   // The rows property of the result object contains the retrieved records
  // If a author with the specified id exists, it will be the first element in the rows array
  // If no author exists with the specified id, the rows array will be empty
 return result.rows[0]|| null;
  // The rows property of the result object contains the retrieved records
  // If a book with the specified id exists, it will be the first element in the rows array
  // If no book exists with the specified id, the rows array will be empty
  //return result.rows[0] || null; 

}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author

  const queryText = 
    "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *";
  
  const result = await pool.query(queryText,[author.first_name, author.last_name]);
  
  return result.rows[0]; 
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null
  const queryText = "UPDATE authors SET first_name = $2, last_name = $3 WHERE id = $1 RETURNING *";

  const result = await pool.query(queryText, [id, updates.first_name, updates.last_name]);

  return result.rows[0] || null;
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null
  const queryText = "DELETE FROM authors WHERE id = $1 RETURNING *";

  const result = await pool.query(queryText, [id]);

  return result.rows[0] || null;
}

