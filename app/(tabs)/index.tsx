import { Text, View , Button} from "react-native";
import { Link } from 'expo-router';
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/(tabs)/index.tsx to edit this screen.</Text>
      <Link href="/camera" style={{ marginTop: 20 }}>
        Go to camera screen
      </Link>
    </View>
  );
}
