import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import { debouce, apiHelper } from "./helperFunction";

export default function App() {
  const [search, setSearch] = useState(null);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const searchRef = useRef(null);
  const suggestionListRef = useRef(null);
  const deboucedSearchApi = useMemo(
    () =>
      debouce(() => {
        apiHelper().then(setSuggestions);
      }, 1000),
    []
  );

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
    if (value?.trim()?.length === 0) {
      setShowSuggestionList(false);
      return;
    }
    deboucedSearchApi(value);
    if (!showSuggestionList) setShowSuggestionList(true);
  }, []);

  const handleSuggestionItemClick = useCallback((data) => {
    setShowSuggestionList(false);
    setSearch(data);
    setSuggestions(null);
  }, []);

  useEffect(() => {
    function handleClickOutsideModal(e) {
      const target = e.target;
      if (target != searchRef.current && target != suggestionListRef.current) {
        setShowSuggestionList(false);
      }
    }
    window.addEventListener("click", handleClickOutsideModal);
    return () => window.removeEventListener("click", handleClickOutsideModal);
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        onChange={handleChange}
        value={search}
        className="search"
        ref={searchRef}
      />
      <div className="suggestion-container" ref={suggestionListRef}>
        {showSuggestionList
          ? suggestions?.map((data, index) => {
              return (
                <p
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionItemClick(data)}
                >
                  {data}
                </p>
              );
            })
          : null}
      </div>
    </div>
  );
}
