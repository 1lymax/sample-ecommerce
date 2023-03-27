// @flow
import * as React from "react";
import {FC} from "react";
import {TablePagination} from "@mui/material";
import {useAppSelector} from "../../hooks/appHook";
import {useProductActions} from "../../hooks/apiActions";


interface IPagination {

}

export const Pagination: FC<IPagination> = () => {
    const { skip, limit, total } = useAppSelector(state => state.product);
    const { setSkip, setLimit } = useProductActions();
    const page = skip / limit;

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setSkip(newPage * limit)
    };

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(e.target.value))
    };

    return (
        <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};