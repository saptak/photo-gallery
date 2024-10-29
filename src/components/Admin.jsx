import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Admin = () => {
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://picsum.photos/id/1/300/200' },
    { id: 2, url: 'https://picsum.photos/id/2/300/200' },
    { id: 3, url: 'https://picsum.photos/id/3/300/200' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you'd upload the file to a server here
      const newPhoto = { id: Date.now(), url: URL.createObjectURL(file) };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleDelete = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="mb-4">
        <Label htmlFor="photo-upload">Upload new photo</Label>
        <Input id="photo-upload" type="file" accept="image/*" onChange={handleUpload} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="photos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {photos.map((photo, index) => (
                <Draggable key={photo.id} draggableId={photo.id.toString()} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex items-center mb-2">
                      <img src={photo.url} alt={`Photo ${photo.id}`} className="w-16 h-16 object-cover mr-2" />
                      <Button variant="destructive" onClick={() => handleDelete(photo.id)}>Delete</Button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Admin;
