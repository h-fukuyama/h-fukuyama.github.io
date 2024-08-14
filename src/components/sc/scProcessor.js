import { getActionResult1, getActionResult2 } from './scProcessorFunction';

export const scProcessor1 = ({ sc }) => {
  const datasets = [];
  for (let i = 0; i < 22400; i += 56) {
    if ((sc[i] === sc[i + 22400]) && sc[i] === '00') { //両方「コメント再生」
      const dataset = [
        [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]],
        [sc[i + 22401], sc[i + 22405], sc[i + 22409], sc[i + 22413], sc[i + 22417]],
      ];
      const firstArrayValue = dataset[0].find(value => value !== "");
      const secondArrayValue = dataset[1].find(value => value !== "");
      datasets.push([
        (i / 56) + 1,
        firstArrayValue || "<未登録>",
        secondArrayValue || "<未登録>",
      ]);
    } else if ((sc[i] === sc[i + 22400]) && sc[i] !== '00') { //両方コメント再生「以外」
      const actionResult = getActionResult1(sc, i);
      datasets.push([(i / 56) + 1, ...actionResult]);
    } else if ((sc[i] !== sc[i + 22400]) && sc[i] !== '00') {
      let actionResult = getActionResult1(sc, i);
      actionResult[1] = ['<未登録>'];
      datasets.push([(i / 56) + 1, ...actionResult]);
    }
  }
  return datasets;
};

export const scProcessor2 = ({ sc }) => {
  const datasets = [];
  for (let i = 44800; i < 45695; i += 56) {
    const isSameButton = sc[i] === sc[i + 448];
    if (isSameButton && sc[i] === '00') {
      const dataset = [
        [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]],
        [sc[i + 449], sc[i + 453], sc[i + 457], sc[i + 461], sc[i + 465]],
      ];
      const firstArrayValue = dataset[0].find(value => value !== "");
      const secondArrayValue = dataset[1].find(value => value !== "");
      datasets.push([
        (i / 56) - 799,
        firstArrayValue || "<未登録>",
        secondArrayValue || "<未登録>",
      ]);
    } else if (sc[i + 448] === undefined) {
      const dataset = [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]];
      const firstArrayValue = dataset.find(value => value !== "");
      const secondArrayValue = "";
      datasets.push([
        (i / 56) - 799,
        firstArrayValue || "<未登録>",
        secondArrayValue,
      ]);
    } else {
      const actionResult = getActionResult2(sc, i);
      datasets.push([(i / 56) - 799, ...actionResult]);
    }
  }
  return datasets;
};
