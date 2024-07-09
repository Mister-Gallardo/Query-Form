import { useState } from "react";
import { Fetch } from "../api/Fetch";
import { useQuery } from "react-query";

export const ReactQuery = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading,  } = useQuery(
        ["posts", page],
        () => FetchPosts(page),
        {
          // keepPreviousData: true,
          // refetchOnWindowFocus: false
        }
    );

  async function FetchPosts(page: number) {
    const data = await Fetch(page);

    return data;
  }

  return (
    <div style={{ margin: "30px 90px" }}>
      {isLoading ? (
        <h2>ИДЁТ ЗАГРУЗКА...</h2>
      ) : (
        <table>
          <thead></thead>
          <tbody>
            {data.map((post: { id: number; title: string }) => (
              <tr key={post.id} style={{ fontSize: 18 }}>
                <td>{post.id}</td>
                <td>{post.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button style={{marginRight: '15px'}} onClick={() => setPage(prev => prev-1)}>назад</button>
      <button onClick={() => setPage(prev => prev+1)}>вперёд</button>
    </div>
  );
};
