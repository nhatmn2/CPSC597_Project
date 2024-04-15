import { useState } from "react";
import { Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import CustomSidebar from "./scenes/global/Sidebar";
//import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
//import Team from "./scenes/team";
//import FAQ from "./scenes/faq";
//import Dataset from "./scenes/dataset";
//import ContentCheck from "./scenes/contentcheck";
//import DomainCheck from "./scenes/domaincheck";
//import Contacts from "./scenes/contacts";
//import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className = 'app'>
        <CustomSidebar isSidebar={isSidebar}/>
        <main className='content'>
          <Topbar setIsSidebar={setIsSidebar}/>
          {/* Routing all the pages */}
          <Routes>
            {/*<Route path="/" element={<Dashboard/>} />*/}
            {/*<Route path="/contact" element={<Contacts/>} />*/}
            {/*<Route path="/team" element={<Team />} />
            <Route path="/dataset" element={<Dataset/>} />
            <Route path="/contentcheck" element={<ContentCheck/>} />
            <Route path="/domaincheck" element={<DomainCheck/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/calendar" element={<Calendar/>}/>*/}
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default App;

