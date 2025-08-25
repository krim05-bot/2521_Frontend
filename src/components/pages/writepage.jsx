import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./writepage.css";

export default function App() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("전통시장&마트");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("content", description);
    formData.append("pin", "1234");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

const res = await axios.post("/api/posts", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});


    alert("작성 성공!");
    console.log(res.data);
  } catch (err) {
    console.error("게시물 작성 실패:", err);
  }
};



  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="header">
        <h1 className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          민생_<span>췍</span>
        </h1>
        <div className="search-bar">
          <img src="/question.png" alt="question" className="icon" />
          <input type="text" placeholder="노원구 민생 회복 소비쿠폰 가맹점은?" />
        </div>
        <nav className="nav">
        <nav className="nav">
          <div 
          className='app_menu_item' 
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}>가맹점 목록
          </div>
        </nav>
        </nav>
      </header>

      {/* 제목 */}
      <h2 className="write_title">가맹점 게시물 작성</h2>

      {/* 작성 박스 */}
      <div className="form-container">
        <div className="form-scroll">
          <input
            type="text"
            className="input-text"
            placeholder="가맹점 명을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="section">
            <span className="label">카테고리</span>
            <div className="category">
              {["전통시장&마트", "음식점&편의점", "약국&병원", "기타"].map((cat) => (
                <label key={cat}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="label">가맹점 소개</span>
            <textarea
              className="textarea"
              placeholder="내용을 입력하세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 파일 업로드 */}
          <input
            type="file"
            id="poster"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="poster" className="file-upload">
            <img src="/file.png" alt="file" className="icon" />
            포스터 첨부
          </label>

          {selectedFile && (
            <div className="preview">
              <p>선택된 파일: {selectedFile.name}</p>
              <img src={URL.createObjectURL(selectedFile)} alt="preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
            </div>
          )}

          <div className="section">
            <span className="label">가맹점 주소</span>
            <textarea
              className="textarea"
              placeholder="내용을 입력하세요."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
    </div>
  );
}
