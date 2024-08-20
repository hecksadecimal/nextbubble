"use client";

import { useState, useEffect } from 'react'
import { api } from '@/trpc/react';

const AnnouncementForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createAnnouncementMutation = api.announcement.createAnnouncement.useMutation({
        onSuccess: async () => {
            setIsSubmitting(false);
            setTitle('');
            setContent('');
        },
        onMutate: async () => {
            setIsSubmitting(true);
        }
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Title</span>
                <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="label">
                <span className="label-text">Content</span>
                <textarea className="textarea h-24" value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <button className="btn" onClick={() => createAnnouncementMutation.mutate({ title, content })} disabled={isSubmitting}>Create Announcement</button>
        </div>
    )
}

export default AnnouncementForm;