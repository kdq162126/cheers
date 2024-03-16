const MAX_LEVEL = 100;

// [0-20]  -> 1.1
// [21-50] -> 1.05
const maxLevelMapPointRate = new Map<number, number>([
  [20, 1.1],
  [50, 1.05],
  [80, 1.03],
  [96, 1.02],
  [101, 1.01],
]);

export function calculateLevel(
  currentLevel: number,
  currentPoints: number,
  deltaPoints: number,
) {
  let pointsThreshold = calculatePointsUpThreshold(currentLevel + 1);

  while (deltaPoints + currentPoints >= pointsThreshold) {
    deltaPoints -= pointsThreshold - currentPoints;
    currentPoints = pointsThreshold;
    currentLevel++;
    pointsThreshold = calculatePointsUpThreshold(currentLevel + 1);
  }

  return Math.min(currentLevel, MAX_LEVEL);
}

export function calculatePointsUpThreshold(level: number) {
  let sum = 100;
  let deltaPoints = 100;

  for (let i = 1; i < level; i++) {
    const pointRate = selectPointRate(i);
    deltaPoints *= pointRate;
    sum += deltaPoints;
  }
  return Math.round(sum);
}

function selectPointRate(level: number) {
  for (const [maxLevel, rate] of maxLevelMapPointRate.entries()) {
    if (level <= maxLevel) {
      return rate;
    }
  }
  return 1;
}
