import '../styles/Words.scss';

type WordsProps = {
  id: string;
  words: string[];
};

export const Words = ({ id, words }: WordsProps) => {
  return <div className={ `words words-${id}` }>
    { words.map( word => {
      return <span className="words__word" key={word}>
        {word}
      </span>;
    } ) }
  </div>;
};
