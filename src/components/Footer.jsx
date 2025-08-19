export default function Footer(){
    return (
        <>
            <div className="bg-gray-200 h-40 w-full overflow-hidden gap-5 md:gap-40 flex justify-center p-4 ">
                <div>
                    <div className="text-black font-bold text-sm md:text-md lg:text-lg">
                        Contact
                    </div>
                    <div className="text-xs w-full overflow-auto md:text-md lg:text-lg">
                        Shaw Centre, 1 Scotts Road, #20-11/13, Singapore - 228208
                    </div>
                    <div></div>
                </div>
                <div>
                    <div className="font-bold text-sm md:text-md lg:text-lg"> 
                        Get in Touch
                    </div>
                    <div className="text-xs md:text-md lg:text-lg">
                        <ul>
                            <li>Instagram</li>
                            <li>Facebook</li>
                        </ul>
                    </div>
                </div>
                <div className="flex-col items-center gap-4">
                    <div>
                        <img src="/logo.png" alt="MyClnq Logo" className="w-35 h-8"/>
                    </div>
                    <div className="text-xs md:text-md lg:text-lg">
                        Making healthcare convenient, accessible and affordable for all!
                    </div>
                </div>
                <div>
                    <div className="font-bold text-xs md:text-md lg:text-lg">
                        Get The App
                    </div>
                    <div><img src="" alt="QR code" /></div>
                </div>
            </div>
            <div className="bg-red-700 text-white text-xs md:text-md font-medium h-16 flex justify-center items-center">
                ©2023 MyCLNQ Health. All Rights Reserved
            </div>
        </>
    )
}