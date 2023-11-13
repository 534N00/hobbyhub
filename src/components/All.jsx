import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';

const All = ({ supabase }) => {

    const [myData, setMyData] = useState([]);
    
    const fetchData = async () => {
        const { data, error } = await supabase.from("Plants").select();
        if (error) {
            console.error("Error fetching data: ", error);
        } else {
            console.log("Data fetched successfully:", data);
            return data;
        }
        return [];
    };

    const fetchAndSetData = async () => {
        const data = await fetchData();
        setMyData(data);
    };

    useEffect(() => {
        fetchAndSetData();
    }, []);

    return (
        <div className="All">
            <h1>All the Plants</h1>
            <div className="all-cards">
                {myData.map((rowData) => (
                    <Card key={rowData.id} id={rowData.id} name={rowData.name} species={rowData.species}
                        image_link={rowData.image_link} likes={rowData.likes} supabase={supabase} />
                
                ))}
            </div>
        </div>
    );
};

export default All;