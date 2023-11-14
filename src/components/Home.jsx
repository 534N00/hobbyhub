import React, { useState, useEffect } from 'react';
import Card from './Card';
import { format } from 'date-fns';

const Home = ({ supabase }) => {

    const [myData, setMyData] = useState([]);

    const fetchData = async () => {
        const { data, error } = await supabase.from("Plants").select()
            .order("likes", { ascending: false }) // order from most likes to least
            .limit(5); // get only top 5 entries
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
    
    // for getting our plants so we can map them out
    useEffect(() => {
        fetchAndSetData();
    }, []);

    const formatDate = (timestamp) => {
        const formattedDate = format(new Date(timestamp), 'MM/dd/yyyy');
        return formattedDate;
    };

    return (
        <div className="Everything">
            <div className="Home">
                <h1>Plant Royale</h1>
                <h2>Where you decide which house plant is the <em>best</em></h2>
                <h4>Who&apos;s at the top of the leaderboards? Good question. Let&apos;s take a gander...</h4>
                <hr/>
                <br/>
                <div className="all-cards">
                    {myData.map((rowData) => (
                        <Card key={rowData.id} id={rowData.id} name={rowData.name} species={rowData.species}
                            date={formatDate(rowData.created_at)} image_link={rowData.image_link} likes={rowData.likes} supabase={supabase} />
                    
                    ))}
                </div>
            </div>
        </div> 
       
        
    );
};

export default Home;