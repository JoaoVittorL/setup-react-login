import React from 'react';
import { Check } from 'lucide-react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DateRangePickerProps {
  control: Control<any>;
  errors?: FieldErrors<any>;
  disabled?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ control, errors, disabled = false }) => {
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const hasStartDateError = errors?.startDate?.message as string | undefined;
  const hasEndDateError = errors?.endDate?.message as string | undefined;

  return (
    <div className={`w-full`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Data de inicio</Label>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="relative">
                <Input
                  type="date"
                  id="startDate"
                  value={value ? formatDateForInput(value) : ''}
                  maxLength={10}
                  onChange={(e) => {
                    const newDate = e.target.value ? new Date(e.target.value) : null;
                    onChange(newDate);
                  }}
                  className="justify-between"
                  disabled={disabled}
                  error={hasStartDateError}
                />
                {value && !hasStartDateError && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Data Final</Label>
          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value: startDateValue } }) => (
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="date"
                      value={value ? formatDateForInput(value) : ''}
                      onChange={(e) => {
                        const newDate = e.target.value ? new Date(e.target.value) : null;
                        onChange(newDate);
                      }}
                      min={formatDateForInput(startDateValue)}
                      disabled={disabled}
                      error={hasEndDateError}
                    />
                    {value && !hasEndDateError && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                )}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
