import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import MainPage from "./App";       // Your main page component
import PrivateRoute from "./Private_temp";    // Your private route component
import Dashboard  from "./dashboard";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected route */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard" element  = {<Dashboard/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
