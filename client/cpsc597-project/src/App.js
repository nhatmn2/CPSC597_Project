import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar"; /*this is for the top horizontal nav bar*/
import Sidebar from "./scenes/global/Sidebar"; /*this is for the left side vertical menu*/
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import FAQ from "./scenes/faq";
import Dataset from "./scenes/dataset";
import ContentCheck from "./scenes/contentcheck";
import DomainCheck from "./scenes/domaincheck";
import Contact from "./scenes/contact";
import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();
  
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className = 'app'>
        <main className='content'>
          <Topbar/>
          {/* Routing all the pages */}
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/dataset" element={<Dataset/>} />
            <Route path="/contentcheck" element={<ContentCheck/>} />
            <Route path="/domaincheck" element={<DomainCheck/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/calendar" element={<Calendar/>}/>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default App;
