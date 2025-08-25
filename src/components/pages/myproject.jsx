import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react"; // 연필(Pencil), 휴지통(Trash2)
import axios from "axios";
import "./myproject.css";

export default function MyProject() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // ✅ 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts"); // 서버 API
        setPosts(res.data);
      } catch (err) {
        console.error("❌ 게시글 불러오기 실패:", err);
      }
    };
    fetchPosts();
  }, []);

  // ✅ 게시글 삭제
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("❌ 게시글 삭제 실패:", err);
    }
  };

  // ✅ 게시글 수정 (임시 alert → 수정 페이지로 이동하는 방식 추천)
  const handleEdit = (id) => {
    // 실제로는 navigate(`/edit/${id}`) 식으로 수정 페이지 연결하는 게 일반적
    alert(`${id}번 게시글 수정하기!`);
  };

  // ✅ 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(posts.length / cardsPerPage);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return posts.slice(start, start + cardsPerPage);
  }, [currentPage, posts]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const [profileImage, setProfileImage] = useState(null);

  const openDetails = (post) => {
    navigate(`/details/${post.id}`, { state: { post } });
  };

  return (
    <div className="app_container">
      {/* 🔹 헤더 */}
      <div className="app_header_container">
        <h1
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          민생_<span>췍</span>
        </h1>
        <div className="search-bar">
          <img src="/question.png" alt="question" className="icon" />
          <input
            type="text"
            placeholder="노원구 민생 회복 소비쿠폰 가맹점은?"
          />
        </div>
        <nav className="nav">
          <div className="app_menu_item">가맹점 목록</div>
          <div className="app_menu_item">찜한 매장</div>
          <div
            className="app_menu_item"
            onClick={() => navigate("/myproject")}
            style={{ cursor: "pointer" }}
          >
            로그인
          </div>
        </nav>
      </div>

      {/* 🔹 메인 콘텐츠 */}
      <div className="app_main_container">
        {/* 프로필 */}
        <div className="app_profile_container">
          <div className="app_profile_image">
            <input
              type="file"
              accept="image/*"
              id="profileUpload"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setProfileImage(URL.createObjectURL(file));
                }
              }}
            />
            <img
              src={profileImage || "/path/to/profile-image.jpg"}
              alt="Profile"
              onClick={() => document.getElementById("profileUpload").click()}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="app_profile_name">
            <h2>김유리</h2>
          </div>
          <div className="app_profile_description">
            <div className="app_profile_info">이메일</div>
            <div className="app_profile_email">aaa@aaa.com</div>
          </div>
          <button className="app_profile_button">탈퇴</button>
        </div>

        {/* 게시글 목록 */}
        <div className="app_posts_list">
          {paginatedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-card-header">
                <div
                  className="post-content-area"
                  role="button"
                  tabIndex={0}
                  onClick={() => openDetails(post)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openDetails(post);
                  }}
                >
                  <div className="post-header">
                    <h3 className="post-title">{post.name}</h3>
                    <p className="post-location">{post.address}</p>
                  </div>
                  <p className="post-content">{post.content}</p>
                </div>

                {/* 수정/삭제 버튼 */}
                <div className="post-actions">
                  <button
                    className="edit_button"
                    onClick={() => handleEdit(post.id)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="delete_button"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
