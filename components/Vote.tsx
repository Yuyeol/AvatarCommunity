import { PostVote } from "@/app/types";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { Feather } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import VoteOption from "./VoteOption";
import useCreateVote from "@/hooks/queries/useCreateVote";

interface VoteProps {
  postId: number;
  postVotes: PostVote[];
  voteCount: number;
}

export default function Vote({ postId, postVotes, voteCount }: VoteProps) {
  const { auth } = useAuth();
  const [selectedId, setSelectedId] = useState<number>();
  const createVote = useCreateVote();

  const handleVote = () => {
    createVote.mutate({
      postId,
      voteOptionId: Number(selectedId),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>투표</Text>
        <View style={styles.labelCount}>
          <Feather name="user" size={14} color={colors.BLACK} />
          <Text style={styles.labelCountText}>{voteCount}명</Text>
        </View>
      </View>
      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId)
        );
        const isVoted = voteUserIds.includes(Number(auth.id));
        console.log(auth.id, vote.options);

        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => (
              <VoteOption
                key={option.id}
                option={option}
                totalCount={voteUserIds.length}
                isVoted={isVoted}
                isSelected={selectedId === option.id}
                onSelectOption={() => setSelectedId(option.id)}
              />
            ))}
            {!isVoted && (
              <CustomButton
                label="투표하기"
                disabled={!selectedId}
                onPress={handleVote}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.GRAY_300,
    padding: 16,
    gap: 15,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  labelTitle: {
    fontSize: 12,
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  labelCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
