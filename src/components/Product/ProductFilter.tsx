// @flow
import * as React from "react";
import {FilterList} from "@mui/icons-material";
import {InputAdornment, OutlinedInput, TableCell, TableRow} from "@mui/material";

import {useProductActions} from "../../hooks/apiActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import {productColumns} from "../../config/product.columns";
import {useFilterProducts} from "../../hooks/useFilterProducts";
import {IProductFilter, KeyValue} from "../../types/product.type";


export const ProductFilter = () => {
    const { setFilter } = useProductActions();
    const { filter } = useAppSelector(state => state.product);

    useFilterProducts();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, columnName: string) => {
        setFilter({ [columnName]: e.target.value } as KeyValue<IProductFilter>);
    };

    return (
        <TableRow>
            {productColumns.map((column) => (
                <TableCell key={column.name}>
                    <OutlinedInput size={"small"}
                                   value={filter && filter[column.name as keyof IProductFilter] ? filter[column.name as keyof IProductFilter] : ""}
                                   margin={"dense"}
                                   type={"search"}
                                   onChange={(e) => handleInputChange(e, column.name)}
                                   startAdornment={
                                       <InputAdornment position="start">
                                           <FilterList fontSize={"small"}/>
                                       </InputAdornment>
                                   }
                    />
                </TableCell>
            ))}
        </TableRow>

    );
};