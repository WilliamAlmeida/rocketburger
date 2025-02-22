import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface BusinessHoursProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const businessHours = [
    { day: "Domingo", open: "18:00", close: "23:00" },
    { day: "Segunda-feira", open: "Fechado", close: "Fechado" },
    { day: "Terça-feira", open: "18:00", close: "23:00" },
    { day: "Quarta-feira", open: "18:00", close: "23:00" },
    { day: "Quinta-feira", open: "18:00", close: "23:00" },
    { day: "Sexta-feira", open: "18:00", close: "23:00" },
    { day: "Sábado", open: "18:00", close: "23:00" },
];

const getCurrentDayName = (): string => {
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return days[new Date().getDay()];
};

export function BusinessHours({ isOpen, onOpenChange }: BusinessHoursProps) {
  const currentDay = getCurrentDayName();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Horários de Funcionamento</DialogTitle>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="lg:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dia
              </th>
              <th className="lg:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Abertura
              </th>
              <th className="lg:px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fechamento
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {businessHours.map((day) => (
              <tr 
                key={day.day}
                className={day.day === currentDay ? 'bg-background text-foreground font-semibold' : ''}
              >
                <td className="lg:px-6 text-xs lg:text-base py-1 text-left whitespace-nowrap">{day.day}</td>
                <td className="lg:px-6 text-xs lg:text-base py-1 text-center lg:text-left whitespace-nowrap">{day.open}</td>
                <td className="lg:px-6 text-xs lg:text-base py-1 text-center lg:text-left whitespace-nowrap">{day.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}
