import CatCard from "./CatCard"
import React, { useState } from "react";

function NewCatCard(props) {
    const [cat, setCat] = useState({
        name:"",
        sex:"",
        birthYear:0,
        condition:"",
        image:"",
        info: {
            weight: {
                imperial:"",
                metric:""
            },
            id:"",
            name:"",
            cfa_url:"",
            vetstreet_url:"",
            vcahospitals_url:"",
            temperament:"",
            origin:"",
            country_codes:"",
            country_code:"",
            description:"",
            indoor:0,
            alt_names:"",
            adaptability:0,
            affection_level:0,
            child_friendly:0,
            dog_friendly:0,
            energy_level:0,
            grooming:0,
            health_issues:0,
            intelligence:0,
            shedding_level:0,
            social_needs:0,
            stranger_friendly:0,
            vocalisation:0,
            experimental:0,
            hairless:0,
            natural:0,
            rare:0,
            rex:0,
            suppressed_tail:0,
            short_legs:0,
            wikipedia_url:"",
            hypoallergenic:0,
            reference_image_id:"",
            image: {
                id:"",
                width:0,
                height:0,
                url:""
            }
        }
    }

    );

    React.useEffect(() => {
        fetch("http://localhost:8080/api/generatecat")
        .then(res => res.json())
        .then((generatedCat) => {
            if(props.catOfTheDay) {
                sessionStorage.setItem("catOfTheDay", JSON.stringify(generatedCat))
            }
            setCat(generatedCat)
        })
    }, [props.catOfTheDay])

    return(
        <CatCard cat={cat}/>
    )
}

export default NewCatCard