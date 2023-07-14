import { queryParamsDto } from '../../clients';

export const pagination = ({ page, rows }: queryParamsDto) => ({
  skip: isNaN(Number(page)) ? 0 * 10 : Number(page) * 10,
  take: isNaN(Number(rows)) ? 10 : Number(rows) || 10,
});
