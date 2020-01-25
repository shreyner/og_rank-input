import React, {useState} from 'react';
import {LoLMobileRankScheme, LoLRankScheme} from "./game-ranks"
import RankInput from "./components/rank-input";

const App: React.FC = () => {
  const [lolPoint, setLoLPoint] = useState(0);
  const [lolMobilePoint, setLolMobilePoint] = useState(0);

  return (
    <div>
      <h1>Ranked input</h1>
      <RankInput scheme={LoLRankScheme} value={lolPoint} onChange={setLoLPoint}/>
      <br/>
      <RankInput scheme={LoLMobileRankScheme} value={lolMobilePoint} onChange={setLolMobilePoint}/>
      <br/>
    </div>
  );
};

export default App;
