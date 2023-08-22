import {
  SectionList, View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { ListCell } from '../components/ListCellComp';
import { Subtitle011 } from '../utilities/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { stopSpeech } from '../utilities/TextToSpeech';
import { LessonListProps } from '../utilities/NavigationTypes';
import { fetchAllTopic } from '../utilities/ServerFunc';


interface Topic {
  id: number;
  name: string;
}
export interface Chapter {
  step: number;
  id: number;
  name: string;
  description?: string;
  topic_id?: number;
}

export interface Section {
  topic: Topic;
  chapter: Chapter[];
}

interface ListData {
  title: string;
  data: Chapter[];
}

export interface ResponseProps {
  data: string;
}

export default function LessonsList({ navigation, route }: LessonListProps) {

  const [sections, setSections] = useState<Section[]>([]);
  const [listData, setListData] = useState<ListData[]>([]);

  useEffect(() => {
    stopSpeech();
  }, []);

  useEffect(() => {
    if (route.params && route.params.chapters !== undefined) {
      setListData([{ title: '', data: route.params.chapters }]);
    } else {
      const getData = async () => {
        try {
          const data = await fetchAllTopic();
          if (!data) return;
          const sectionData: Section[] = data.map(item => ({
            topic: item.topic,
            chapter: item.chapter.map(chapter => ({
              id: chapter.id,
              name: chapter.name,
              description: chapter.description,
              topic_id: item.topic.id,
              step: chapter.step
            }))
          }));
          setSections(sectionData);

        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }
  }, []);

  useEffect(() => {
    if (route.params && route.params.title) {
      navigation.setOptions({ title: route.params.title });
    }
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;
    const listValue = sections.map((section: Section) => ({
      title: section.topic.name,
      data: section.chapter
    }));
    setListData(listValue);
  }, [sections]);

  return (
    <>
      {listData && (<SectionList
        sections={listData}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => ListCell({ item: item, style: { marginBottom: 16, marginHorizontal: 20 } })}
        renderSectionHeader={({ section: { title } }) => (
          <>
            {(title !== '') && ( <Subtitle011 text={title} style={{ paddingBottom: 12, marginHorizontal: 20 }} color={Colors.BLACK} /> )}
          </>
        )}
        style={{ paddingTop: 16}}
        ListFooterComponent={<View style={{marginBottom: 30}}/>}
      />)}
    </>
  )
}