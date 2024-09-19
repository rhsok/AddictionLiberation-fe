import Category from '@/container/category/Category';
import React, { useEffect } from 'react';

function Page({ params }: { params: { categoryId: string } }) {
  return (
    <div>
      <Category params={params} />
    </div>
  );
}

export default Page;
