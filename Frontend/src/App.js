import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateEmployee from './components/CreateEmployee';


function App() {
  return ( 
      <BrowserRouter>
        <Header/>
        <Routes>
          
              <Route path="/" element={<ListEmployee/>}/>
              <Route path="/employees" element={<ListEmployee/>}/>
              <Route path="/createemployee" element={<CreateEmployee/>}/>
              <Route path="/edit-employee/:id" element={<CreateEmployee/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>   
  );
}

export default App;
