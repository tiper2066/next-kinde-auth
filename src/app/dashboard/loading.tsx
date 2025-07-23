import { Skeleton } from '@/components/ui/skeleton';

const LoadingDashboard = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col space-y-3 relative'>
                <Skeleton className='h-[125px] w-[250px] rounded-xl' />
                <div className='space-y-2'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[200px]' />
                </div>
                <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5'>
                    Data Loading...
                </p>
            </div>
        </div>
    );
};
export default LoadingDashboard;
