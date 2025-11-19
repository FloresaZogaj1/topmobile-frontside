import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import blogPosts from "../blogData";
import { Link } from "react-router-dom";

const BlogCarousel = () => (
  <div
    style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "40px 0",
      background: "var(--bg)",
      color: "var(--text)"
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: 30,
        fontWeight: 700,
        letterSpacing: 1,
        color: "var(--text)",
      }}
    >
      Artikujt e fundit
    </h2>
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      style={{ paddingBottom: 50 }}
      breakpoints={{
        0: { slidesPerView: 1 },
        700: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {blogPosts.map((post) => (
        <SwiperSlide key={post.id}>
          <Link to={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                boxShadow: "var(--shadow-lg)",
                borderRadius: 20,
                overflow: "hidden",
                background: "var(--card)",
                transition: "box-shadow 0.2s",
                cursor: "pointer",
                height: 400,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              <div
                style={{
                  padding: 20,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: 14,
                    marginBottom: 6,
                  }}
                >
                  {post.date}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                    marginBottom: 12,
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: 15, flex: 1 }}>
                  {post.excerpt}
                </p>
                <span
                  style={{
                    color: "var(--accent)",
                    fontWeight: 600,
                    marginTop: 12,
                  }}
                >
                  Lexo më shumë →
                </span>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default BlogCarousel;
