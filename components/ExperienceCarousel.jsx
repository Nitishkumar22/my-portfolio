"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CSS = `
  .experience-carousel {
    padding: 0 0 60px 0;
  }
  
  .experience-card {
    height: 100%;
    padding: 32px;
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  
  .experience-card:hover {
    transform: translateY(-4px);
  }
  
  .experience-header {
    margin-bottom: 20px;
  }
  
  .experience-role {
    font-family: 'Geist', sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }
  
  .experience-company {
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    margin-bottom: 6px;
  }
  
  .experience-meta {
    display: flex;
    gap: 12px;
    align-items: center;
    font-family: 'Geist Mono', monospace;
    font-size: 12px;
  }
  
  .experience-type {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .experience-points {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .experience-point {
    padding: 10px 0;
    padding-left: 24px;
    position: relative;
    font-size: 14px;
    line-height: 1.7;
  }
  
  .experience-point::before {
    content: "→";
    position: absolute;
    left: 0;
    font-family: 'Geist Mono', monospace;
  }
  
  .swiper-pagination {
    bottom: 20px !important;
  }
  
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
    width: 24px;
    border-radius: 4px;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 16px;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
`;

export default function ExperienceCarousel({ experiences, t }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="experience-carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          style={{
            "--swiper-navigation-color": t.text,
            "--swiper-pagination-color": t.text,
            "--swiper-navigation-size": "16px",
          }}
        >
          {experiences.map((exp, index) => (
            <SwiperSlide key={index}>
              <div
                className="experience-card"
                style={{
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                }}
              >
                <div className="experience-header">
                  <h3 className="experience-role" style={{ color: t.text }}>
                    {exp.role}
                  </h3>
                  <div className="experience-company" style={{ color: t.muted }}>
                    {exp.company}
                  </div>
                  <div className="experience-meta" style={{ color: t.dim }}>
                    <span>{exp.period}</span>
                    <span
                      className="experience-type"
                      style={{
                        background: `${t.text}15`,
                        color: t.text,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>
                <ul className="experience-points">
                  {exp.points.map((point, i) => (
                    <li
                      key={i}
                      className="experience-point"
                      style={{ color: t.muted }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
