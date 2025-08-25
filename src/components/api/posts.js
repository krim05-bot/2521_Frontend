import api from "./axios";

// 목록 조회
export const fetchPosts = async ({ category, page = 0, size = 9, sort = "likeCount,desc" }) => {
  const res = await api.get("/posts", {
    params: { category, page, size, sort },
  });
  return res.data;
};

// 상세 조회
export const fetchPostDetail = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// 작성 (multipart 업로드)
export const createPost = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 수정
export const updatePost = async (id, payload) => {
  const res = await api.put(`/posts/${id}`, payload);
  return res.data;
};

// 삭제
export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};

// 좋아요
export const likePost = async (id) => {
  const res = await api.post(`/posts/${id}/like`);
  return res.data;
};
