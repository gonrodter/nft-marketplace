import { useEffect } from 'react';
// import useLocalStorage from 'use-local-storage';
// import { FaMoon } from "react-icons/fa";
import './App.css';
import Install from './components/Install';
import Home from './components/Home';

function App() {

  if(window.ethereum){
    return <Home />
  }else{
    return <Install />
  }
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  // const switchTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  // }

  // return (
    
  //   <div>
  //     {/* <div className='app' data-theme={theme}> */}
      
  //     {/* <div>
  //       <button className='switchThemeButton' onClick={switchTheme}>
  //         <FaMoon />;
  //       </button>
  //     </div> */}
  //   </div>
  // )
}

export default App;