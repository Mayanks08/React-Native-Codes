import { Thread } from "@/types/threads";
import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Ionicons ,Feather, AntDesign ,FontAwesome, MaterialIcons } from '@expo/vector-icons';
import timeAgo from "@/utils/time-ago";


export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ThreadItem(thread:Thread) {
  return (
   <View style={styles.threadRow}>
        <PostLeftSide {...thread} />
     <View style={[styles.postBody, { backgroundColor: useColorScheme() === 'dark' ? '#1a1a1a' : '#ffffff' }]}>
        
        <PostHeading name={thread.author.username} createdAt={String(thread.createdAt)} Verified={thread.author.verified} />
        <Text style={{ paddingHorizontal: 10, paddingBottom: 10, color: useColorScheme() === 'dark' ? '#9eb9ed' : '#1a1a1a',}}>{thread.content}</Text>
        {thread.image && (
            <Image
             source={{ uri: thread.image }}
                style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 15, marginTop : 10
              
                 }}
            />
        )}
        <PostFooter replies={thread.repliesCount ?? 0} likes={thread.likesCount ?? 0} shares={(thread as any).shareCount ?? (thread as any).sharesCount ?? 0} />
        </View>
   </View>
  );
}

function PostLeftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "#ffffff20";
  const authorPhoto = thread.author.photo ?? thread.author.avatar;

  return (
    <View style={styles.leftRail}>
      <Image
        source={authorPhoto ? { uri: authorPhoto } : undefined}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            // @ts-ignore
            source={thread.replies[index - 1]?.author.photo ? { uri: thread.replies[index - 1]?.author.photo } : thread.replies[index - 1]?.author.avatar ? { uri: thread.replies[index - 1]?.author.avatar } : undefined}
            style={{ width: index * 7, height: index * 7, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
}

function PostHeading({name,createdAt , Verified } : {
    name: string;
    createdAt: string;
    Verified: boolean;

}) {
  return (
    <View style ={styles.postCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center' , gap: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 ,color: useColorScheme() === 'dark' ? '#ffffff' : '#1a1a1a', }}>{name}</Text>
        {Verified && (
            <MaterialIcons name="verified" size={16} color="#1DA1F2" style={{ marginLeft: 4 }} />   
        )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' , gap: 5 }}>
        <Text style={{ color: 'gray', fontSize: 12,fontWeight:600 }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={16} color="#5f6263" />
        </View> 
    </View>
  );
}

function PostFooter({replies ,likes , shares} : {
    replies: number;
    likes: number;
    shares: number;
}) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Ionicons name="chatbubble-outline" size={16} color="#5f6263" />
                <Text style={{ color: 'gray', fontSize: 12 }}>{replies}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <AntDesign name="heart" size={16} color="#5f6263" />
                <Text style={{ color: 'gray', fontSize: 12 }}>{likes}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Feather name="share" size={16} color="#5f6263" />
                <Text style={{ color: 'gray', fontSize: 12 }}>{shares}</Text>           
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <FontAwesome name="send" size={16} color="#5f6263" />
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
threadRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: 10,
  gap: 10,
},
postCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  flexGrow: 1,
  minWidth: 0,
},
postBody: {
  flex: 1,
  minWidth: 0,
  borderRadius: 10,
  marginBottom: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
},
leftRail: {
  width: 48,
  alignItems: 'center',
  flexShrink: 0,
},
image: {
    width: 40,
    height: 40,
    borderRadius: 20,
},

})