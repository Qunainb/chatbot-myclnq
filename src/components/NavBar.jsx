import { useMutation } from "@tanstack/react-query"
import Button from "./Button"
import { logoutUser } from "../services/authService"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../store/authStore";
import myClnqLogo from "/logo.png";


export default function Navbar()
{
    const { user, setLoading, clearAuth, token } = useAuthStore();
    const navigate = useNavigate();
    
    const showToast = (message, type = 'error') => {
    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    };            
    console.log(user)
    
    const mutation = useMutation({
        mutationFn: logoutUser,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            //On success of logout remove token from the frontend
            clearAuth();
            showToast('Logout Sucessful!')
            navigate('/login')
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.detail || 
                                error.message || 
                                "Login failed";
            showToast(errorMessage);
        },
        onSettled: () => {
            setLoading(false);
        },
    });
    const handleSubmit = (e) => {
        mutation.mutate({
            email : user.email
        })
    }
    
    return (
        <>
            {
                (token) ? (
                    <div className="p-5 md:px-10 z-10 flex bg-white fixed top-0 w-screen justify-between items-center ">
                        <div>
                            <img src={myClnqLogo} className="w-30 md:w-70" /> 
                        </div>
                        <div className="">
                            <Button
                                text = "Logout"
                                style_button = "px-2 py-1 flex items-center justify-center md:px-4 md:py-2 text-xs md:text-lg text-white bg-red-600 rounded-md hover:cursor-pointer hover:bg-red-500"
                                func = {handleSubmit}
                            />
                        </div>
                    </div>

                ) : (
                    <div className="bg-white p-5  md:px-10 w-screen fixed top-0 ">
                        <img src={myClnqLogo} className="w-70" />      
                    </div>
                )
            }
        </>
    )
}