import React, { useState, useRef } from 'react'
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    NativeModules,
    TouchableOpacity,
} from 'react-native';

import Colors from '../utilities/Color';
import { Message, allMessages } from '../utilities/LessonExample';
import ChatBubble from '../components/ChatBubble';
import CustomAlert from '../components/Alert';

const { StatusBarManager } = NativeModules;

export default function LessonFirst({ navigation }: { navigation: any }) {
    const flatListRef = useRef<FlatList>(null);
    const [messages, setMessages] = useState<Message[]>([allMessages[0]]);
    const [showAlert, setShowAlert] = useState(false);

    const handlePress = () => {
        if (messages.length < allMessages.length) {
            setMessages(allMessages.slice(0, messages.length + 1));
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        } else {
            setShowAlert(true);
        }
    };

    const handleNext = () => {
        navigation.pop();
        navigation.navigate("LessonSecondScreen");
    };

    const handleCancle = () => {
        setShowAlert(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 44 : undefined}
        >
            <FlatList
                style={{ flex: 1, paddingHorizontal: 20 }}
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
                        <ChatBubble item={item} isBookmarked={false} />
                    </TouchableOpacity>
                )}
            />
            {showAlert &&
                <CustomAlert
                    onCancle={handleCancle}
                    onConfirm={handleNext}
                    content='1단계 학습을 완료했습니다. 2단계 학습을 시작하시겠습니까?'
                    cancleText='취소'
                    confirmText='확인' />}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Colors.BACKGROUND
    },
});

