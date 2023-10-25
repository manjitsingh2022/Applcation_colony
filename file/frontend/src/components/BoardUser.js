import React, { useCallback, useEffect, useRef, useState } from "react";
import BoardChild from "../test/BoardChild";
import CurrencyGenerator from "../test/CurrencyGenerator";

const BoardUser = () => {


    return (
        <>
            <BoardChild />

            <CurrencyGenerator />
        </>
    );
};

export default BoardUser;
