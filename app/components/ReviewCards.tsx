import Image from "next/image";
import { googleReviews } from "../../lib/site-data";

export function ReviewCards({ limit = googleReviews.length }: { limit?: number }) {
  return (
    <div className="review-card-grid">
      {googleReviews.slice(0, limit).map((review) => (
        <article className="review-card" key={review.name}>
          <div className="review-card-top"><Image className="google-g-mark" src="/images/google-g-logo.svg" alt="" aria-hidden="true" width={25} height={25} /><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span></div>
          <p>“{review.body}”</p>
          <footer><strong>{review.name}</strong><span>{review.suburb}</span></footer>
        </article>
      ))}
    </div>
  );
}
