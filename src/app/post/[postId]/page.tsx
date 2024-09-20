import Post from '@/container/post/Post';
import React from 'react';

function Page({ params }: { params: { postId: string } }) {
  return (
    <section>
      <Post params={params} />
    </section>
  );
}

export default Page;
