const GetIsCurrentLength = function (line, maxlength) {
  return line.length <= maxlength;
};

GetIsCurrentLength('проверяемая строка', 20);

const getIsPalindrom = function (line) {
  const newLine = line.replaceAll(' ', '').toLowerCase();
  let emptyline = '';

  for (let i = newLine.length - 1; i >= 0; i = i - 1) {
    const char = newLine[i];
    emptyline = emptyline + char;
  }

  return newLine === emptyline;
};

getIsPalindrom('То Пот');
