import React, {useState} from "react";
import styled from "styled-components";
import {TableCell, TableRow} from "@mui/material";
import {SortToggle} from "../SortToggle";
import {productColumns} from "../../config/product.columns";

const CellTitleWrapper = styled.div`
  display: flex;
`

const ProductListHeader = () => {
    const [hoveredColumn, setHoveredColumn] = useState("");

    const handleColumnHover = (columnName: string) => {
        setHoveredColumn(columnName);
    };

    const handleColumnUnHover = () => {
        setHoveredColumn("");
    };

    return (
        <TableRow>
            {productColumns.map((column) => (

                <TableCell key={column.name}
                           onMouseOver={() => handleColumnHover(column.name)}
                           onMouseLeave={() => handleColumnUnHover()}
                >
                    <CellTitleWrapper>
                        {column.title}
                        <SortToggle column={column} visible={column.name === hoveredColumn}/>
                    </CellTitleWrapper>
                </TableCell>
            ))}
        </TableRow>
    );
};

export default ProductListHeader;