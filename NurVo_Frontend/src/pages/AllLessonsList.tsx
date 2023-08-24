import {
  FlatList,
  ScrollView,
} from 'react-native';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Subtitle011 } from '../utilities/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { stopSpeech } from '../utilities/TextToSpeech';
import { ChapterStackScreenProps, LessonListProps } from '../utilities/NavigationTypes';
import { fetchAllTopic } from '../utilities/ServerFunc';
import { MiniListCell } from '../components/MiniListCell';
import { useFocusEffect } from '@react-navigation/core';


interface Topic {
  id: number;
  name: string;
}
export interface Chapter {
  id: number;
  name: string;
  description?: string;
  topic_id?: number;
  step: number;
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

export default function AllLessonsList({ navigation, route }: ChapterStackScreenProps) {

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    stopSpeech();
  }, []);

  useFocusEffect(
    useCallback(() => {
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
              topic_id: chapter.topic_id,
              step: chapter.step
            }))
          }));
          setSections(sectionData);
  
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({ title: "All Lessons" });
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20 }}>
        {sections.map((section) => (
          <Fragment key={section.topic.id}>
            <Subtitle011 text={section.topic.name} color={Colors.GRAY05} style={{ paddingVertical: 6, marginTop: 12 }} />

            <FlatList
              data={section.chapter}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MiniListCell step={item.step} item={item} />}
              style={{ flexGrow: 0 }}
              showsHorizontalScrollIndicator={false}

            />
          </Fragment>
        ))
        }
      </ScrollView>
    </>
  )
};