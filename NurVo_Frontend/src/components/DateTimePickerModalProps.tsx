import React, { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

interface DateTimePickerModalProps {
  isAction: boolean,
  onDate: (value: string) => void,
  onDisable: (value: boolean) => void,
  onAlertAction: (value: boolean) => void,
}

const DateTimePickerModal = ({ isAction, onDate, onDisable, onAlertAction }: DateTimePickerModalProps) => {
  const [isDisable, setIsdisable] = useState(false);

  useEffect(() => {
    if (isAction) setIsdisable(true);
  }, [isAction]);

  const handleClosed = () => {
    setIsdisable(false);
    onDisable(false);
  };

  const handleNext = (pickedDate) => {
    if (pickedDate > Date.now()) {
      const year = pickedDate.getFullYear().toString();
      const month = (pickedDate.getMonth() + 1).toString();
      const day = pickedDate.getDate().toString();
      onDate(`${year}-${month}-${day}`);
    } else {
      onAlertAction(true);
    }
    handleClosed();
  };

  return (
    <>
      <DateTimePicker
        isVisible={isDisable}
        onConfirm={handleNext}
        onCancel={handleClosed}
      />
    </>
  );
}

export default DateTimePickerModal;