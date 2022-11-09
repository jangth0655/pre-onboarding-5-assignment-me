import Term from '../term/Term';
import S from './styles';

const array = [1, 2, 3, 4, 5];

const SearchBoard = () => {
  return (
    <S.BoardContainer>
      <S.SuggestedTermContainer>
        <S.SuggestedTerm>추천 검색어</S.SuggestedTerm>
      </S.SuggestedTermContainer>
      {array.map((v) => (
        <Term key={v} term={v} />
      ))}
    </S.BoardContainer>
  );
};
export default SearchBoard;