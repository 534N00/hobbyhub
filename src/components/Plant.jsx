import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Plant = ({ supabase }) => {
    const { id } = useParams(); // grab id from URL so we can fetch that plant
    const [plant, setPlant] = useState([]); // store fetched data
    const [isLoading, setIsLoading] = useState(true); // state to get refresh after data arives
    const navigate = useNavigate(); // so we can redirect after delete

    // Note: adding stuff so you can like on this page woul be dope, but is different to card and takes a bit more work

    const fetchData = async () => {
        const { data, error } = await supabase.from("Plants").select().match({ id: id });
        if (error) {
            console.error("Error fetching data: ", error);
        } else {
            console.log("Data fetched successfully:", data);
            setPlant(data); // Set 'plant' when data is available
            setIsLoading(false); // Set 'isLoading' to false
        }
    };

    useEffect(() => {
        fetchData(); // Call the fetchData function to initiate data fetching
    }, [id]); // set id as dependency so useEffect runs when id changes

    const formatDate = (timestamp) => {
        const formattedDate = format(new Date(timestamp), 'MM/dd/yyyy');
        return formattedDate;
    };

    const handleDelete = async () => {
        const { data, error } = await supabase.from("Plants").delete().match({ id: id });
        if (error) {
            console.error("Error deleting data: ", error);
        } else {
            console.log("Data deleted successfully:", data);
            navigate("/");
        }
    };

    return (
        <div className="Plant">
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <div className="plant-content">
                        <h2>Info on {plant[0].name}</h2>
                        <hr />
                        <h3>Create on: {formatDate(plant[0].created_at)}</h3>
                        <h3>Species: {plant[0].species}</h3>
                        <h3>Description: {plant[0].description}</h3>
                        <h3>Likes: {plant[0].likes}</h3>
                        <Link to={`/edit/${id}`}><button className="edit">Edit</button></Link>
                        <button className="delete" onClick={() => handleDelete()}>Delete</button>
                    </div>
                    <div>
                        <img src={plant[0].image_link} alt={`Image of ${plant[0].name}`} />
                    </div>
                </>
            )}        
        </div>
    );
};

export default Plant;