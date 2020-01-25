import React, {useCallback, useMemo} from "react";
import {RankScheme} from "./types"
import {generateElements, normalizerRankScheme} from "./utils";

type RankInputProps = {
  scheme: RankScheme;
  value: number;
  onChange: (value: number) => void;
}

export const RankInput: React.FC<RankInputProps> = ({scheme, value, onChange}) => {
  const {rank: rankScheme, pointName} = scheme;

  const rank = useMemo(() => {
    return normalizerRankScheme(rankScheme);
  }, [rankScheme]);

  const elements = useMemo(() => {
    return generateElements(rank, value, pointName);
  }, [rank, pointName, value]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    onChange(value);
  }, [onChange]);

  return <div>
    {elements.map(element => (<select key={element.name} name={element.name} onChange={handleChange}>
      {element.options.map((option: any) => (<option key={option.value} value={option.value}>{option.name}</option>))}
    </select>))}
  </div>;
};
