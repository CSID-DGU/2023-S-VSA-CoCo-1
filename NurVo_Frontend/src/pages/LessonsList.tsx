import {
    SectionList,
    Text
} from 'react-native';
import { useEffect, useState } from 'react';
import { RN_HOST_URL, TEST_TOKEN } from '@env';
import { ListCell } from '../components/ListCellComp';
import { Subtext011, Subtitle011, Title02 } from '../utilities/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { stopSpeech } from '../utilities/TextToSpeech';


interface Topic {
    id: number;
    name: string;
}
interface Chapter {
    id: number;
    name: string;
    description?: string;
    topic_id: number;
}

interface Section {
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
//topic과 chpater 요청
async function fetchAllTopic(): Promise<Section[] | undefined> {
    const HOST_URL = RN_HOST_URL;
    const url = `${HOST_URL}/api/dialogues`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TEST_TOKEN
            }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}
export default function LessonsList() {
    useEffect(() => {
        stopSpeech();
      }, []);

    useEffect(() => {
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
                        topic_id: item.topic.id
                    }))
                }));
                setSections(sectionData);
                
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    const [sections, setSections] = useState<Section[]>([]);
    const [listData, setListData] = useState<ListData[]>([]);

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
            renderItem={({ item }) => ListCell({item: item, checked: true, style: {marginBottom: 16, marginHorizontal: 20}})}
            renderSectionHeader={({ section: { title } }) => (
                <Subtitle011 text={title} style={{paddingTop: 38, paddingBottom: 19, marginHorizontal: 20}} color={Colors.BLACK}/>
            )}
        />)}
        </>
    )
}