/* Not used */
import { useEffect, useState } from "react";

export function Card() {
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
    <div className="container row">
      {posts.map((post) => {
        let myDate = new Date(post.date);
        let output =
          myDate.getDate() +
          " " +
          myDate.toLocaleString("en-UK", { month: "long" }) +
          " " +
          myDate.getFullYear();
        return (
          <div
            className="p-card col-small-1 col-medium-2 col-3 card"
            key={post.id}
          >
            <div className="p-card__content">
              <h5>{post._embedded["wp:term"][0][0].name.toUpperCase()}</h5>
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
