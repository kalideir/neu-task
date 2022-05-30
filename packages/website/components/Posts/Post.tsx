import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import moment from 'moment';
import { GetUserQueryData, GetUserVars, IPost } from '../../@types';

interface Props {
  post: IPost & {isInTriplet: boolean};
}

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const Article = styled.article<{isInTriplet: boolean}>`
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 17px;
  margin: auto;
  overflow: hidden;
  height: 18rem;
  box-sizing: border-box;
  position: relative;
  border: ${props => props.isInTriplet ? "3px solid red" : "none"};
  &:hover {
      cursor: pointer;
      transform: translate(0, -10px);
  }
`;

const Header = styled.h1`
  font-size: 0.85rem;
  padding: 0 0.5rem;
  font-weight: 400;
  margin-top: 0.4rem;
  color: rgb(18 71 52 / 1);
`;

const Component = styled.div<{image: string}>`
  height: 100%;
  .top {
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 40%;
    width: 100%;
  }
  .content {
    margin-top: 0.5rem;
    .category {
        padding: 0 0.5rem;
        font-size: 0.7rem;
        font-weight: 200;
        color: #111;
    }
    .date {
        padding: 0 0.5rem;
        font-size: 0.6rem;
        position: absolute;
        bottom: 4rem;
        font-weight: 200;

    }
    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        width: 100%;
        bottom: 5px;
        padding: 0 0.5rem;
        .user {
            display: flex;
            align-items: center;
            img {
                width: 1.8rem;
                height: 1.8rem;
                border-radius: 50%
            }
            span {
                font-size: 0.6rem;
                margin-left: 0.3rem;
                font-weight: 400;
            }
        }

        .reading-time {
            display: flex;
            align-items: center;
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
            span {
                font-size: 0.55rem;
                margin-left: 0.2rem;
                font-weight: bold;
                margin-right: 1rem;
            }
        }
    }
  }
`;

function Post({ post }: Props) {
  const { loading, data, error } = useQuery<GetUserQueryData, GetUserVars>(
    GET_USER,
    { variables: { id: post.userId } }
  );

  if (loading) return null;

  return (
    <>
      <Article isInTriplet={post.isInTriplet}>
        <Component image={`https://picsum.photos/400/200?random=${post.id}`}>
          <div className="top"></div>
          <div className="content">
            <span className='category'>category</span>
            <Header>{post.title}</Header>
            <span className='date'><b>Published on: </b> {moment().subtract(+post.id, 'days').format('MM/DD/YYYY')}</span>
            <div className="bottom">
                <div className="user">
                    <img src={`https://randomuser.me/api/portraits/men/${post.userId}.jpg`} alt="" />
                    <span className=''>{data.user.name}</span>
                </div>
                <div className="reading-time">
                    <img src="https://cdn-icons-png.flaticon.com/512/711/711628.png" alt="" />
                    <span className=''>4 minutes</span>
                </div>
            </div>
          </div>
        </Component>
      </Article>
    </>
  );
}

export default Post;
