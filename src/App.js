import logo from './logo.svg';
import './App.css';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

const CounterContext = React.createContext(1);

function CounterProvider({children}) {
  const [count, setCount] = useState(1);
  const value = useMemo(() => ({count, setCount}), [count]);

return (<CounterContext.Provider value={value}>
    {children}
  </CounterContext.Provider>
)}

function PortalledComponent({container}) {
  const {count} = useContext(CounterContext);
  return ReactDOM.createPortal(
    <div>REACT COUNT {count}</div>,
    container
  );
}

function CounterComp(){
  const {setCount, count} = useContext(CounterContext);

  return <button className='my-button' onClick={() => setCount(count + 1)}>CLICK COUNTER BUTTON</button>
}



function App() {
  const [divs, setDiv] = useState([]);
  useEffect(() => {
    const divs = document.getElementsByTagName('div');
    setDiv(Array.from(divs));
  }, [])
  return (
    <div className="App">
      <CounterProvider>
        <CounterComp />
     {divs.map(div => <PortalledComponent container={div}/>)}
     </CounterProvider>
    </div>
  );
}

export default App;
