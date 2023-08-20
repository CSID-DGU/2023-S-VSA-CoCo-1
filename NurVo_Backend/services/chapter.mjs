import { getTopic, getChapter, getChapterWithStep } from "../db/db.mjs";

export async function ChapterByTopic(id)  {
  const topic = await getTopic();
  const chapter = await getChapter();   // 전체 chapter
  const chapterWithStep = await getChapterWithStep(id);   // 학습기록이 있는 chapter

  const mergedChapter = chapter.map(data => {  // 전체 chapter에 대해 
    const matchingData = chapterWithStep.find(newData => newData.id == data.id); // 학습기록이 있는 chapter의 id와 일치하는 id 찾음
    return {
      ...data,
      step: matchingData ? matchingData.step : 0    // 학습기록이 있으면 해당 step, 없으면 0을 step의 값으로
    }
  })

  mergedChapter.sort((a, b) => a.id - b.id);
  const result = [];
  topic.forEach((topic) => {
    const chapterByTopic = mergedChapter.filter((chapter) => chapter.topic_id === topic.id);
    result.push({topic: topic, chapter: chapterByTopic});
  });
  return result;
};
