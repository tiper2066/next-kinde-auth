'use server';

import prisma from '@/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export const handleSubmission = async (formData: FormData) => {
    const { getUser } = getKindeServerSession(); // kinde 에서 세션 정보 가져오기
    const user: any = await getUser(); // 세션에서 사용자 정보 추출

    const title = formData.get('title');
    const content = formData.get('content');
    const url = formData.get('url');

    const data = await prisma.blogPost.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: url as string,
            authorId: user.id, // ******************** 자동생성이며 타입 고정됨, 문제없음
            authorImage: user.picture as string,
            authorName: user.given_name as string,
        },
    });

    return redirect('/dashboard');
};
