"use client";

import { useState } from "react";
import { submitTestimonial } from "@/app/actions";

export default function TestimonialModal() {
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
        setSuccessMsg("Terima kasih! Testimoni Anda berhasil dikirim.");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrorMsg(result.error || "Terjadi kesalahan.");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="testi-cta-wrap reveal">
        <button onClick={handleOpen} className="btn btn-primary btn-lg">
          Beri Testimoni
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay open" onClick={handleClose} style={{ zIndex: 1000 }}>
          <div className="modal-box testi-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose} aria-label="Tutup">
              ✕
            </button>
            <div className="modal-content">
              <h2 className="modal-title">Berikan Testimoni Anda</h2>
              <p className="modal-section-label" style={{ marginBottom: "20px" }}>
                Pengalaman Anda sangat berarti bagi kami.
              </p>

              {successMsg ? (
                <div className="alert-success">{successMsg}</div>
              ) : (
                <form onSubmit={handleSubmit} className="testi-form">
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" name="name" required placeholder="Contoh: Budi Santoso" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Kota</label>
                      <input type="text" id="city" name="city" required placeholder="Contoh: Jakarta" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="housing_type">Tipe Hunian</label>
                      <input type="text" id="housing_type" name="housing_type" required placeholder="Contoh: Kost Eksklusif" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Rating</label>
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
                    <label htmlFor="content">Ulasan Anda</label>
                    <textarea
                      id="content"
                      name="content"
                      required
                      rows={4}
                      placeholder="Ceritakan pengalaman Anda mencari hunian bersama kami..."
                    ></textarea>
                  </div>

                  {errorMsg && <div className="alert-error">{errorMsg}</div>}

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Kirim Testimoni"}
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
