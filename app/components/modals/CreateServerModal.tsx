"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/app/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const CreateServerModal: React.FC = () => {
  const { type, isOpen, onClose: onclose } = useModalStore();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createServer";
  const [serverName, setServerName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setServerName("");
    setImageUrl("");
    onclose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: serverName, imageUrl }),
      });

      if (response.ok) {
        handleClose();
        router.refresh();
      } else {
        console.log("Failed to create server");
      }
    } catch (error) {
      console.error("Error creating server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If modal isn't open, don't render anything
  if (!isModalOpen) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 bg-white rounded-md shadow"
    >
      <h2 className="text-lg font-semibold mb-2">Create Server</h2>
      <Input
        placeholder="Server name"
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create"}
      </Button>
    </form>
  );
};
