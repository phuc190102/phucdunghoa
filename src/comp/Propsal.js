import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";

function Propsal({ contract, account, provider }) {
  const [showpropsal, setshowprosal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log();
  console.log("vote comp");
  const ToPropsal = () => {
    if (showpropsal === true) {
      setshowprosal(false);
    } else {
      setshowprosal(true);
    }
  };
  const SetPropsalFc = async (e) => {
    e.preventDefault();
    const Account = document.getElementById("Account").value;
    console.log(Account);
    const Name = document.getElementById("Name").value;
    console.log(Name);
    if (Account && Name) {
      setLoading(true);
      const tx = await contract.RequestForNextVoting(Account, Name);
      let receipt = await tx.wait();
      console.log("Submit Succssfully! ");
      console.log(receipt);
      window.location.reload();
    } else {
      alert("Vui Lòng Nhập Đủ Thông Tin");
    }
  };

  const Fatch = async () => {
    const candidates = await contract.getRequestPropsal();
    console.log(candidates);
    setCandidates(candidates);
  };

  return (
    <div>
      <br></br>
      <button onClick={ToPropsal} className="btn btn-primary">
        Gửi đề xuất cho cuộc bầu cử tiếp theo!{" "}
      </button>
      {showpropsal && (
        <form onSubmit={SetPropsalFc} className="form-group">
          <div className="m-3">
            <p className="h5"> Đã kết nối với ví : {account}</p>
          </div>
          <div className="p-2">
            Địa chỉ ví của ứng viên{" "}
            <input type="text" id="Account" class="form-control"></input>
          </div>
          <div className="p-2">
            Tên ứng viên{" "}
            <input type="text" id="Name" class="form-control"></input>
          </div>
          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "Xác Nhận!"
            ) : (
              <ReactBootStrap.Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </button>
        </form>
      )}
      <br></br>

      <div className="mt-3">
        {<p className="text-dark h3">Ứng cử viên tiếp theo</p>}
        {<button onClick={Fatch} className="btn btn-success">
          Xem danh sách các ứng cử viên tiếp theo
        </button>}
        {candidates.map((candidate) => {
          return (
            <div key={Math.random()}>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2">{candidate.name}</td>
                    <td className="p-2">{candidate._CandidateAddress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Propsal;
