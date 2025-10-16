"use client"
import { useEffect, useState } from "react";
// import { useModalStore } from "@/app/hooks/use-modal-store";
import { CreateServerModal } from "../modals/CreateServerModal";



export const ModalProvider = () => {
    const [isMounted , setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;

    }
    return (
        <div>
            <CreateServerModal/>
        </div>
    );
}