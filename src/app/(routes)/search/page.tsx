import { Metadata } from "next";

import Search from "./search";

export const metadata: Metadata = {
  title: "EXPOSURE | Search",
  description: "A ficctitional website to post photographies",
};

const SearchPage = () => {
  return (
    <Search />
  );
};

export default SearchPage;
