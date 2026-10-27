import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
export function Reveal({ children, className = "" }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
export function Button({ to, children, secondary = false }) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
export function Heading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const prior = document.activeElement;
    ref.current.showModal();
    return () => prior?.focus();
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          autoFocus
          className="close icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <span className="eyebrow">CYBERVAULT / KNOWLEDGE BASE</span>
        <h2>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
