export interface Message {
    chapter_id: number;
    conversation_id: number;
    
    speaker: string;
    dialogue: string;
    second_step: string; 
    korean: string;
}

export const allMessages: Message[] = [
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Nurse",
        dialogue: "Hello, Mr. Baker. How are you doing?",
        second_step: "",
        korean: "안녕하세요, 베이커씨. 어떻게 지내세요?"
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "I feel great. How about you?",
        second_step: "",
        korean: "저는 기분이 좋아요. 당신은요?"
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Nurse",
        dialogue: "I'm doing great as well. My name is Rachel, and I will be your nurse today.",
        second_step: "doing great as well",
        korean: "저도 기분이 좋아요. 제 이름은 레이첼이고, 오늘은 당신의 간호사가 될 거예요."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "Okay, Rachel. Can I ask you where I am?",
        second_step: "",
        korean: "알겠어요, 레이첼. 여기가 어디인지 물어도 될까요?"
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Nurse",
        dialogue: "You are in the medical unit at Hope Regional Hospital.",
        second_step: "",
        korean: "당신은 호프 지역 병원의 의료부에 계십니다."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "Am I going to stay in this room?",
        second_step: "",
        korean: "저는 이 방에 계속 있어야 하나요?"
    },
    {
        chapter_id: 1,
        conversation_id: 1,
        
        speaker: "Nurse",
        dialogue: "Yes, Mr. Baker. You are going to stay here for the next few days.",
        second_step: "for the next few days",
        korean: "네, 베이커씨. 당신은 다음 몇 일 동안 여기에 계실 거예요."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "I see. By the way, you can call me Kevin.",
        second_step: "",
        korean: "알겠어요. 그런데, 당신은 저를 케빈이라고 불러도 돼요."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "Am I going to stay in this room?",
        second_step: "",
        korean: "저는 이 방에 계속 있어야 하나요?"
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Nurse",
        dialogue: "Yes, Mr. Baker. You are going to stay here for the next few days.",
        second_step: "for the next few days",
        korean: "네, 베이커씨. 당신은 다음 몇 일 동안 여기에 계실 거예요."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "I see. By the way, you can call me Kevin.",
        second_step: "",
        korean: "알겠어요. 그런데, 당신은 저를 케빈이라고 불러도 돼요."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "Am I going to stay in this room?",
        second_step: "",
        korean: "저는 이 방에 계속 있어야 하나요?"
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Nurse",
        dialogue: "Yes, Mr. Baker. You are going to stay here for the next few days.",
        second_step: "for the next few days",
        korean: "네, 베이커씨. 당신은 다음 몇 일 동안 여기에 계실 거예요."
    },
    {
        chapter_id: 1,
        conversation_id: 1,

        speaker: "Mr. Baker",
        dialogue: "I see. By the way, you can call me Kevin.",
        second_step: "",
        korean: "알겠어요. 그런데, 당신은 저를 케빈이라고 불러도 돼요."
    }
];