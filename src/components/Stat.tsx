import '../styles/Stat.scss';

type StatProps = {
  label: string;
  text: string | number;
};

export const Stat = ({ label, text }: StatProps) => {
  return <div className="stat">
    <h3 className="stat__label">{ label }</h3>
    <div className="stat__text">{ text }</div>
  </div>;
};
