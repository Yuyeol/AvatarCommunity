import { CreateCommentDto } from "@/app/types";
import axiosInstance from "./axios";

async function createComment(body: CreateCommentDto) {
  const { data } = await axiosInstance.post("/comments", body);
  return data;
}

async function deleteComment(id: number) {
  const { data } = await axiosInstance.delete(`/comments/${id}`);
  return data;
}

export { createComment, deleteComment };
// *getComments는 게시글 api GET 요청에서 받아오므로 구현할 필요 없음
