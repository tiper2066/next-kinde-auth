'use client'; //  추가
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { handleSubmission } from '@/actions'; //  서버 액션 handleSubmission 함수 가져오기
import SubmitButton from '@/components/general/SubmitButton'; // ************************ SubmitButton 추가

const CreateBlogPage = () => {
    return (
        <div>
            <Card className='max-w-lg mx-auto'>
                <CardHeader>
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>
                        Create a new post to share with the world
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className='flex flex-col gap-4'
                        action={handleSubmission} //  handleSubmission 함수 적용
                    >
                        <div className='flex flex-col gap-2'>
                            <Label>Title</Label>
                            <Input
                                name='title'
                                required
                                type='text'
                                placeholder='Title'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Content</Label>
                            <Textarea
                                name='content'
                                required
                                placeholder='Content'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Image URL</Label>
                            <Input
                                name='url'
                                required
                                type='url'
                                placeholder='Image URL'
                            />
                        </div>
                        {/* **************************** SubmitButton 컴포넌트로 버튼 추가  */}
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
export default CreateBlogPage;
