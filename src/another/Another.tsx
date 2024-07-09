import { useEffect } from "react";
import { useQuery } from "react-query"

export const Another = () => {
    const {data} = useQuery(['items']);

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <></>
    )
}