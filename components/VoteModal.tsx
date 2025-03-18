import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import VoteInput from "@/components/VoteInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VoteOption } from "@/app/types";

export default function VoteModal() {
  const { control, setValue } = useFormContext();
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ["voteOptions", "isVoteOpen"],
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });
  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (option: VoteOption) => option.displayPriority
    );
    const nextPriority = Math.max(...priorities) + 1;
    append({ displayPriority: nextPriority, content: "" });
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert("투표 항목은 최소 2개 이상이어야 합니다.");
      return;
    }
    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerLeft}
            onPress={() => setValue("isVoteOpen", false)}
          >
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRightText} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
        >
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>+ 항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  headerRightText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.GRAY_500,
    textAlign: "center",
  },
});
