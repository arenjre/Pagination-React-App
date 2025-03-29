import logo from "./logo.svg";
import "./App.css";
import { Container } from "@mui/material";
import DataListComponent from "./components/DataListComponent";

function App() {
  return (
    <div className="App">
      <Container>
        <DataListComponent />
      </Container>
    </div>
  );
}

export default App;
