import { View, FlatList, StyleSheet } from 'react-native'
import { Text } from "@ui-kitten/components"
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const AzkarDetailsScreen = ({ navigation, route }) => {

    let params = route.params;

    let items = [
        {
            type: "morning", content: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُبِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر \n" +
                "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it and I take refuge in You from the evil of this night and the evil of what follows it. My Lord, I take refuge in You from laziness and senility. My Lord, I take refuge in You from torment in the Fire and punishment in the grave.\n"
        },
        {
            type: "morning", content: "يا حَـيُّ يا قَيّـومُ بِـرَحْمَـتِكِ أَسْتَـغـيث ، أَصْلِـحْ لي شَـأْنـي كُلَّـه ، وَلا تَكِلـني إِلى نَفْـسي طَـرْفَةَ عَـين \n" +
                "O Ever Living, O Self-Subsisting and Supporter of all, by Your mercy I seek assistance, rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye."
        },
        {
            type: "morning", content: "لا إلهَ إلاّ اللّهُ وحْـدَهُ لا شَـريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْـد، وهُوَ على كُلّ شَيءٍ قَدير . (مائة مرة) \n" +
                "None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent. (one hundred times every day)"
        },

        {
            type: "morning", content: "Abdullah Ibn Khubaib said: ‘The Messenger of Allah said to me ‘Recite!’ I replied ‘O Messenger of Allah, what shall I recite?’ he said ‘Recite: \n" +
                "Surah قُـلْ هُـوَ اللهُ أَحَـدٌ [ الإِخْـلاصْ ] (Surah Al-ikhlāṣ)\n" +
                "Surah قُـلْ أَعـوذُ بِرَبِّ الفَلَـقِ [ الفَلَـقْ ] (Surah Al-Falaq)\n" +
                "Surah قُـلْ أَعـوذُ بِرَبِّ النّـاسِ [ الـنّاس ] (Surah An-Nas)\n" +
                "...in the evening and the morning three times for it will suffice you of all else."
        },
        {
            type: "sleep", content: "1– Blowing into the cupped palms and reciting the three mu‘awwidhat [surahs seeking refuge with Allah, the last three surahs of the Quran]:\n" +

                +"It was narrated from ‘Aishah (may Allah be pleased with her) that when the Prophet (blessings and peace of Allah be upon him) went to his bed every night,\n he would put his cupped hands together, then blow into them, then recite into them  Qul Huwa Allahu ahad, Qul a'udhu bi Rabb il-Falaq and Qul a'udhu bi Rabb il-Nas [i.e., the last three surahs of the Quran),\n then he would wipe his hands over as much of his body as he could, starting with his head and face, and the front part of his body. He would do that three times.\n" +
                "The word translated here as blow refers to spitting lightly and drily. Narrated by al-Bukhari (5017)."
        },

        { title: "Morning Azkar", content: "hello \n hi" },
    ]


    function azkarRenderItem(item) {

        let { type, content } = item;

        return <LinearGradient style={styles.AzkarItem} colors={['#EAAA0E', '#CCC']}>
            <Text>{content}</Text>
        </LinearGradient>

    }

    function filteredAzkar(itemsArray) {

        return itemsArray.filter((item) => item.type === "morning");
    }

    return (
        <View style={{ flex: 1, }}>

            <FlatList data={filteredAzkar(items)} renderItem={({ item }) => azkarRenderItem(item)} style={{ flex: 1, }} />

            <Text style={{ fontSize: 11, color: "#555", padding: 4, zIndex: 20, borderTopWidth: 1, borderColor: "#999", }}>* These are some of Azkar, and the list will get improved periodically.</Text>


        </View>
    )
}

const styles = StyleSheet.create({

    AzkarItem: {
        padding: 10,
        margin: 10,
        marginTop: 15,
        borderRadius: 10,
        borderColor: "#CCC",
        borderWidth: 1,
        flex: 1,
        alignItems: "stretch",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },

});

export default AzkarDetailsScreen