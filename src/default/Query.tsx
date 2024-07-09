import { useEffect, useState } from "react";
import { Fetch } from "../api/Fetch";

export const Query = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function FetchPosts() {
      setLoading(true);
      setPosts(await Fetch(page));
      setLoading(false);
    }
    FetchPosts();
  }, [page]);

  // if (loading) {
  //     return <h3>ИДЁТ ЗАГРУЗКА</h3>
  // }

  return (
    <div style={{ margin: "30px 90px" }}>
      {loading ? (
        <h2>ИДЁТ ЗАГРУЗКА...</h2>
      ) : (
        <table>
          <thead></thead>
          <tbody>
            {posts.map((post: { id: number; title: string }) => (
              <tr key={post.id} style={{fontSize: 18}}>
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
