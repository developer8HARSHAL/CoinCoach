'use client'
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './Drag';
import DropZone from './Drop';

const Drag_Drop = () => {
    const [droppedItemsZone1, setDroppedItemsZone1] = useState([]);
    const [droppedItemsZone2, setDroppedItemsZone2] = useState([]);
    const [droppedItemsZone3, setDroppedItemsZone3] = useState([]);

    const handleDrop = (item, zone) => {
        if (zone === 1) {
            setDroppedItemsZone1((prevItems) => [...prevItems, item]);
        } else if (zone === 2) {
            setDroppedItemsZone2((prevItems) => [...prevItems, item]);
        }else{
            setDroppedItemsZone3((prevItems) => [...prevItems, item]);

        }
    };

    const handleRemoveItem = (index, zone) => {
        if (zone === 1) {
            setDroppedItemsZone1(prevItems => prevItems.filter((_, i) => i !== index));
        } else if (zone === 2) {
            setDroppedItemsZone2(prevItems => prevItems.filter((_, i) => i !== index));
        }else{
            setDroppedItemsZone3(prevItems => prevItems.filter((_, i) => i !== index));    
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '5px',
                    width: '90%',
                    height: '90%',
                }}>
                    <h1>Drag and Drop Game</h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            width: '30%',
                        }}>
                            <h2>Drag Items</h2>
                            <div className='flex justify-center w-[100%]'>
                                <DragItem name="Impulse Purchases" />
                                <DragItem name="Emergency Fund" />
                                <DragItem name="Credit Card Debt" />
                            </div>
                            <div className='flex justify-center w-[100%]'>
                                <DragItem name="Monthly Budget" />
                                <DragItem name="Investing in Stocks" />
                                <DragItem name="Dining out daily" />
                            </div>
                        </div>

                        {/* Drop Zone 1 */}
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            width: '40%',
                            height: '100%'
                        }}>
                            <h2>Smart Financial Choices</h2>
                            <DropZone onDrop={(item) => handleDrop(item, 1)} />
                            {droppedItemsZone1.map((item, index) => (
                                <div key={`zone1-${index}`}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                        backgroundColor: 'lightblue',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <p>{item.name}</p>
                                    <button onClick={() => handleRemoveItem(index, 1)}>Remove</button>
                                </div>
                            ))}
                        </div>

                        {/* Drop Zone 2 */}
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            width: '40%',
                            height: '100%'
                        }}>
                            <h2>Risky Financial Behaviour</h2>
                            <DropZone onDrop={(item) => handleDrop(item, 2)} />
                            {droppedItemsZone2.map((item, index) => (
                                <div key={`zone2-${index}`}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                        backgroundColor: 'lightblue',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <p>{item.name}</p>
                                    <button onClick={() => handleRemoveItem(index, 2)}>Remove</button>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            width: '40%',
                            height: '100%'
                        }}>
                            <h2>Needs vs Wants</h2>
                            <DropZone onDrop={(item) => handleDrop(item, 3)} />
                            {droppedItemsZone3.map((item, index) => (
                                <div key={`zone3-${index}`}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                        backgroundColor: 'lightblue',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <p>{item.name}</p>
                                    <button onClick={() => handleRemoveItem(index, 3)}>Remove</button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Drag_Drop;
