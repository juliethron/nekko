export function filterPosts(posts, query) {
  return posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
}
