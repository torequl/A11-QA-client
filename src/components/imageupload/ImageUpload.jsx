import { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            alert('Please select an image first');
            return;
        }

        setLoading(true);

        // Create FormData object
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=cf18570c0348aeda2eeece05df52a4de`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.success) {
                setImageUrl(data.data.url);
                alert('Image uploaded successfully!');
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
            />
            <button onClick={uploadImage} disabled={!selectedImage || loading}>
                {loading ? 'Uploading...' : 'Upload Image'}
            </button>

            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
