import React from "react";

const Home = () => {
    return (
        <body>
            <div>
                <h1>Star Wars Universe Lookup</h1>
                <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
                    here)</span></label>
                <input id="searchString" autocomplete="off" />
            </div>
            <div id="charactersList"></div>
        </body>
    );
};

export default Home;