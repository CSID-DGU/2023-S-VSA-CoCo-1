import { getDialogues } from "../db/db.mjs";

export async function FilterDialogues(list_id) {
  const firstStep = await getDialogues(list_id);
  const result = firstStep.map((firstStep) => {
    return {
      id: firstStep.id,
      speaker: firstStep.speaker,
      dialogue: firstStep.dialogue,
      korean: firstStep.korean,
    };
  });
  return result;
};

export async function FilterNurse(list_id) {
  const secondStep = await getDialogues(list_id);
  const result = secondStep.map((secondStep) => {
    if(secondStep.speaker === "Nurse" || secondStep.speaker === "nurse") {
      return {
        id: secondStep.id,
        speaker: secondStep.speaker,
        second_step: secondStep.second_step,
        korean: secondStep.korean,
      };
    } else {
      return {
        id: secondStep.id,
        speaker: secondStep.speaker,
        dialogue: secondStep.dialogue,
        korean: secondStep.korean,
      };
    };
    }
  );
  return result;
};