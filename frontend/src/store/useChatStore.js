import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ Get messages
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Send message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      if (!selectedUser) {
        toast.error("No user selected");
        return;
      }

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      set({
        messages: [...messages, res.data],
      });
    } catch (error) {
      console.log("SEND MESSAGE ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // ✅ Subscribe (FIXED)
  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();

    if (!socket) {
      console.log("Socket not connected yet");
      return;
    }

    // 🔥 prevent duplicate listeners
    socket.off("newMessage");

    socket.on("newMessage", (message) => {
      if(message.senderId!==selectedUser._id) return
    
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();

    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
