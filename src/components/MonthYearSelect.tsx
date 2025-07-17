import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const MonthYearSelect = ({ month, onMonthChange, onYearChange, year }: MonthYearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleNextMonth = (): void => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };
  const handlePrevMonth = (): void => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };
  return (
    <div className="flex items-center justify-between bg-blue-950 rounded-lg p-3 border-blue-700">
      <button
        onClick={handlePrevMonth}
        type="button"
        className="p2 rounded-full hover:bg-blue-900 hover:text-primary-700 transition-colors cursor-pointer"
        aria-label="Mês anterior"
      >
        <ChevronLeft />
      </button>
      <div className="flex gap-3">
        <label htmlFor="month-select" className="sr-only">
          Selecionar mês
        </label>
        <select
          value={month}
          onChange={(event) => onMonthChange(Number(event.target.value))}
          id="month-select"
          className="cursor-pointer bg-blue-900 border-none rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus: outline-none focus:ring-1 focus: ring-primary-700 "
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        <label htmlFor="year-select" className="sr-only">
          Selecionar ano
        </label>
        <select
          onChange={(event) => onYearChange(Number(event.target.value))}
          value={year}
          id="year-select"
          className="cursor-pointer bg-blue-900 border-none rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus: outline-none focus:ring-1 focus: ring-primary-700"
        >
          {years.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="p2 rounded-full hover:bg-blue-900 hover:text-primary-700 transition-colors cursor-pointer "
        aria-label="Próximo mês"
        onClick={handleNextMonth}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MonthYearSelect;
