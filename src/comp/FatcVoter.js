import React from "react";
import { useState, useEffect } from "react";
function FatcVoter({ contract, account, provider }) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const Fatch = async () => {
      const Voters = await contract.getVoter();
      console.log(Voters);
      setVoters(Voters);
    };

    contract && Fatch();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Lịch sử bỏ phiếu</p>
      {voters.map((voter) => {
        return (
          <div key={Math.random()}>
            <table>
              <tbody>
                <tr className="p-2">
                  {/* <td>{voter.Id.toString()}</td> */}
                  <td className="p-2">Cử tri {voter.name} </td>
                  <td className="p-2">Địa chỉ ví {voter.voterAddress} </td>
                  <td className="p-2">Đã bầu cho {voter._CandidateAddress} </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default FatcVoter;
