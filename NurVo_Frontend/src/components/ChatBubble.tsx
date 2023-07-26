import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Message } from "../utilities/LessonExample";
import { Body012 } from "../utilities/Fonts";
import { layoutStyles, screenWidth } from "../utilities/Layout";
import Colors from "../utilities/Color";


interface ChatBubbleProps {
    item: Message;
    isBookmarked: boolean;
    inputRef?: React.RefObject<TextInput>;
    onEnterValue?: () => void;
    onChagneText?: (text: string) => void;
}

export default function ChatBubble({ item, isBookmarked }: ChatBubbleProps) {
    useEffect(() => {
        setIsBookmark(isBookmarked);
    }, [isBookmarked]);

    const [isBookmark, setIsBookmark] = useState(false);
    const [isShowTranslation, setIsShowTranslation] = useState(false);

    const handleBookmark = () => {
        if (isBookmark) {
            setIsBookmark(false);
        } else {
            setIsBookmark(true);
        }
    }
    const handleBook = () => {
        if (isShowTranslation) {
            setIsShowTranslation(false);
        } else {
            setIsShowTranslation(true);
        }
    }
    const handleSpeak = () => {
    }
    return (
        <View style={[
            item.speaker === 'Nurse' ? bubbleStyles.messageContainerRight : bubbleStyles.messageContainerLeft
        ]}>
            <View style={[
                bubbleStyles.bubble,
                item.speaker === 'Nurse' ? bubbleStyles.bubbleRight : bubbleStyles.bubbleLeft
            ]}>
                <Body012 text={item.dialogue} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                {isShowTranslation && <Body012 text={item.korean} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />}
                <View style={[
                    layoutStyles.HStackContainer,
                    {
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        alignSelf: item.speaker === 'Nurse' ? 'flex-start' : 'flex-end',
                        marginTop: 16,
                    }
                ]}>
                    <TouchableOpacity onPress={handleBookmark}>
                        <Ionicons name={isBookmark ? "bookmark" : "bookmark-outline"} size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBook}>
                        <Ionicons name={isShowTranslation ? "book" : "book-outline"} size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} style={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSpeak}>
                        <Ionicons name="volume-high-outline" size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export function ChatBubbleInputWord({ item, isBookmarked, onEnterValue, onChagneText, inputRef }: ChatBubbleProps) {
    useEffect(() => {
        setIsBookmark(isBookmarked);
    }, [isBookmarked]);

    const [isBookmark, setIsBookmark] = useState(false);
    const [isShowTranslation, setIsShowTranslation] = useState(false);

    const handleBookmark = () => {
        if (isBookmark) {
            setIsBookmark(false);
        } else {
            setIsBookmark(true);
        }
    }
    const handleBook = () => {
        if (isShowTranslation) {
            setIsShowTranslation(false);
        } else {
            setIsShowTranslation(true);
        }
    }
    const handleSpeak = () => {
    }

    const textWithInputs = replaceWithInput(item.dialogue, item.second_step);

    return (
        <View style={[
            item.speaker === 'Nurse' ? bubbleStyles.messageContainerRight : bubbleStyles.messageContainerLeft
        ]}>
            <View style={[
                bubbleStyles.bubble,
                inputBubbleStyles.container,
                item.speaker === 'Nurse' ? bubbleStyles.bubbleRight : bubbleStyles.bubbleLeft,
                { flexDirection: 'row', flexWrap: 'wrap' }
            ]}>
                <View style={[layoutStyles.VStackContainer]}>
                    {textWithInputs.map((segment, index) => {
                        if (typeof segment === 'string') {
                            return <Body012 key={index} text={segment} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />;
                        } else {
                            return <TextInput
                                key={index}
                                style={[inputBubbleStyles.input, { color: Colors.WHITE, marginVertical: 4 }]}
                                ref={inputRef}
                                onSubmitEditing={onEnterValue}
                                onChangeText={onChagneText}
                            />;
                        }
                    })}
                </View>
                {isShowTranslation && <Body012 text={item.korean} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />}
                <View style={[
                    layoutStyles.HStackContainer,
                    {
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        alignSelf: item.speaker === 'Nurse' ? 'flex-start' : 'flex-end',
                        marginTop: 16,
                    }
                ]}>
                    <TouchableOpacity onPress={handleBookmark}>
                        <Ionicons name={isBookmark ? "bookmark" : "bookmark-outline"} size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBook}>
                        <Ionicons name={isShowTranslation ? "book" : "book-outline"} size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} style={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSpeak}>
                        <Ionicons name="volume-high-outline" size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export function ChatBubbleInputAll({ item, isBookmarked, onEnterValue, onChagneText, inputRef }: ChatBubbleProps) {
    useEffect(() => {
        setIsBookmark(isBookmarked);
    }, [isBookmarked]);

    const [isBookmark, setIsBookmark] = useState(false);
    const [isShowTranslation, setIsShowTranslation] = useState(false);

    const handleBookmark = () => {
        if (isBookmark) {
            setIsBookmark(false);
        } else {
            setIsBookmark(true);
        }
    }
    const handleBook = () => {
        if (isShowTranslation) {
            setIsShowTranslation(false);
        } else {
            setIsShowTranslation(true);
        }
    }
    const handleSpeak = () => {
    }

    return (
        <View style={[
            item.speaker === 'Nurse' ? bubbleStyles.messageContainerRight : bubbleStyles.messageContainerLeft
        ]}>
            <View style={[
                bubbleStyles.bubble,
                inputBubbleStyles.container,
                item.speaker === 'Nurse' ? bubbleStyles.bubbleRight : bubbleStyles.bubbleLeft,
                { flexDirection: 'row', flexWrap: 'wrap' }
            ]}>
                <View style={[layoutStyles.VStackContainer, {width: '100%'}]}>
                    {item.speaker === 'Nurse' ?
                        (<TextInput
                            style={[inputBubbleStyles.input, { color: Colors.WHITE, marginVertical: 4 }]}
                            ref={inputRef}
                            onSubmitEditing={onEnterValue}
                            onChangeText={onChagneText}
                        />) :
                        (<Body012 text={item.dialogue} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />)}
                    {isShowTranslation && <Body012 text={item.korean} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />}
                    <View style={[
                        layoutStyles.HStackContainer,
                        {
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            alignSelf: item.speaker === 'Nurse' ? 'flex-start' : 'flex-end',
                            marginTop: 16,
                        }
                    ]}>
                        <TouchableOpacity onPress={handleBookmark}>
                            <Ionicons name={isBookmark ? "bookmark" : "bookmark-outline"} size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleBook}>
                            <Ionicons name={isShowTranslation ? "book" : "book-outline"} size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} style={{ marginHorizontal: 16 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSpeak}>
                            <Ionicons name="volume-high-outline" size={20} color={item.speaker === 'Nurse' ? Colors.WHITE : Colors.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

function replaceWithInput(text: string, textToReplace: string) {
    if (textToReplace === '') {
        return [text];
    } else {
        const segments = text.split(new RegExp(`(${textToReplace})`, 'gi'));

        const result = segments.map((segment, index) => {
            if (segment.toLowerCase() === textToReplace.toLowerCase()) {
                return;
            } else {
                return segment;
            }
        });

        return result;
    }
}
const bubbleStyles = StyleSheet.create({

    messageContainerRight: {
        alignSelf: 'flex-end',
    },
    messageContainerLeft: {
        alignSelf: 'flex-start',
    },
    bubble: {
        marginVertical: 14,
        padding: 12,
        borderRadius: 20,

        width: screenWidth - 20 * 2 - 50, //20 is paddingHorizontal

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(234, 234, 234, 0.80)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    bubbleRight: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.MAINGREEN,
        borderTopRightRadius: 0,
    },
    bubbleLeft: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 0,
    },
});

const inputBubbleStyles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    input: {
        borderWidth: 1.5,
        borderColor: Colors.GRAY09,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 4,
        fontFamily: 'Pretendard Variable',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 20,
    },
    inputAll: {

    },
})