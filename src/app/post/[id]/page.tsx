import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import prisma from '@/utils/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 전달 받은 id 를 이용, BlogPost 테이블에서 id 값과 일치하는 데이터를 가져오기
const getData = async (id: string) => {
    const data = await prisma.blogPost.findUnique({
        where: {
            id: id,
        },
    });
    // 만일 찾는 id 값의 데이터가 없다면...
    if (!data) {
        return notFound(); // Next.js 에서 제공하는 404 페이지로 이동
    }
    return data; // 데이터가 있다면 반환함
};

// URL 로 전달되는 매개변수(파라미터)는 비동기(Promise) 타입이다
type Params = Promise<{ id: string }>; // id 만 추출할 것이므로...

// 비동기 (Promise) 타입의 파라미터 전달 받는 비동기 함수 컴포넌트
const PostDetailPage = async ({ params }: { params: Params }) => {
    const { id } = await params; // 전달받은 파라미터에서 id 추출
    const data = await getData(id); // id 전달 및 getData 함수 호출하여 데이터를 받환받음

    return (
        <div className='max-w-3xl mx-auto py-8 px-4'>
            <Link href='/' className={buttonVariants({ variant: 'secondary' })}>
                Back to Posts
            </Link>
            <div className='mb-8 mt-6'>
                <h1 className='text-3xl font-bold tracking-tight mb-4'>
                    {data.title}
                </h1>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                        <div className='relative w-10 h-10 overflow-hidden rounded-full'>
                            <Image
                                src={data.authorImage}
                                alt={data.authorName}
                                fill
                                sizes='40px' // 부모에 width, height 설정해줘도 sizes 속성이 있어야 함
                                className='object-cover'
                            />
                        </div>
                        <p className='font-medium'>{data.authorName}</p>
                    </div>
                    <p className='text-sm text-gray-500'>
                        {new Intl.DateTimeFormat('ko-KR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        }).format(data.createdAt)}
                    </p>
                </div>
            </div>
            <div className='relative h-[400px] w-full mb-8 overflow-hidden rounded-lg'>
                <Image
                    src={data.imageUrl}
                    alt={data.title}
                    fill
                    className='object-cover'
                    priority // 우선순위 높게 빨리 로딩되야 함
                />
            </div>
            <Card>
                <CardContent>
                    <p className='text-gray-700'>{data.content}</p>
                </CardContent>
            </Card>
        </div>
    );
};
export default PostDetailPage;
