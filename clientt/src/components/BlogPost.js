import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../blogData";

const responsiveStyle = `
  @media (max-width: 700px) {
    .blog-post-container { padding: 10px !important; max-width: 99vw !important; margin: 12px auto 24px auto !important; }
    .blog-post-img { max-height: 120px !important; margin-bottom: 12px !important; }
    .blog-post-date { font-size: 11px !important; }
    .blog-post-title { font-size: 18px !important; margin-bottom: 10px !important; }
    .blog-post-content { font-size: 14px !important; margin-bottom: 11px !important; }
    .blog-post-back { font-size: 12px !important; margin-top: 10px !important; }
  }
`;

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));
  if (!post) return <div style={{ textAlign: "center", marginTop: 70 }}>Artikulli nuk u gjet.</div>;

  return (
    <div className="blog-post-container" style={{
      maxWidth: 760,
      margin: "54px auto 70px auto",
      background: "#fff",
      border: "1px solid #f1f1f1",
      borderRadius: 16,
      boxShadow: "0 2px 14px #ff800010",
      padding: 38,
      minHeight: 520
    }}>
      <style>{responsiveStyle}</style>
      <img
        src={post.image}
        alt={post.title}
        className="blog-post-img"
        style={{
          width: "100%",
          maxHeight: 290,
          objectFit: "cover",
          borderRadius: 10,
          marginBottom: 22
        }}
      />
      <div className="blog-post-date" style={{
        color: "#ff8000",
        fontWeight: 700,
        fontSize: 14,
        marginBottom: 6
      }}>{post.date}</div>
      <h1 className="blog-post-title" style={{
        fontWeight: 800,
        fontSize: 29,
        color: "#222",
        margin: "0 0 20px 0"
      }}>{post.title}</h1>
      <div className="blog-post-content" style={{
        fontSize: 17,
        color: "#242424",
        lineHeight: 1.7,
        marginBottom: 24
      }}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <Link to="/blog" className="blog-post-back" style={{
        color: "#ff8000",
        fontWeight: 600,
        fontSize: 15,
        textDecoration: "none",
        letterSpacing: 0.3,
        display: "inline-block",
        marginTop: 20
      }}>
        ← Kthehu te blogu
      </Link>
    </div>
  );
};

export default BlogPost;
