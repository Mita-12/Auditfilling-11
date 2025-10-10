// hooks/useUser.js
import { useState, useEffect } from 'react';

export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const handleStorageChange = () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return user;
};