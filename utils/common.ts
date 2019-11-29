import moment from 'moment';

export const encryptFkey = (oldF: string, date: Date) => {
  const ddHHmmss = moment(date).format('DDHHmmss');
  const times = ddHHmmss.split('');
  return oldF.split('').map((str: string, index: number) => {
    const number = (str.charCodeAt(0) ^ (times[index].charCodeAt(0) + 32)) - 1;
    return String.fromCharCode(number);
  }).join('');
}