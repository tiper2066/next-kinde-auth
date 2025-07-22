import prisma from '@/utils/db'; // ******** PrismaClient 객체의 함수 가져오기

// ************** 데이터 가져오는 함수
const getData = async () => {
    // **************************** 실제 postgre db 에서 데이터를 가져온다.
    const data = await prisma.blogPost.findMany({
        select: {
            // **************** select 쿼리 : 아래 필드에서 모두 가져온다.
            title: true,
            content: true,
            imageUrl: true,
            authorId: true,
            authorName: true,
            authorImage: true,
            id: true,
            createdAt: true,
        },
    });
    return data;
};

export default async function Home() {
    const data = await getData();
    return (
        <div className='py-6'>
            {/* ---------- 페이지 타이틀 ---------- */}
            <h1 className='text-3xl font-bold tracking-tight mb-8'>
                Latest Post
            </h1>

            {/* ---------- 데이터 리스트 컨테이너 ---------- */}
            {/* 기본 1컬럼, 768 2컬럼 1024 3컬럼 */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data.map((item) => (
                    <div key={item.title}>
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
