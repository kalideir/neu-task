import React, { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Post } from '.';
import { GetPostsQueryData, IPost } from '../../@types';
import styled from '@emotion/styled';
import { findMinSum, mq } from '../../utils';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      body
      userId
    }
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  width: 65%;
  margin: auto;
  ${mq['xs']} {
    width: 95%;
    grid-template-columns: repeat(1, 1fr);
  }
  ${mq['sm']} {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
  }
  ${mq['md']} {
    width: 90%;
    grid-template-columns: repeat(3, 1fr);
  }
  ${mq['lg']} {
    width: 70%;
    grid-template-columns: repeat(3, 1fr);
  }
`;

function PostsList() {
  const { loading, data } = useQuery<GetPostsQueryData>(GET_POSTS);




  const posts = useMemo(() => {
    if (!data?.posts) return
    const titles = data.posts.map(post => post.title);
    const sortedSums = findMinSum(titles);
    const tripletStartsAt = sortedSums[0][0];
    return data.posts.map<IPost & { isInTriplet: boolean }>((post, index) => {
      if (index - tripletStartsAt >= 0 && index - tripletStartsAt <= 2) return { ...post, isInTriplet: true };

      return { ...post, isInTriplet: false };
    });
  }, [data?.posts]);


  console.log(posts);
  
  if (loading) return <p>..Loading</p>;


  return (
    <List>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </List>
  );
}

export default PostsList;
