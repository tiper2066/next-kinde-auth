import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
export default withAuth(
    async function middleware() {} /* 여기엔 보호되는 경로 설정 */,
    {
        publicPaths: ['/'], // 공개해도 되는 ( 보호되지 않는 경로 설정 )
    }
);

export const config = {
    matcher: [
        // 아래 public (html, css, js, 이미지나 문서 파일) 제외한 모든 파일에서 실행함
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};
