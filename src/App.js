import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function App() {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] =useState(false);
  const [error,setError] = useState(null);
  const searchInputRef = useRef();
  
  const API_KEY = process.env.REACT_APP_API_KEY;
  const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=jp&q=${query}&category=technology&apiKey=${API_KEY}`;
  
  useEffect(() => {
    getResults();
  }, [])

  
  const getResults = async () => {
    setLoading(true);

    try{
      const response = await axios.get(
        NEWS_URL
        );

      setResults(response.data.articles);
    } catch(err) {
      setError(err);
    }

    setLoading(false);
  }

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  }

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
      <>
      <div className="p-6">
        <form onSubmit={handleSearch}>
          <div className="flex">
            <div className="pt-4">
              <TextField id="standard-basic" label="検索語句を入力" variant="standard" type="text" 
                onChange={event => setQuery(event.target.value)} 
                value={query}
                ref={searchInputRef} />
            </div>
            <div className="pl-6 pt-8">
              <Button type="button" variant="outlined">
              検索
              </Button>
              <Button type="button" onClick={handleClearSearch} variant="outlined" startIcon={<DeleteIcon />}>
              クリア
              </Button>
            </div>
          </div>
        </form>

          {loading ? (
            <div className="mt-6">検索中・・・</div>
          ) : 
          <ul className="mt-6">
            {results.length === 0 ? <p>検索結果なし</p> : results.map((result, i) => (
              <li className="border-b-4 mt-6 pb-6 border-indigo-600" key={i}>
                <a className="text-blue-600 text-xl" href={result.url}>{result.title}</a>
                <div className="flex mt-4">
                  <p style={{width:'20%'}}><img style={{width:'100%'}} className="inline" src={result.urlToImage} alt="ニュース画像" /></p>
                  <p style={{width:'80%'}} className="ml-4 align-top">{result.description}</p>
                </div>
              </li>
            ))}
          </ul>
          }

          {error && <div>{error.message}</div>}
        </div>
      </>
  )
}