import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useState } from "react";

function Vote({ contract, account, provider }) {
  const [showvote, setshowVote] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log();
  console.log("vote comp");
  const ToVote = () => {
    if (showvote === true) {
      setshowVote(false);
    } else {
      setshowVote(true);
    }
  };
  const SetVoteFc = async (e) => {
    e.preventDefault();
    const VoterID = document.getElementById("voterId").value;
    console.log(VoterID);
    const VoterName = document.getElementById("voterName").value;
    console.log(VoterName);
    const CandidateAddress = document.getElementById("CandidateAddress").value;
    console.log(CandidateAddress);
    if (VoterID && VoterName && CandidateAddress) {
      setLoading(true);
      const signer = contract.connect(provider.getSigner());
      await signer.SetVote(
        VoterID,
        VoterName,
        account.toString(),
        CandidateAddress
      );
      console.log("Voted Succssfuly ");
      alert("Voted!");
      window.location.reload();
      setshowVote(false);
    } else {
      alert("Vui Lòng Nhập Đủ Thông Tin");
    }
  };

  return (
    <div>
      <br></br>
      <div>
        <button
          onClick={ToVote}
          disabled={!account}
          className="btn btn-dark text-light"
        >
          Bắt Đầu
        </button>
      </div>
      <br></br>
      {showvote && (
        <form onSubmit={SetVoteFc}>
          <div className="mt3">
            <p className="h5">Địa chỉ ví người bỏ phiếu : {account}</p>
          </div>
          <div class="form-group">
            <label>ID người bỏ phiếu</label>
            <input type="text" id="voterId" class="form-control"></input>
          </div>
          <div class="form-group">
            <label>Tên người bỏ phiếu</label>
            <input type="text" id="voterName" class="form-control "></input>
          </div>
          <div class="form-group">
            <label>Địa chỉ ví ứng cử viên</label>
            <input
              type="text"
              id="CandidateAddress"
              class="form-control"
            ></input>
          </div>

          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "Bỏ Phiếu"
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
    </div>
  );
}

export default Vote;
