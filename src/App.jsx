import React, { useEffect } from 'react';
import './App.css'

function App() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);


  return (
    <>
      <div>
       
      </div>
      
      <div className="text-center bg-primary text-white p-5">
        <h1>Hello Feedback System!</h1>
      </div>

    </>
  )
}

export default App
