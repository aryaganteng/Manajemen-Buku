import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Beranda from './components/Beranda';
import ManajemenBuku from './components/ManajemenBuku';
import Navbar from './components/Navbar';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  function retrieveData() {
    axios
      .get("http://localhost:4000/book")
      .then((response) => {
        setBooks(response.data);
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  function storeData(inputBook) {
    // console.log(inputBook);
    // alert("Data Berhasil ditambahkan")

    axios
      .post("http://localhost:4000/book/add", inputBook)
      .then((res) => {
        setBooks((prevBooks) => [...prevBooks, inputBook]);
        alert("Data berhasil ditambahkan !");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  function updateData(inputBook) {
    // console.log(inputBook);
    // alert("Data Berhasil diperbarui")

    axios
      .put("http://localhost:4000/book/update/" + inputBook._id, inputBook)
      .then((res) => {
        retrieveData();
        alert("Data berhasil diperbarui !");
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
  function deleteData(book) {
    // console.log(book);
    // alert("Data Berhasil dihapus")
    axios
      .delete("http://localhost:4000/book/delete/" + book._id)
      .then(() => {
        retrieveData();
        alert("Data berhasil dihapus!");
      })
      .catch((error) => {
        console.log(error.response.data)
      });
  }
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact>
              <Beranda bookList={books} />
            </Route>
            <Route path="/manajemen-buku"> 
              <ManajemenBuku bookList={books} store={storeData} update={updateData} remove={deleteData}/>
            </Route>  
        </Switch>
      </Router>
    </div>
  );
}

export default App;
