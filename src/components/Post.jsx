import React from 'react';
import { useState } from 'react';
import Input from './Input';

const Post = ({ supabase }) => {

    // all the states for form inputs
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

    const [cssState, setCssState] = useState(""); // default css class FOR BUTTON

    const handleButton = () => {
        // all the supabase stuff
        postPlant();
        setCssState("submit")
        setTimeout(() => { setCssState("plain"); }, 1000);
    };

    const postPlant = async () => {
        const { data, error } = await supabase.from("Plants").insert([
            {
                name: name,
                species: species,
                description: description,
                image_link: image_link,
                likes: 0,
            },
        ]);
        if (error) {
            console.error("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully:", data);
        }
    };

    return (
        <div className="Post">
            <h3>Post a plant</h3>
            <form onSubmit={postPlant}>
                <Input label="Name" text="Name: " type="text" id="name" name="name" placeholder="Set name" handleInput={nameInput} />
                <Input label="Species" text="Species: " type="text" id="species" name="species" placeholder="Set species" handleInput={speciesInput} />
                <Input label="Description" text="Description: " type="text" id="description" name="description" placeholder="Set a description" handleInput={descriptionInput} />
                <Input label="Image" text="Image: " type="text" id="image_link" name="image_link" placeholder="Paste in a image URL" handleInput={image_linkInput} />
                <button type="submit">Submit</button>
            </form>
            <br/>
            {/* maybe add a sample card to show what the entry will look like */}
            <p>If you put a valid image link it will show bellow.</p>
            <img className="" src={image_link} alt="Your image" />
        </div>
    );
};

export default Post;