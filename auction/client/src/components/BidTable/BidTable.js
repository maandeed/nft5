import { useContext, useEffect } from "react";
import { BidContext } from '../../context/BidContext';
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
    { field: "player", headerName: "Player", width: 330 },
    { field: "bidamount", headerName: "Registration Fee", type: "number", width: 130 },
    { field: "gametime", headerName: "Game Time", type: "date", width: 190 },
    { field: "refunded", headerName: "Refunded", width: 10 },
    { field: "transactionhash", headerName: "Transaction Hash", width: 330,
      sortable: false,
/*      renderCell: (params) => (
        <a target='_blank' 
          href={`https://spectrum.pub//tx.html?hash=${params.getValue("transactionhash")}`} 
        >
         {params.getValue("transactionhash")}
        </a>
      ),
*/    },
  ];
  
const BidTable = (props) => {
    const { bids, setBids } = useContext(BidContext);

    useEffect(() => {
//      console.log (`bidtable pros = ${JSON.stringify(props)}`)
      if (props.id) {
        axios
          .get(`/bids/findByAuction`, {
            params: { auctionid: props.id },
          })
          .then((res) => {
            res.data.map((_data, index) => {
              _data.id = index
            })
//            console.log(`in bidtable result ${JSON.stringify(res.data)}`);
            setBids(res.data);
          })
          .catch((err) => {
            console.log(`Error retrieving data ${err}`);
          });
      }
    }, [props.id])

    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={bids}
          columns={columns}
          pageSize={5}
        />
      </div>
    );
}
 
export default BidTable;
