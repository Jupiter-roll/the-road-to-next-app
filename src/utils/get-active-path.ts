import { closest } from "fastest-levenshtein";

export const getActivePath = (path: string, paths: string[]) => {
  const closestPath = closest(path, paths);
  const index = paths.indexOf(closestPath);

  return { activeIndex: index, activePath: closestPath };
};
