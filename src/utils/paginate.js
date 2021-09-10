export function paginate(array, currentPage, pageSize) {
  const startCut = (currentPage - 1) * pageSize;
  const finishCut = currentPage * pageSize;
  const newArr = array.slice(startCut, finishCut);
  return newArr;
}
