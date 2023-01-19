const groupPostsByMonth = (posts) => {
    const groupedPosts = {};
    posts.forEach((post) => {
      const date = new Date(parseInt(post.createdAt));
      const month = date.getUTCMonth();
      if (!groupedPosts[month]) {
        groupedPosts[month] = { id: post.id, count: 0 };
      }
      groupedPosts[month].count++;
    });
    return Object.values(groupedPosts);
  };
export default groupPostsByMonth