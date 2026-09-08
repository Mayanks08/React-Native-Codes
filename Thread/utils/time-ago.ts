import React from 'react'

export default function timeAgo(date: string): string {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor(diffInHour / 24);
    if (diffInSec < 60) {
        return `${diffInSec} seconds ago`;
    } else if (diffInMin < 60) {
        return `${diffInMin} minutes ago`;
    } else if (diffInHour < 24) {
        return `${diffInHour} hours ago`;
    } else {
        return `${diffInDay} days ago`;
    }
    
}
