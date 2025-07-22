import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button'; // shadcn 에서 제공하는 사용자 지정 속성 클래스
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components'; //  Kinde LogoutLink 컴포넌트
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'; //  Kinde 세션 정보 얻는 함수

const Navbar = async () => {
    const { getUser } = getKindeServerSession(); //   kinde 에서 세션 정보 가져오기
    const user = await getUser(); //  세션에서 사용자 정보 추출

    return (
        <nav className='flex items-center justify-between py-5'>
            <div className='flex items-center gap-6'>
                {/* ----- 사이트 로고 ----- */}
                <Link href='/'>
                    <h1 className='text-3xl font-semibold'>
                        Blog <span className='text-blue-500'>Marchal</span>
                    </h1>
                </Link>
                {/* ----- 네비게이션 메뉴 ----- */}
                <div className='hidden sm:flex items-center gap-6'>
                    <Link
                        href='/'
                        className='text-sm font-medium hover:text-blue-500 transition-color'
                    >
                        Home
                    </Link>
                    <Link
                        href='/dashboard'
                        className='text-sm font-medium hover:text-blue-500 transition-color'
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
            {/*  사용자 세션 여부에 따른 UI 표시  */}
            {user ? (
                // 사용자 세션이 있을 경우: 현재 구글로 로그인 했으므로 구글 사용자 이름 출력
                <div className='flex items-center gap-4'>
                    <p>{user.given_name}</p>
                    <LogoutLink
                        className={buttonVariants({ variant: 'secondary' })}
                    >
                        Logout
                    </LogoutLink>
                </div>
            ) : (
                // ----- 현재 세션이 없을 경우 로그인(Login) / 회워가입(Sign Up) 메뉴 -----
                <div className='flex items-center gap-4'>
                    <LoginLink className={buttonVariants({})}>Login</LoginLink>{' '}
                    {/*  kinde 컴포넌트로 변경 */}
                    <RegisterLink
                        className={buttonVariants({ variant: 'secondary' })}
                    >
                        Sign Up
                    </RegisterLink>{' '}
                    {/* ** kinde 컴포넌트로 변경 */}
                </div>
            )}
        </nav>
    );
};
export default Navbar;
