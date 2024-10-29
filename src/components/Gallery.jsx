import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from an API or local storage
    // For now, we'll use dummy data
    setPhotos([
      { id: 1, url: 'https://picsum.photos/id/1/300/200' },
      { id: 2, url: 'https://picsum.photos/id/2/300/200' },
      { id: 3, url: 'https://picsum.photos/id/3/300/200' },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <Card key={photo.id}>
          <CardContent className="p-0">
            <img src={photo.url} alt={`Photo ${photo.id}`} className="w-full h-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
