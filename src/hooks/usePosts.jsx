import {useMemo} from "react";

export const useSortedPosts = (posts, sortOption) => {
  return useMemo(() => {
    if (sortOption) {
      if (sortOption === 'id') {
        return [...posts].sort((a, b) => {
          if (a[sortOption] < b[sortOption]) {
            return -1;
          }
          if (a[sortOption] > b[sortOption]) {
            return 1;
          }
          return 0;
        });
      }
      return [...posts].sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
    }
    return posts;
  }, [sortOption, posts]);
}

export const usePosts = (posts, sortOption, query) => {
  const sortedPosts = useSortedPosts(posts, sortOption);
  
  return useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())
      || post.body.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedPosts]);
}