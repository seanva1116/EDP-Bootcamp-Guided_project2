import React, { useState, useEffect } from "react";

const Home = () => {
    const [characters, setCharacters] = useState([]);

    const fetchCharacters = () => {
        fetch("http://localhost:4000/api/characters")
        .then( (res) => res.json())
        .then( (characters) => {
            setCharacters(characters);
        });
    };

    useEffect(fetchCharacters, []);

    return (
        <>
            <section id="charactersList">
                {characters.map( (character) => (
                    <div id={character.id}>
                        {character.name}
                    </div>
                ))}
            </section>
        </>
    );
};

export default Home;