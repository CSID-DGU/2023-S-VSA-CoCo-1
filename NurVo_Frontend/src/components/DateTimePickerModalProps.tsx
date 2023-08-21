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
  const minimumDate = new Date();

  useEffect(() => {
    if (isAction) setIsdisable(true);
  }, [isAction]);

  const handleClosed = () => {
    setIsdisable(false);
    onDisable(false);
  };

  const handleNext = (pickedDate) => {
    if (pickedDate > minimumDate) {
      const year = pickedDate.getFullYear().toString();
      const month = (pickedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = pickedDate.getDate().toString().padStart(2, "0");
      onDate(`${year}.${month}.${day}`);
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
        minimumDate={minimumDate} // 최소 날짜 설정
      />
    </>
  );
}

export default DateTimePickerModal;