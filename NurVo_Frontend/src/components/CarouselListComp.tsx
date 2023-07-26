import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import Colors from '../utilities/Color';
import { useState } from 'react';
import { screenWidth } from '../utilities/Layout';
import { ListCell } from './ListCellComp';

interface CarouselProps {
    gap: number;
    offset: number;
    pages: any[];
    pageWidth: number;
}

export function CarouselList({ gap, offset, pages, pageWidth }: CarouselProps) {
    const [page, setPage] = useState(0);

    function renderItem({ item }: any) {
        return (
            <ListCell item={item} style={{ width: pageWidth, marginHorizontal: gap / 2 }} />
        );
    }
    const onScroll = (event: any) => {
        const newPage = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth,
        );
        setPage(newPage);
    };

    return (
        <View style={[carouselStyles.container, {marginTop: 8}]}>
            <FlatList
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{
                    paddingHorizontal: offset + gap / 2,
                }}
                data={pages}
                decelerationRate='fast'
                horizontal={true}
                keyExtractor={(_, index) => index.toString()}
                onScroll={onScroll}
                pagingEnabled={true}
                renderItem={renderItem}
                snapToInterval={pageWidth + gap}
                snapToAlignment='start'
                showsHorizontalScrollIndicator={false} />
            <View style={carouselStyles.indicatorWrapper}>
                {Array.from({ length: pages.length }, (_, i) => i).map((i) => (
                    <View style={i === page ? carouselStyles.indicatorFocused : carouselStyles.indicatorUnfocused} key={i.toString()} />
                ))}
            </View>
        </View>
    )
}

const carouselStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorFocused: {
        marginVertical: 0,
        marginHorizontal: 4,
        backgroundColor: Colors.MAINGREEN,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    indicatorUnfocused: {
        marginVertical: 0,
        marginHorizontal: 4,
        backgroundColor: Colors.GRAY07,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    indicatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    }
});