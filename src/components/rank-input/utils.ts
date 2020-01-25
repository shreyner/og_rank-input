import {Rank} from "./types";

type A = {
  name: string;
  children?: A[];
  points?: number[];
  minValue: number;
  maxValue: number;
}

export const normalizerRankScheme = (rankScheme: ReadonlyArray<Rank>, lastObject = {counter: 0}): A[] => {
  return rankScheme.reduce<A[]>((acc, item) => {
    let minValue = lastObject.counter;

    const points =
      item.points !== undefined
        ? Array.from(Array(item.points.count)).map(() => lastObject.counter++)
        : undefined;

    const children =
      item.rank !== undefined
        ? normalizerRankScheme(item.rank, lastObject)
        : undefined;

    acc.push({
      name: item.name,
      children,
      points,
      minValue,
      maxValue: lastObject.counter
    });

    return acc;
  }, []);
};

type SelectOptions  = {
  name: string;
  value: string;
  selected?: boolean;
}

type B = {
  name: string;
  options: SelectOptions[];
  value: string;
  selected: boolean;
};

export const generateElements = (data1: A[], value: number, pointName: string): B[] => {
  let lastElements: A[] | undefined = data1;
  let selectedName = "select1";
  let elements: Record<string, B> = {};

  while (lastElements !== undefined && lastElements.length !== 0) {
    const currentElements: ReadonlyArray<any> | undefined = lastElements;
    lastElements = undefined;
    let selectName;

    for (let i = 0; i < currentElements.length; i++) {
      const currentItem: any = currentElements[i];
      const element = elements[selectedName] || {
        name: selectedName,
        options: []
      };

      if (currentItem.minValue <= value && value < currentItem.maxValue) {
        lastElements = currentItem.children;
        selectName = currentItem.name;
      }

      element.options && element.options.push({
        name: currentItem.name,
        value: currentItem.minValue,
        selected: selectName === currentItem.name
      });

      elements[selectedName] = element;

      if (
        currentItem.points &&
        currentItem.minValue <= value &&
        value < currentItem.maxValue
      ) {
        elements[selectedName + "_points"] = {
          name: selectedName + "_points",
          options: currentItem.points.map((item: any, index: number) => ({
            name: `${index} ${pointName}`,
            value: item,
            selected: item === value
          }))
        } as B;
      }
    }

    selectedName = lastElements ? selectName : undefined;
  }

  return Object.values(elements);
};
