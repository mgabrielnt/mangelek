type Props = { title: string; text: string; image: string };

export function FeatureCard({ title, text, image }: Props) {
  return (
    <article className="featureCard">
      <img
        className="featureImage"
        src={`/images/marketing/features/${image}`}
        alt={`Tampilan ${title}`}
      />
      <div className="featureCopy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
