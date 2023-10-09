import { useEffect } from "react";

type PageTitle = string;

const usePageTitle = (title: PageTitle) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "CATI 2023";
    };
  }, [title]);
};

export default usePageTitle;
