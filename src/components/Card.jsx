import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, species, date, image_link, likes, supabase }) => {

    const [isLiked, setIsLiked] = useState(false); // for updating likes
    const liked = likes+1;
    const unliked = likes;
    const [likeState, setLikeState] = useState(unliked); // state for visual
    const [cssState, setCssState] = useState("unliked"); // default css class FOR BUTTON
    

    // for updating likes
    const handleLike = (isLiked) => {
        if (isLiked) { // if already liked, unlike
            unlike();
            setIsLiked(false);
            setLikeState(unliked);
            setCssState("unliked");
            console.log(`${id}: unlike`);
        } else { // if not liked, like
            like();
            setIsLiked(true);
            setLikeState(liked);
            setCssState("liked");
            console.log(`${id}: like`)
        }
    };
    const like = async () => {
        const { data, error } = await supabase.from("Plants").update({ likes: liked }).match({ id: id });
        if (error) {
            console.error("Error updating data: ", error);
        } else {
            console.log("Data updated successfully:", data);
        }
    };
    const unlike = async () => {
        const { data, error } = await supabase.from("Plants").update({ likes: unliked }).match({ id: id });
        if (error) {
            console.error("Error updating data: ", error);
        } else {
            console.log("Data updated successfully:", data);
        }
    };
    
    return (
        <div className="Card">
            <h4>{name}</h4>
            <p><em>{species}</em></p>
            <p>{date}</p>
            <img src={image_link} alt={name} />
            <br/>
            <button className={cssState} onClick={() => handleLike(isLiked)}>{likeState} 👍</button>
            <Link to={`/plant/${id}`}><button className="more">More</button></Link>
        </div>
    );
};

export default Card;