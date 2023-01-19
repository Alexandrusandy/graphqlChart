import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "./Components/Spinner";
import Chart from "./Components/Chart";
import groupPostsByMonth from "./utils/groupPostByMonth";

const GET_POSTS = gql`
  query ($count: Int!) {
    allPosts(count: $count) {
      id
      createdAt
    }
  }
`;

const App = () => {
  const [postCount, setPostCount] = useState(100);
  const selectOptions = [100, 200, 500, 1000, 1500];
  const { loading, error, data } = useQuery(GET_POSTS, {
      variables: { count: postCount },
    });
    //group datas
  const groupedByMonth = useMemo(() => {
    if (!data) {
      return null;
    }
    return groupPostsByMonth(data.allPosts);
  }, [data]);

  switch (true) {
    case loading:
      return <Spinner />;
    case error:
      return <p>Error while fetching posts</p>;
    default:
      return (
        <div>
          <h1 style={{textAlign:'center'}}>Chart with 2019 Posts</h1>
          <div style={{display:'flex',justifyContent:'center',margin:20}}> 
          <label htmlFor="post-count-select">Number of posts to display:</label>
          <select
            id="post-count-select"
            value={postCount}
            onChange={(e) => setPostCount(parseInt(e.target.value))}
          >
            {selectOptions.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          </div>
          
          <Chart groupedPosts={groupedByMonth}  style={{margin:20}}/>
        </div>
      );
  }
};

export default App;
