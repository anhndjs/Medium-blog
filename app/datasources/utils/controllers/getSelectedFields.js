function getSelectedFieldsWithoutRecursive(selections) {
  return selections.map(item => item.name.value);
}

module.exports = { getSelectedFieldsWithoutRecursive };
