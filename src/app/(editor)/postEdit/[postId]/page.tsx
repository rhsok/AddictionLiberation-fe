import PostEdit from '@/container/write/PostEdit';

function Page({ params }: { params: { postId: string } }) {
  return (
    <div>
      <PostEdit params={params} />
    </div>
  );
}

export default Page;
