import { useState } from "react";
import "./App.css";
import Header from "./Components/header";
import List from "./Components/list";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="App">
      <Header onSearch={setSearchQuery} />
      <List searchQuery={searchQuery} />
    </div>
  );
}

export default App;
