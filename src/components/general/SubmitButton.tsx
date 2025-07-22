'use client';

import { useFormStatus } from 'react-dom'; // form 상태 알수 있는 훅
import { Button } from '../ui/button';

const SubmitButton = () => {
    const { pending } = useFormStatus(); // form으로 부터 pending 상태 여부 추출

    return (
        // pending 값에 의해서 disabled 설정됨
        <Button className='w-full' type='submit' disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
        </Button>
    );
};
export default SubmitButton;
