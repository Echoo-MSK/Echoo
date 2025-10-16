import { useState } from 'react';
import { useModalStore } from '@/app/hooks/use-modal-store';
import { useRouter } from 'next/navigation';
import {Button} from '../ui/button';
import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Modal } from './Modal';

export const JoinServerModal = () => {
const { type, isOpen, onClose: onclose } = useModalStore();
const router = useRouter();


const isModalOpen = isOpen && type === "joinServer"

const [inviteCode, setInviteCode] = useState('');
const [isLoading, setIsLoading] = useState(false);





const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!inviteCode.trim()) return;
    setIsLoading(true);
    try {
        const response = await fetch(`/api/invites/${inviteCode}`, {
            method: 'PATCH',
            
        });

        if (response.ok) {
            onclose();
            router.refresh();
        } else {
            console.log('Failed to join server');
        }
        
}catch (error) {
    console.error('Error joining server:', error);

}finally {
    setIsLoading(false);

}
}
}