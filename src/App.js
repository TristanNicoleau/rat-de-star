import logo from './logo.svg';
import './App.css';

import data from './data/data.json'
import { useState } from 'react';

function App() {
  const [stars, setStars] = useState(data.data)
  const [validatedStars, setValidatedStars] = useState([])

  const validateStar = (star, index) => {
    if (validatedStars.some((currentStar) => currentStar.name === star.name)) {
      console.log(star);
      console.log(index);
      setValidatedStars([...validatedStars, star])
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Il y a actuellement {validatedStars.length}/{stars.length} stars validées</p>

        <div className="stargrid">
          {stars.map((star, index) =>
            <div className="star" key={star.name} onClick={() => validateStar(star, index)}>
              <img src={star.img} alt={star.name} />
              <p>{star.name}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
