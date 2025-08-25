import './mainPage.css';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from "../api/posts"; // ✅ axios API 사용
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const cardsPerPage = 6;

  const categories = [
    { key: "", label: "전체" },
    { key: "MARKET", label: "전통시장&마트" },
    { key: "FOOD_CAFE_CONVENIENCE", label: "음식점&편의점" },
    { key: "PHARMACY_HOSPITAL", label: "약국&병원" },
    { key: "ETC", label: "기타" }
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const params = {
          page: currentPage - 1,
          size: cardsPerPage,
          sort: "likeCount,desc", // ✅ 좋아요 기준 정렬
        };

        if (activeCategory !== "") {
          params.category = activeCategory;
        }

        const data = await fetchPosts(params);
        console.log("✅ 서버 응답:", data);
        setPosts(data.content);
      } catch (err) {
        if (err.response) {
          console.error("❌ 서버 응답 에러:", err.response.status, err.response.data);
        } else if (err.request) {
          console.error("❌ 응답 없음 (네트워크/프록시 문제):", err.request);
        } else {
          console.error("❌ 요청 설정 에러:", err.message);
        }
      }
    };

    loadPosts();
  }, [activeCategory, currentPage]);

  const filteredStores =
    activeCategory === ""
      ? posts
      : posts.filter(store => store.category === activeCategory);

  const totalPages = Math.ceil(filteredStores.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const paginatedStores = filteredStores.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick = (storeId) => {
    navigate(`/details/${storeId}`);
  };

  return (
    <div className="app_container">
      {/* 🔹 헤더 */}
      <div className="app_header_container">
        <h1 className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          민생_<span>췍</span>
        </h1>

        {/* 검색창 */}
        <div className="search-bar">
          <img src="\question.png" alt="question" className="icon" />
          <input type="text" placeholder="노원구 민생 회복 소비쿠폰 가맹점은?" />
        </div>

        {/* 메뉴 */}
        <nav className="nav">
          <div 
          className='app_menu_item' 
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}>가맹점 목록
          </div>
        </nav>
      </div>

      {/* 🔹 카테고리 */}
      <div className="app_content">
        <div className="app_content_container">
          <div className="app_content_left">
            <div className="app_content_category">가맹점 목록</div>
            <div className="app_content_category_item">
              {categories.map(cat => (
                <div
                  key={cat.key}
                  className={activeCategory === cat.key ? "category_button active" : "category_button"}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setCurrentPage(1);
                  }}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>

          <div className="app_content_order">
            <div className="app_order_button">최신순</div>
            <div className="app_order_button">인기순</div>
          </div>
        </div>
      </div>

      {/* 🔹 카드 + 버튼 */}
      <div className="card-and-button-wrapper">
        <div className="app_content_project_grid">
          {paginatedStores.map(store => {
            return (
              <div 
                key={store.id} 
                className="store-card"
                onClick={() => handleCardClick(store.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="store-top">
            <img
            src={
            store.imageUrl
            ? store.imageUrl.startsWith("http") 
            ? store.imageUrl                  // 절대 경로일 경우 그대로 사용
            : `http://localhost:8080/${store.imageUrl}`  // 상대 경로면 서버 주소 붙임
            : "/default-store.png"
            }
            alt={store.name}
            />


                </div>

                {/* ✅ 좋아요 영역 */}
                <div className="store-like">
                  <span className="like-icon">🔵</span>
                  <span className="like-count">{store.likeCount || 0}</span>
                </div>

                <div className="store-bottom">
                  <span className="store-name">{store.name}</span>
                  <span className="store-category">
                    {categories.find(c => c.key === store.category)?.label || store.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="floating-buttons">
          <button className="chatbot-btn">
            <img src="/gpt.png" alt="챗봇"/>
          </button>
          <button 
            className="write-btn"
            onClick={() => navigate("/write")}
            style={{ cursor: "pointer" }}
          >+</button>
        </div>
      </div>

      {/* 🔹 페이지네이션 */}
      <div className="pagination-nav">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &laquo;
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &raquo;
        </button>
      </div>
    </div>
  );
}

export default App;
