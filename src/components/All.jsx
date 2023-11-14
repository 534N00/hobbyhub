import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';
import { format } from 'date-fns';

const All = ({ supabase }) => {
    const [myData, setMyData] = useState([]);
    const [sort, setSort] = useState("likes-d"); // default sort is by likes
    const [searchTerm, setSearchTerm] = useState("");
    
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

    const formatDate = (timestamp) => {
        const formattedDate = format(new Date(timestamp), 'MM/dd/yyyy');
        return formattedDate;
    };

    const handleSortLikes = () => {
        if (sort === "likes-d") {
            setSort("likes-a");
            sortData("likes-a");
        } else if (sort === "likes-a") {
            setSort("likes-d");
            sortData("likes-d");
        }
    };
    const handleSortTime = () => {
        if (sort === "date-d") {
            setSort("date-a");
            sortData("date-a");
        } else if (sort === "date-a") {
            setSort("date-d");
            sortData("date-d");
        }
    };

    // function to sort data
    const sortData = (sort) => {
        let sortedData;
      
        if (sort === "likes-d") {
          sortedData = [...myData].sort((a, b) => b.likes - a.likes);
        } else if (sort === "likes-a") {
          sortedData = [...myData].sort((a, b) => a.likes - b.likes);
        } else if (sort === "date-d") {
          sortedData = [...myData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sort === "date-a") {
          sortedData = [...myData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        setMyData(sortedData);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to filter data based on the search term
    const filterData = (data, searchTerm) => {
        return data.filter((plant) =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
    return (
        <div className="All">
            <h1>All the Plants</h1>
            <h3>Seems...green?</h3>
            <h4><em>Search and Sort at your leisure</em></h4>
            <button onClick={handleSortLikes}>Sort by Likes</button>
            <button onClick={handleSortTime}>Sort by Date</button>
            <input type="text" id="search" name="search" placeholder="Search by name" onChange={handleSearch} />
            <div className="all-cards">
                {filterData(myData, searchTerm).map((rowData) => (
                    <Card key={rowData.id} id={rowData.id} name={rowData.name} species={rowData.species}
                        date={formatDate(rowData.created_at)} image_link={rowData.image_link} likes={rowData.likes} supabase={supabase} />
                ))}
            </div>
        </div>
    );
};

export default All;