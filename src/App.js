import { useEffect, useState } from "react";
/* import { Card } from './components/Card/Card'; */
import { Card, Row, Col } from "@canonical/react-components";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
    )
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Row>
        {posts.map((post) => {
          let myDate = new Date(post.date);
          let output =
            myDate.getDate() +
            " " +
            myDate.toLocaleString("en-UK", { month: "long" }) +
            " " +
            myDate.getFullYear();
          return (
            <Col medium={2} size={3} key={post.id}>
            <Card
              title={post._embedded["wp:term"][0][0].name.toUpperCase()}
              className="card"
            >
              <hr className="p-separator u-no-margin--top firstHr" />
              <img
                src={post.featured_media}
                alt={post.featured_media}
                className="p-card__image"
              />
              <div>
                <a className="p-card__content" href={post.link}>
                  {post.title.rendered}
                </a>
                <p>
                  <i>
                    By{" "}
                    <a href={post._embedded.author[0].link}>
                      {post._embedded.author[0].name}
                    </a>{" "}
                    on {output}
                  </i>
                </p>
              </div>
              <hr className="p-separator u-no-margin" />
              <p>Article</p>
              {/* This would be the content of the post */}
              {/* <p>{post.content.rendered}</p> */}
            </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default App;
