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
        setSuccessMsg("Thank you! Your testimonial has been submitted.");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrorMsg(result.error || "An error occurred.");
      }
    } catch (err) {
      setErrorMsg("A system error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="testi-cta-wrap reveal">
        <button onClick={handleOpen} className="btn btn-primary btn-lg">
          Add Testimonial
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay open" onClick={handleClose} style={{ zIndex: 1000 }}>
          <div className="modal-box testi-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose} aria-label="Close">
              ✕
            </button>
            <div className="modal-content">
              <h2 className="modal-title">Share Your Experience</h2>
              <p className="modal-section-label" style={{ marginBottom: "20px" }}>
                Your feedback means a lot to us.
              </p>

              {successMsg ? (
                <div className="alert-success">{successMsg}</div>
              ) : (
                <form onSubmit={handleSubmit} className="testi-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="Example: John Doe" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input type="text" id="city" name="city" required placeholder="Example: Jakarta" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="housing_type">Housing Type</label>
                      <input type="text" id="housing_type" name="housing_type" required placeholder="Example: Exclusive Co-living" />
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
                    <label htmlFor="content">Your Review</label>
                    <textarea
                      id="content"
                      name="content"
                      required
                      rows={4}
                      placeholder="Tell us about your experience finding a home with us..."
                    ></textarea>
                  </div>

                  {errorMsg && <div className="alert-error">{errorMsg}</div>}

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Testimonial"}
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
