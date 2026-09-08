import { View, ScrollView, Platform, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from "@/assets/icons/threads-icon.svg";
import { useSharedValue } from 'react-native-reanimated';
import { createRandomUser } from "../../utils/Demofile-gen";
import { useContext } from 'react';
import { ThreadsContext } from '@/context/thread-context';
import ThreadItem from '@/components/ThreadItem';



export default function TabOneScreen() {
 const rotation = useSharedValue(0);
 const threads = useContext(ThreadsContext);
  return (
    <SafeAreaView
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1,
        paddingHorizontal: 20,
       }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
            }}
            tintColor={"transparent"}
          />
        }
        >
        <View
          style={{
            alignItems: 'center',
            padding: 10,
            zIndex: 1,
          }}
        >
          <HomeIcon
            width={45}
            height={45}
          />
        </View>
          {threads.map((thread) => (
           <ThreadItem key={thread.id} {...thread} />
            
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}