import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default async function  ProtectedRoute({ children } : ProtectedRouteProps) {
    const session = await auth();

    // go to login page if not authenticated
    // if(!session) {

    //     redirect('/login');

    // }

    return children;

}