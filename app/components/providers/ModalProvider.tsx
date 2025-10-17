"use client"
import { useEffect, useState } from "react";
// import { useModalStore } from "@/app/hooks/use-modal-store";
import { CreateServerModal } from "../modals/CreateServerModal";
import { JoinServerModal } from "../modals/JoinServerModal";



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
            <JoinServerModal />
        </div>
    );
}