import axios from "axios";
import { useEffect, useState, useRef } from "react";

function PaginationTable(){
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);
    const rows = 10;
    const currentLastIndex = currentPage * rows;
    const currentStartIndex = currentLastIndex - rows;
    const data = useRef([]);

    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
                data.current = res.data;
                setCurrentPageData(data.current.slice(currentStartIndex,currentLastIndex));
            }
            catch{
                alert('failed to fetch data');
            }
        }
        if(!data.current.length)
         fetchData();
        setCurrentPageData(data.current.slice(currentStartIndex,currentLastIndex));
    },[currentPage]);

    const handleClickPrevious = () =>{
        if(currentPage-1>0)
            setCurrentPage(currentPage-1);
    };

    const handleClickNext = () =>{
        if(currentPage+1<=Math.ceil(data.current.length/rows))
            setCurrentPage(currentPage+1);
    };

    return(
        <>
           <div>
                <div style={{textAlign:'center', width:'100%'}}>
                    <h1>Employee Data Table</h1>
                </div>
                <table style={{width:'100%', marginTop:40}}>
                    <tbody>
                        <tr style={{backgroundColor:'#009879', color:'white'}}>   
                            <th style={{padding:10}}>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        {currentPageData.map((row)=>{return(
                            <tr key={row.id} style={{borderBottom:'1px solid black'}}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.role}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:20, width:'100%', margin:20}}>
                    <button onClick={handleClickPrevious} style={{backgroundColor:'#009879', color:'white'}}>Previous</button>
                    <h3 style={{backgroundColor:'#009879', color:'white', height:40, width:40, borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center'}}>{currentPage}</h3>
                    <button onClick={handleClickNext} style={{backgroundColor:'#009879', color:'white'}}>Next</button>
                </div>
           </div> 
        </>
    );
}
export default PaginationTable;