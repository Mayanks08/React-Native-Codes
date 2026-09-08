import { createContext, useContext, useMemo } from "react";
import { Thread } from "../types/threads";
import {generateThreads} from "../utils/Demofile-gen";

export const ThreadsContext = createContext<Thread[]>([]);

export const ThreadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const threads = useMemo(() => generateThreads(10), []);
    return (   
        <ThreadsContext.Provider value={threads}>
            {children}
        </ThreadsContext.Provider>
    );
};

export const useThreads = () => {
    return useContext(ThreadsContext);
};