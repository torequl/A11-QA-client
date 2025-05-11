import { useState } from 'react';

const useImageUpload = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        if (!file) {
            setError('No file provided');
            return null;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.success) {
                setImageUrl(data.data.url);
                return data.data.url;
            } else {
                throw new Error(data.error?.message || 'Upload failed');
            }
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadImage,
        imageUrl,
        isUploading,
        error,
        setImageUrl, // In case you need to reset or modify the URL
    };
};

export default useImageUpload;
