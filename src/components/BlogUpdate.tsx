import React from "react";
interface Props {
  feeds: { description: string; link: string; title: string }[];
}
const BlogUpdate = ({ feeds }: Props) => {
  return (
    <div>
      {feeds.map((feed) => (
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: feed.description }}
        ></div>
      ))}
    </div>
  );
};

export default BlogUpdate;
