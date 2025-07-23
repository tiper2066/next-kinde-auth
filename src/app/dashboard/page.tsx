import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '@/utils/db'; //  PrismaClient 객체
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'; //   Kinde 세션 정보 얻는 함수
import BlogPostCard from '@/components/general/BlogPostCard';

//  데이터 가져오기 함수
const getData = async (userId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); //  2초 지연 함수

    // 현재 사용자의 게시물만 가져와서 data 변수에 저장
    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId, // 계시한 사용자의 게시물만 가져오기
        },
        orderBy: {
            createdAt: 'desc', // 가장 최신 순서대로
        },
    });

    return data; // data 반환
};
//  비동기 컴포넌트로 변경
const Dashboard = async () => {
    const { getUser } = getKindeServerSession(); //  kinde 에서 세션 정보 가져오기
    const user: any = await getUser(); //  세션에서 사용자 정보 추출
    const data = await getData(user?.id);

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-medium'>Your Blog Articles</h2>
                <Link className={buttonVariants({})} href='/dashboard/create'>
                    Create Post
                </Link>
            </div>
            {/*  사용자 게시물 목록 표시하기: 모바일 1컬럼, 768 2컬럼, 1024 3컬럼  */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data.map((item) => (
                    <BlogPostCard data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};
export default Dashboard;
