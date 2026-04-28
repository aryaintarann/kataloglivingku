"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitTestimonial } from "@/app/actions";

export default function TestimonialModal() {
  const t = useTranslations("testimonialForm");
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    setSuccessMsg("");
    setErrorMsg("");
    setRating(5);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());

    try {
      const result = await submitTestimonial(formData);
      if (result.success) {
        setSuccessMsg(t("success"));
        setTimeout(handleClose, 2000);
      } else {
        setErrorMsg(result.error || t("errorGeneral"));
      }
    } catch {
      setErrorMsg(t("errorSystem"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="testi-cta-wrap reveal">
        <button onClick={handleOpen} className="btn btn-primary btn-lg">
          {t("addBtn")}
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay open" onClick={handleClose} style={{ zIndex: 1000 }}>
          <div className="modal-box testi-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose} aria-label={t("closeLabel")}>
              ✕
            </button>
            <div className="modal-content">
              <h2 className="modal-title">{t("title")}</h2>
              <p className="modal-section-label" style={{ marginBottom: "20px" }}>
                {t("subtitle")}
              </p>

              {successMsg ? (
                <div className="alert-success">{successMsg}</div>
              ) : (
                <form onSubmit={handleSubmit} className="testi-form">
                  <div className="form-group">
                    <label htmlFor="name">{t("nameLabel")}</label>
                    <input type="text" id="name" name="name" required placeholder={t("namePlaceholder")} />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">{t("cityLabel")}</label>
                      <input type="text" id="city" name="city" required placeholder={t("cityPlaceholder")} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="housing_type">{t("housingLabel")}</label>
                      <input type="text" id="housing_type" name="housing_type" required placeholder={t("housingPlaceholder")} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t("ratingLabel")}</label>
                    <div className="rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= rating ? "active" : ""}`}
                          onClick={() => setRating(star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">{t("reviewLabel")}</label>
                    <textarea
                      id="content"
                      name="content"
                      required
                      rows={4}
                      placeholder={t("reviewPlaceholder")}
                    />
                  </div>

                  {errorMsg && <div className="alert-error">{errorMsg}</div>}

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                    {isSubmitting ? t("submitting") : t("submitBtn")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
