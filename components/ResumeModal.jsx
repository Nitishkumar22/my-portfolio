"use client";
// components/ResumeModal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { Server, Cloud, X } from "lucide-react";
import { RESUMES as RESUME_FILES } from "../lib/site";
import { lockScroll } from "./SmoothScroll";
import { useIsClient } from "../hooks/useIsClient";

const loadMotionFeatures = () => import("../lib/motionFeatures").then(mod => mod.default);

const ICONS   = { backend: Server, devops: Cloud };
const RESUMES = RESUME_FILES.map(r => ({ ...r, Icon: ICONS[r.id] }));

const MODAL_CSS = `
  .rm-overlay {
    position: fixed; inset: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    background: rgba(0,0,0,.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .rm-box {
    position: relative; width: 100%; max-width: 420px;
    border-radius: 16px; padding: 1.75rem 1.5rem 1.5rem;
    font-family: 'Geist', sans-serif;
  }
  .rm-title { font-size: 18px; font-weight: 600; letter-spacing: -.02em; margin: 0 0 4px; }
  .rm-sub   { font-size: 13px; margin: 0 0 1.25rem; }
  .rm-close {
    position: absolute; top: 14px; right: 14px;
    border: none; background: none; cursor: pointer;
    display: flex; padding: 4px; border-radius: 6px;
    transition: color .2s;
  }
  .rm-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .rm-option {
    display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
    padding: 1rem; border-radius: 12px; text-decoration: none;
    transition: transform .2s, border-color .2s;
  }
  .rm-option:hover { transform: translateY(-2px); }
  .rm-option-label { font-size: 15px; font-weight: 600; }
  .rm-option-desc  { font-size: 12px; line-height: 1.4; }
  @media(max-width:400px) { .rm-options { grid-template-columns: 1fr; } }
`;

export default function ResumeModal({ open, onClose, t }) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lockScroll(false);
    };
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <LazyMotion features={loadMotionFeatures} strict>
      <AnimatePresence>
        {open && (
          <m.div
            key="rm-overlay"
            className="rm-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <style>{MODAL_CSS}</style>
            <m.div
              className="rm-box"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="rm-title"
              onClick={e => e.stopPropagation()}
              style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.text }}
            >
              <button className="rm-close" onClick={onClose} aria-label="Close" style={{ color: t.muted }}
                onMouseOver={e => e.currentTarget.style.color = t.text}
                onMouseOut={e => e.currentTarget.style.color = t.muted}>
                <X size={18} />
              </button>

              <h2 id="rm-title" className="rm-title">Download Resume</h2>
              <p className="rm-sub" style={{ color: t.muted }}>Which version would you like?</p>

              <div className="rm-options">
                {RESUMES.map(({ id, label, desc, file, Icon }) => (
                  <a
                    key={id}
                    href={file}
                    download={file.split("/").pop()}
                    onClick={onClose}
                    className="rm-option"
                    style={{ background: t.card, border: `1px solid ${t.border}`, color: t.text }}
                    onMouseOver={e => e.currentTarget.style.borderColor = t.muted}
                    onMouseOut={e => e.currentTarget.style.borderColor = t.border}
                  >
                    <Icon size={22} />
                    <span className="rm-option-label">{label}</span>
                    <span className="rm-option-desc" style={{ color: t.muted }}>{desc}</span>
                  </a>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>,
    document.body
  );
}
