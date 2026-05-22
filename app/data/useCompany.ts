"use client";

import {useEffect, useState} from "react";
import { getCompanies } from "./getCompany";

export function useCompany(){
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function load(){
            const data = await getCompanies();
            setCompanies(data);
            setLoading(false);
        }
        load();
    
    }, []);
    return {companies, loading}
}