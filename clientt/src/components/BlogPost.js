// /pages/BlogPost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../blogData";
import "./BlogPost.css"; // ⬅️ tema dark: var(--bg), --card, --text, --muted, --accent, .iphone-page

const responsiveStyle = `
  @media (max-width: 700px) {
    .blog-post-container { padding: 14px !important; max-width: 99vw !important; margin: 16px auto 28px auto !important; }
    .blog-post-img { max-height: 160px !important; margin-bottom: 12px !important; }
    .blog-post-date { font-size: 11px !important; }
    .blog-post-title { font-size: 20px !important; margin-bottom: 10px !important; }
    .blog-post-content { font-size: 15px !important; margin-bottom: 12px !important; }
    .blog-post-back { font-size: 13px !important; margin-top: 10px !important; }
  }
`;

const FALLBACK_IMG = "https://topmobile.store/og-image.jpg";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));
  if (!post)
    return (
      <div
        className="iphone-page"
        style={{ color: "var(--text)", minHeight: "60vh", display: "grid", placeItems: "center" }}
      >
        Artikulli nuk u gjet.
      </div>
    );

  return (
    <div className="iphone-page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div
        className="blog-post-container"
        style={{
          maxWidth: 860,
          margin: "54px auto 70px auto",
          background: "var(--card)",
          border: "1px solid var(--stroke)",
          borderRadius: 16,
          boxShadow: "var(--shadow-lg)",
          padding: 38,
          minHeight: 520,
          color: "var(--text)",
        }}
      >
        <style>{responsiveStyle}</style>

        <img
          src={post.image}
          alt={post.title}
          className="blog-post-img"
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            maxHeight: 320,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 22,
            border: "1px solid var(--stroke)",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />

        <div
          className="blog-post-date"
          style={{
            color: "var(--accent)",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: 0.2,
            marginBottom: 6,
          }}
        >
          {post.date}
        </div>

        <h1
          className="blog-post-title"
          style={{
            fontWeight: 900,
            fontSize: 30,
            color: "var(--text)",
            margin: "0 0 20px 0",
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h1>

        <div
          className="blog-post-content"
          style={{
            fontSize: 17,
            color: "var(--muted)",
            lineHeight: 1.75,
            marginBottom: 24,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <Link
          to="/blog"
          className="blog-post-back"
          style={{
            color: "var(--accent)",
            fontWeight: 800,
            fontSize: 15,
            textDecoration: "none",
            letterSpacing: 0.3,
            display: "inline-block",
            marginTop: 20,
            borderBottom: "1px dotted var(--accent)",
          }}
        >
          ← Kthehu te blogu
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
