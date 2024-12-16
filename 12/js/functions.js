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

const getIsGoodMeeting = function (
  startDay,
  endDay,
  startMeeting,
  durationMeeting
) {
  const getMinutesFromTime = (time) => {
    const arrayFromString = time.split(':');
    const hours = Number(arrayFromString[0]);
    const minutes = Number(arrayFromString[1]);

    const result = hours * 60 + minutes;

    return result;
  };
  const startDayInMinutes = getMinutesFromTime(startDay);
  const endDayInMinutes = getMinutesFromTime(endDay);
  const startMeetingInMinutes = getMinutesFromTime(startMeeting);

  if (startDayInMinutes > startMeetingInMinutes) {
    return false;
  } else if (endDayInMinutes < startMeetingInMinutes + durationMeeting) {
    return false;
  } else {
    return true;
  }

};

getIsGoodMeeting('08:00', '17:30', '14:30', 90);
