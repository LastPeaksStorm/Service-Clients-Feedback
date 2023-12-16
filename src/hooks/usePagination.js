import {useMemo} from "react";

export const usePagination = totalPages => {
  let result = useMemo(() => {
    let temp = [];
    for (let i = 0; i < totalPages; i++) {
      temp.push(i + 1);
    }
    return temp;
  }, [totalPages]);
  
  return result;
};