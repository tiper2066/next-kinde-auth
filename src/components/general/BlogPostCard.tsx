import Image from 'next/image';
import Link from 'next/link';

interface BlogPostCardProps {
    data: {
        id: string;
        title: string;
        content: string;
        imageUrl: string;
        authorId: string;
        authorName: string;
        authorImage: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

const BlogPostCard = ({ data }: BlogPostCardProps) => {
    return (
        <div
            className='group relative overflow-hidden rounded-lg border border-gray-200 
    bg-white shadow-md transition-all duration-75 hover:shadow-lg'
        >
            {/* 개별 상세 페이지로 이동 링크 */}
            <Link href={`/post/${data.id}`} className='block w-full h-full'>
                <div className='relative w-full h-48 overflow-hidden'>
                    {/* 마우스를 올리면 105 크기가 되게 함 */}
                    <Image
                        src={data.imageUrl}
                        alt='Image for blog'
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                </div>
                {/* 게시물 제목 */}
                <div className='p-4'>
                    <h2 className='mb-2 text-lg font-semibold text-gray-900'>
                        {data.title}
                    </h2>

                    {/* 게시물 내용 - line-clamp-2 (최대 2줄까지 보임) */}
                    <p className='mb-4 text-sm text-gray-600 line-clamp-2'>
                        {data.content}
                    </p>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            {/* 아바타: Image 컨테이너 size-8: width, height 한방에 설정, 24px */}
                            <div className='relative size-8 overflow-hidden rounded-full'>
                                <Image
                                    src={data.authorImage}
                                    alt={data.authorName}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <p className='text-sm font-medium text-gray-700'>
                                {data.authorName}
                            </p>
                        </div>

                        <time className='text-xs text-gray-500'>
                            {/* **************** 한국 날자 포맷으로 출력 : 예시) 2025년 7월 22일 */}
                            {new Intl.DateTimeFormat('ko-KR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }).format(data.createdAt)}
                        </time>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default BlogPostCard;
