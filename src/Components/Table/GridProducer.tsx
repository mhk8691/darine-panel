import { Grid } from "@mui/material"
import React from "react"

export function GridProducer(props) {
    const {data, count} = props
    return (
        <Grid container spacing={2} {...props}>
            {data.map((element, index) => (
                <Grid item xs={count ? 12 / count : 4} key={index}>
                    {element}
                </Grid>
            ))}
        </Grid>
    )
}