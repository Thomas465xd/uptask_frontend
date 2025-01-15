import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if (data === undefined) {
        console.warn("Data is undefined. Query might still be loading.");
    }

    return { data, isError, isLoading };
};