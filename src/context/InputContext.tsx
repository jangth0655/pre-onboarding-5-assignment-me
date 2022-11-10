import localData from 'api/cacheApi';
import Client from 'api/clientApi';
import SearchApi from 'api/searchApi';
import { Sick } from 'model/interface';
import React, { createContext, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

type Term = {
  search: (term: string) => void;
  terms: Sick[];
};

export const InputContext = createContext<Term | null>(null);

const client = new Client();
const searchApi = new SearchApi(client);

export const InputProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [terms, setTerms] = useState<Sick[]>([]);

  const search = (term: string) => {
    setTerm(term);
  };

  function timing() {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  async function searchAPICall() {
    const result = await searchApi.sickSearch(term);
    setTerms([...result.slice(0, 10)]);
  }

  useEffect(() => {
    if (!term) return;
    timing();
    // console.log('no api');
    if (!isLoading && localData.previewData(term) !== term) {
      // console.log('call api');
      searchAPICall();
    }
  }, [searchApi, term, isLoading]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <InputContext.Provider value={{ search, terms }}>
      {children}
    </InputContext.Provider>
  );
};