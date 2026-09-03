import { googleReviews } from "../../lib/site-data";

export function ReviewCards({ limit = googleReviews.length }: { limit?: number }) {
  return (
    <div className="review-card-grid">
      {googleReviews.slice(0, limit).map((review) => (
        <article className="review-card" key={review.name}>
          <div className="review-card-top"><span className="google-review-source"><span className="google-g-mark" aria-hidden="true">G</span><span className="review-source">Google review</span></span><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span></div>
          <p>“{review.body}”</p>
          <footer><strong>{review.name}</strong><span>{review.profileReviews}</span></footer>
        </article>
      ))}
    </div>
  );
}
