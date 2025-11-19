import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../blogData";
import BlogSubscribe from "./BlogSubscribe";

const responsiveStyle = `
  @media (max-width: 700px) {
    .blog-list-container { padding: 18px 0 30px 0 !important; }
    .blog-list-title { font-size: 22px !important; margin-bottom: 24px !important; }
    .blog-list-grid { gap: 14px !important; }
    .blog-list-card { min-height: 240px !important; }
    .blog-list-img { height: 110px !important; }
    .blog-list-card-content { padding: 10px !important; }
    .blog-list-date { font-size: 11px !important; }
    .blog-list-post-title { font-size: 15px !important; min-height: 20px !important; }
    .blog-list-excerpt { font-size: 13px !important; margin-bottom: 10px !important; }
    .blog-list-btn { font-size: 12px !important; padding: 6px 10px !important; }
  }
`;

const BlogList = () => (
  <div
    className="blog-list-container"
    style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "48px 0 60px 0",
      background: "var(--bg)",
      color: "var(--text)"
    }}
  >
    <style>{responsiveStyle}</style>
    <h1
      className="blog-list-title"
      style={{
        textAlign: "center",
        fontWeight: 800,
        fontSize: 34,
        color: "var(--text)",
        marginBottom: 38
      }}
    >
      Blogu Top Mobile
    </h1>
    <div
      className="blog-list-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
        gap: 32,
      }}
    >
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="blog-list-card"
          style={{
            background: "var(--card)",
            border: "1px solid var(--stroke)",
            boxShadow: "var(--shadow-lg)",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: 390,
          }}
        >
          <Link
            to={`/blog/${post.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="blog-list-img"
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderBottom: "1px solid var(--stroke)",
              }}
            />
            <div
              className="blog-list-card-content"
              style={{
                padding: 22,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                className="blog-list-date"
                style={{
                  color: "var(--accent)",
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 10,
                  letterSpacing: 0.3,
                }}
              >
                {post.date}
              </span>
              <h3
                className="blog-list-post-title"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: 0,
                  marginBottom: 13,
                  minHeight: 52,
                }}
              >
                {post.title}
              </h3>
              <p
                className="blog-list-excerpt"
                style={{
                  color: "var(--muted)",
                  fontSize: 16,
                  flex: 1,
                  marginBottom: 20,
                }}
              >
                {post.excerpt}
              </p>
              <span
                className="blog-list-btn"
                style={{
                  display: "inline-block",
                  marginTop: "auto",
                  padding: "8px 22px",
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 15,
                  boxShadow: "0 1px 5px rgba(0,0,0,.5)",
                  letterSpacing: 0.5,
                  transition: "background 0.14s",
                }}
              >
                Lexo më shumë
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
    <BlogSubscribe />
  </div>
);

export default BlogList;
