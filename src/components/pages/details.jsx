import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./details.css";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStore = async () => {
      try {
       const res = await axios.get(`/api/posts/${id}`);


        setStore(res.data);
      } catch (err) {
        console.error("가맹점 불러오기 실패:", err);
        setStore(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!store) {
    return <div>존재하지 않는 가맹점입니다.</div>;
  }

  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="header">
        <h1
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          민생_<span>췍</span>
        </h1>
        <nav className="nav">
          <div 
          className='app_menu_item' 
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}>가맹점 목록
          </div>
        </nav>
      </header>

      {/* 본문 컨테이너 */}
      <div className="form-container">
        <div className="form-scroll">
            <img 
                src={store.imageUrl || "/default-store.png"} 
                alt={store.name} 
                className="label_image"
            />
          <div className="explain">
            <div className="label">
              가맹점 명 : <span>{store.name}</span>
              <br />
              카테고리 : <span>{store.category}</span>
              <br />
              가맹점 주소 : <span>{store.address}</span>
            </div>

            <div className="section">
              <span className="label">가맹점 소개</span>
              <p className="description">
                {store.description || "이 가맹점에 대한 설명이 아직 없습니다."}
              </p>
            </div>
          </div>
        </div>

        <button className="heart-btn">
          ♥
        </button>
      </div>
    </div>
  );
}
