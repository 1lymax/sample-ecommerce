// @flow
import {FC} from "react";
import * as React from "react";
import {Rating} from "@mui/material";
import {Star} from "@mui/icons-material";


interface IRatingStars {
    rating: number | undefined;
}

export const RatingStars: FC<IRatingStars> = ({ rating }) => {
    return (
        <Rating
            readOnly
            value={rating}
            precision={0.1}
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
        />
    );
};