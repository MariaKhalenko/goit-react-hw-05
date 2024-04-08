import { useState } from "react";
// import css from "./SearchForm.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (evt) => {
    // if (!evt.target.value) {
    // }
    setQuery(evt.target.value.toLowerCase());
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        onChange={handleChange}
        value={query}
      />
      <button type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
