import { useState } from "react";
import "./App.css";
import data from "./data/data.json";

enum Difficulty {
  SUPER_EASY = "super_easy",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  SUPER_HARD = "super_hard",
}

type Star = {
  picture: string;
  name: string;
  difficulty?: Difficulty;
};

function App() {
  const dataStars = data.data.reduce((acc: Star[], curr) => {
    const currentAlreadyInStars = acc.some((star) => star.name === curr.name);
    if (currentAlreadyInStars) {
      return acc;
    }
    return [...acc, { name: curr.name, picture: curr.img }];
  }, []);

  const [stars, setStars] = useState<Star[]>(dataStars);
  const [validatedStars, setValidatedStars] = useState<Star[]>([]);

  const validateStar = (star: Star, difficulty: Difficulty, index: number) => {
    const validatedStarIndex = validatedStars.findIndex(
      (currentStar) => currentStar.name === star.name
    );
    setValidatedStars([
      ...(validatedStarIndex !== -1
        ? validatedStars
        : validatedStars.splice(validatedStarIndex, 1)),
      { ...star, difficulty },
    ]);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileContent = JSON.stringify({ stars: validatedStars });
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(fileContent);
    element.setAttribute("href", dataStr);
    element.setAttribute("download", "stars.json");
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Il y a actuellement {validatedStars.length}/{stars.length} stars
          validées
        </p>
        <div className="stargrid">
          {stars.map((star, index) => (
            <div className="star" key={star.name}>
              <img src={star.picture} alt={star.name} />
              <p>{star.name}</p>
              <div className="difficultyPicker">
                <button
                  name="difficulty"
                  onClick={() =>
                    validateStar(star, Difficulty.SUPER_EASY, index)
                  }
                >
                  1
                </button>
                <button
                  name="difficulty"
                  onClick={() => validateStar(star, Difficulty.EASY, index)}
                >
                  2
                </button>
                <button
                  name="difficulty"
                  onClick={() => validateStar(star, Difficulty.MEDIUM, index)}
                >
                  3
                </button>
                <button
                  name="difficulty"
                  onClick={() => validateStar(star, Difficulty.HARD, index)}
                >
                  4
                </button>
                <button
                  name="difficulty"
                  onClick={() =>
                    validateStar(star, Difficulty.SUPER_HARD, index)
                  }
                >
                  5
                </button>
              </div>
            </div>
          ))}
        </div>

        <button name="validate" onClick={() => handleDownload()}>
          Download
        </button>
      </header>
    </div>
  );
}

export default App;
