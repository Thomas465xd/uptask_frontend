import Loader from "@/components/Loader"
import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"

export default function ProfileView() {

    const { data, isLoading } = useAuth()

    if(isLoading) return <Loader />
    if(data) return <ProfileForm data={data} />
}
