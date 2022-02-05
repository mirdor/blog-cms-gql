import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RecentPost } from "../common/types";
import { getRecentPosts, getSimilarPosts } from "../services";

type Props = {
  categories: string[];
  slug?: string;
};

const PostWidget = ({ categories, slug }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<RecentPost[]>([]);
  useEffect(() => {
    slug
      ? getSimilarPosts(categories, slug).then((result) => {
          setRelatedPosts(result);
        })
      : getRecentPosts().then((result) => {
          setRelatedPosts(result);
        });
  }, [slug]);

  console.log(relatedPosts);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 '>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => {
        return (
          <div key={post.title} className='flex items-center w-full mb-4'>
            <div className='w-16 flex-none'>
              <img
                src={post.featuredImage.url}
                alt={post.title}
                height='60px'
                width='60px'
                className='align-middle rounded-full object-cover'
              />
            </div>
            <div className='flex-grow ml-4'>
              <p className='text-gray-500 font-xs'>
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title}>
                {post.title}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostWidget;
