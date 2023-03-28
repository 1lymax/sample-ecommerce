// @flow
import * as React from "react";
import {Search} from "@mui/icons-material";
import {InputAdornment, OutlinedInput, TableCell, TableRow} from "@mui/material";
import {IProductFilter, KeyValue} from "../../types/product.type";
import {useProductActions} from "../../hooks/apiActions";
import {productColumns} from "../../config/product.columns";
import {useFilterProducts} from "../../hooks/useFilterProducts";


export const ProductFilter = () => {
    const {setFilter} = useProductActions()

    useFilterProducts()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, columnName: string) =>{
        setFilter({ [columnName]: e.target.value } as KeyValue<IProductFilter>)
    }

    return (
        <TableRow>
            {productColumns.map((column) => (
                <TableCell key={column.name}>
                    <OutlinedInput size={"small"}
                                   margin={"dense"}
                                   type={"search"}
                                   onChange={(e) => handleInputChange(e, column.name)}
                                   startAdornment={
                                       <InputAdornment position="start">
                                           <Search fontSize={"small"}/>
                                       </InputAdornment>
                                   }
                    />
                </TableCell>
            ))}
        </TableRow>

    );
};