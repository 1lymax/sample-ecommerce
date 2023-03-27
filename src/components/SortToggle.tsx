// @flow
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import {useAppSelector} from "../hooks/appHook";
import {productColumns} from "../config/product.columns";
import {North, South} from "@mui/icons-material";
import {useProductActions} from "../hooks/apiActions";

const Container = styled.div`
min-width: 20px;
  min-height: 28px;
`;

interface ISortToggle {
    column: typeof productColumns[number];
    visible: boolean;
}

export const SortToggle: FC<ISortToggle> = ({ column, visible }) => {
    let toggle;
    const { sortColumn, sortOrder } = useAppSelector(state => state.product);
    const { setSortOrder, setSortColumn } = useProductActions();
    const isCurrentColumn = sortColumn === column.name;


    const handleToggleClick = () => {
        if (!isCurrentColumn) {
            setSortOrder("asc");
            setSortColumn(column.name);
            return;
        }
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    if (sortOrder === "asc" || !isCurrentColumn) {
        toggle = <South onClick={handleToggleClick} fontSize={"small"}/>;
    } else {
        toggle = <North onClick={handleToggleClick} fontSize={"small"}/>;
    }


    return (
        <Container>
            {(isCurrentColumn || visible) &&
                toggle
            }
        </Container>
    );
};