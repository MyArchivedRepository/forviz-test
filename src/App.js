import React, { useState, useEffect } from "react";
import Frame from './components/frame/frame'

import './App.css';
import './components/frame/frame-styles.css'

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="App">   
      <Frame pattern='a' header='Gutter between images should be consistent at 4px both direction; horizontal and vertical.' images={images}/>
      <Frame pattern='b' header= 'Images are aligned on left and right edges' images={images}/>
    </div>
  );
}

export default App;

