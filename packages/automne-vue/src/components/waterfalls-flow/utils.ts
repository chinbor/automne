export function getMinHeight(columnHeightsObj: Record<string, number>) {
  const columnHeights = Object.values(columnHeightsObj)
  return Math.min(...columnHeights)
}

export function getMinHeightColumn(columnHeightsObj: Record<string, number>) {
  const minHeight = getMinHeight(columnHeightsObj)

  return Object.keys(columnHeightsObj).find((key) => {
    return columnHeightsObj[key] === minHeight
  })!
}

export function getMaxHeight(columnHeightsObj: Record<string, number>) {
  const columnHeights = Object.values(columnHeightsObj)
  return Math.max(...columnHeights)
}
