import { IPost } from "../@types";

export function findMinSum(posts: IPost['title'][]) {
    let sizes = posts.map(title => title.length);

    const results : [number, number][] = [];
    
    for (let i=0; i < sizes.length - 2;  i++) {
      results.push([i, sizes[i] + sizes[i + 1] + sizes[i + 2]])
    };
    

    const sortedMinSums = results.splice(0).sort((a, b) => a[1] - b[1]);

    
    return sortedMinSums;
}