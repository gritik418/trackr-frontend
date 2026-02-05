import { useQuery } from '@tanstack/react-query';
import { getMe } from './api';


export const useAuth = () => {
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: getMe,
        retry: false,
    });
}
