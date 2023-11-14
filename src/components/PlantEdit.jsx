import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from './Input';

const PlantEdit = ({ supabase }) => {
    const { id } = useParams(); // grab id from URL so we can fetch that plant
    const [plant, setPlant] = useState([]); // store fetched data
    const [isLoading, setIsLoading] = useState(true); // state to get refresh after data arives
    
    const [name, setName] = useState("");
    const nameInput = (event) => {
        setName(event.target.value);
    };
    const [species, setSpecies] = useState("");
    const speciesInput = (event) => {
        setSpecies(event.target.value);
    };
    const [description, setDescription] = useState("");
    const descriptionInput = (event) => {
        setDescription(event.target.value);
    };
    const [image_link, setImage_link] = useState("");
    const image_linkInput = (event) => {
        setImage_link(event.target.value);
    };

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

    const updatePlant = async () => {
        const { data, error } = await supabase.from("Plants").update({
            name: name,
            species: species,
            description: description,
            image_link: image_link,
        }).match({ id: id });
        if (error) {
            console.error("Error updating data: ", error);
        } else {
            console.log("Data updated successfully:", data);
        }
    };

    return (
        <div className="PlantEdit">
            {isLoading ? (
                <h4>Loading...</h4>
            ) : (
                <>
                    <h2>Editing {plant[0].name}</h2>
                    <hr />
                    <form onSubmit={updatePlant}>
                        <Input label="Name" text="Name: " type="text" id="name" name="name" placeholder={plant[0].name} handleInput={nameInput} />
                        <Input label="Species" text="Species: " type="text" id="species" name="species" placeholder={plant[0].species} handleInput={speciesInput} />
                        <Input label="Description" text="Description: " type="text" id="description" name="description" placeholder={plant[0].description} handleInput={descriptionInput} />
                        <Input label="Image" text="Image: " type="text" id="image_link" name="image_link" placeholder="Paste in a image URL" handleInput={image_linkInput} />
                        <button type="submit">Update</button>
                    </form>
                    <br/>
                    <p>If you put a valid image link it will show bellow.</p>
                    <img className="" src={image_link} alt="Your image" />
                </>
            )}
        </div>
    );
};

export default PlantEdit;