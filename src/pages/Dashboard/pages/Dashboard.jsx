import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Navbar from "../../../components/NavBar";
import HoverImage3D from "../../../components/HoverImage";
import HeroBg_Big from '/Hero_bg_big.png'
import HeroBgMedium from '/Hero_bg.png' 
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { chatHistory } from "../../../services/authService";
import Footer from "../../../components/Footer";
import { useMediaQuery } from 'react-responsive';

export default function Dashboard()
{
    const navigate = useNavigate();
    const {setUserChat, userChat, user, setLoading, token, loading} = useAuthStore();
    
    // Use media queries to detect screen sizes
    const isLargeScreen = useMediaQuery({ minWidth: 1300 });
    const isMediumScreen = useMediaQuery({ minWidth: 800, maxWidth: 1299 });
    const isSmallScreen = useMediaQuery({ maxWidth: 799 });
    
    const getBackgroundImage = () => {
        if (isLargeScreen) {
            return HeroBg_Big;
        } else if (isMediumScreen) {
            return HeroBgMedium;
        // } else if (isSmallScreen) {
        //     return HeroBgSmall;
        }
        return HeroBgMedium; // default
    };

    const showToast = (message, type = 'error') => {
        toast[type](message,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    };

    useEffect(() => {
        mutation.mutate({
            "token" : token
        });
    },[token])

    const handleClick = () => {
        setLoading(true);
        navigate('/chat');
    }

    const mutation = useMutation({
        mutationFn: chatHistory,
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: (data) => {
            if(data)
            {
                setUserChat(data.data);
            }
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.detail || 
                                error.message || 
                                "Token Invalid, Login Again!!";
            navigate('/login')
            showToast(errorMessage);
        },
        onSettled: () => {
            setLoading(false);
        }
    })

    return(
        <>
            <Navbar/>
            <div className="h-full">
                {/* Hero Section */}
                <div className="h-4/5 w-full flex mt-16 md:mt-24 px-10 items-center bg-cover bg-center justify-between"
                    style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
                    <div className="flex flex-col p-4 ">
                        <div className="text-white text-md md:text-2xl lg:text-4xl font-medium">
                            Welcome To HealthCare At <br/> Your FingerTips 24/7!!
                        </div>
                        <div className="pt-10">
                            <Button
                                text = "Chat With Us"
                                style_button = "bg-gray-100 text-black px-8 text-xs md:text-md font-bold py-3 rounded-3xl hover:cursor-pointer"
                                func = {handleClick}
                            />
                        </div>
                    </div>
                    <div className="mr-10 mb-10 relative group"> 
                        <div 
                            className="bg-white text-red-500 font-semibold px-3 py-2 rounded-2xl text-sm absolute top-4 -right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
                        >
                            Hi {userChat?.firstName || ""}, How can I <br/> help you?
                        </div>
                        <HoverImage3D />
                    </div>
                </div>
                {/* Chats Section */}
                <div className="h-3/4">
                    <div className="pt-11 py-4 flex items-center justify-center text-4xl font-bold text-red-600">
                        Previous Chats    
                    </div>
                    <div className="bg-white p-10 flex justify-center items-center h-full">
                        {
                            userChat ? ( <span>
                                {userChat.firstName + " " + userChat.lastName || " "}
                            </span> ) 
                            :
                            (
                                <div>
                                    No Chats Available!! Start Talking Now
                                </div>
                            )
                        }
                    </div>  
                </div>
            </div>
            {/* Footer */}
            <Footer/>
        </>
    );
}