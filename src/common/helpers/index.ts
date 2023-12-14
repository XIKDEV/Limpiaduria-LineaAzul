import { queryParamsDto } from '../../clients';
import * as dayjs from 'dayjs';

export const pagination = ({ page, rows }: queryParamsDto) => ({
  skip: isNaN(Number(page)) ? 0 * 10 : Number(page) * 10,
  take: isNaN(Number(rows)) ? 10 : Number(rows) || 10,
});

export const getTodayByUtc = () => {
  const todayUtc = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Tijuana',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return todayUtc;
};

export const dayjsFormat = () => {
  const today = getTodayByUtc();

  return dayjs(today).format('YYYY-MM-DD');
};
