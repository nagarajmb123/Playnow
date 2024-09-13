import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/searchSlice";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  return (
    <form className="border-violet-700 border-2  rounded-md text-white">
      <TextField
        className="bg-violet-900/60  text-white"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        InputProps={{
          className: "text-white",
          sx: {
            color: "white",
          },
        }}
        label="Search"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton
        aria-label="search"
        onClick={() => {
          dispatch(setSearchTerm(searchQuery));
        }}
      >
        <SearchIcon style={{ fill: "purple" }} />
      </IconButton>
    </form>
  );
};
