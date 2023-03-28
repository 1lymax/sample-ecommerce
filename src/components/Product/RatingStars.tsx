// @flow
import * as React from "react";
import {FC} from "react";
import {Rating} from "@mui/material";
import {Star} from "@mui/icons-material";


interface IRatingStars {
    rating: number;
}

export const RatingStars: FC<IRatingStars> = ({ rating }) => {

    return (
        <Rating
            value={rating}
            precision={0.1}
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
        />
    );
};