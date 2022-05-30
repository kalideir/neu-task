import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import styled from "@emotion/styled";
import Head from 'next/head';
import { PostsList } from '../components';

const Header = styled.h1`
font-size: 1.5rem;
color: rgb(18 71 52 / 1);
text-align: center;
margin: 3rem auto;
font-weight: 600;
letter-spacing: 3px;
text-transform: capitalize
`

const Posts: NextPage = () => {



  return (
    <div>
      <Head>
        <title>Posts | Neulabs fullstack assignment</title>
      </Head>
      <main>
        <Header>Post list</Header>
        <PostsList />
      </main>
    </div>
  );
};

export default Posts;
