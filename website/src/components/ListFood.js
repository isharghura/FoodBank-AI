import React from 'react'

function ListFood(props) {
    const data = props.data
    console.log("data: ", data)
    return (
        <div>
            <p>
                {data["label"]}
            </p>
        </div>
    )
}

export default ListFood
