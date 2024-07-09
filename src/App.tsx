import "./App.css";
import { QueryForm } from "./QueryForm/QueryForm";
import { Another } from "./another/Another";
import { Query } from "./default/Query";
import { ReactQuery } from "./react-query/ReactQuery";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Query />
        <ReactQuery />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
        <QueryForm />
      </div>
      <Another />
    </>
  );
}

export default App;
