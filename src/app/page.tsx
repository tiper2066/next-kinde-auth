import prisma from '@/utils/db'; //  PrismaClient 객체의 함수 가져오기
import BlogPostCard from '@/components/general/BlogPostCard'; //  BlogPostCard 컴포넌트
import { Suspense } from 'react';

//  데이터 가져오는 함수
const getData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); //  2초 지연

    //  실제 postgre db 에서 데이터를 가져온다.
    const data = await prisma.blogPost.findMany({
        select: {
            //  select 쿼리 : 아래 필드에서 모두 가져온다.
            title: true,
            content: true,
            imageUrl: true,
            authorId: true,
            authorName: true,
            authorImage: true,
            id: true,
            createdAt: true,
            updatedAt: true, //  적용하지 않았던 필드 추가
        },
    });
    return data;
};

//  로딩 처리할 부분만 별도의 함수로 만듬
const BlogPosts = async () => {
    const data = await getData();
    /* ---------- 데이터 리스트 컨테이너 : 기본 1컬럼, 768 2컬럼 1024 3컬럼 ---------- */
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.map((item) => (
                //  BlogPostCard 컴포넌트에 데이터 전달하도록 대체
                <BlogPostCard data={item} key={item.id} />
            ))}
        </div>
    );
};

//  async 제거
export default function Home() {
    return (
        <div className='py-6'>
            {/* ---------- 페이지 타이틀 ---------- */}
            <h1 className='text-3xl font-bold tracking-tight mb-8'>
                Latest Post
            </h1>
            {/*  로딩 처리할 특정 부분을 Suspense 요소로 감싸서 처리함  */}
            <Suspense fallback={<p>Hello, Waiting...</p>}>
                {/* 로딩 처리할 부분을 별도의 컴포넌트로 만들어 사용 */}
                <BlogPosts />
            </Suspense>
        </div>
    );
}
