import "./App.css";
import Generate from "./components/Generate";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Generate />
    </Provider>
  );
}

export default App;
