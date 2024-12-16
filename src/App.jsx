import "./App.css";
import ChangeValyuta from "./components/changeValyuta/ChangeValyuta";
import Diogram from "./components/diogramma/Diogram";
import Navbar from "./components/navbar/Navbar";
import Tranzaksiya from "./components/tranzaksiyalar/Tranzaksiya";

function App() {
  return (
    <div>
      <Navbar />
      <ChangeValyuta />
      {/* <Overview /> */}
      <Tranzaksiya />
      <Diogram />
    </div>
  );
}

export default App;
