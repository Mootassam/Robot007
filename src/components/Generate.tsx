import "./generate.css";
import Select from "react-select";
import Countries from "../utils/Countries";
import { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import io from "socket.io-client";

function Generate() {
  const socket = io("http://192.168.10.57:8080"); // Replace with your server URL

  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveloading, setsaveLoading] = useState(false);
  const [shownew, setShowNew] = useState(false);
  const [registered, setregistered] = useState(0);

  const [RegisteredNumber, setregisteredNumber] = useState([]);
  const [totalNumber, setTotalNumber] = useState([]);
  const [rejectedNumber, setRejectedNumber] = useState([]);

  const [qrcode, setqrcode] = useState("");

  const [total, setTotal] = useState(0);
  const generateNumbers = async () => {
    setLoading(true);
    setregisteredNumber([]);
    setTotalNumber([]);
    setRejectedNumber([]);
    const listPhoneNumbers = await axios.get(
      "http://192.168.10.57:8080/api/phone/generate"
    );
    setNumbers(listPhoneNumbers.data);
    setLoading(false);
  };

  const saveNumber = async () => {
    try {
      await axios
        .post("http://192.168.10.57:8080/api/phone/save", {
          users: numbers,
        })
        .then((res) => {
          setregistered(res?.data?.phoneNumberRegistred.length);
        });
      setTotal(total + 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Emit events to the server

    socket.on("data-updated", (data) => {
      setregisteredNumber(data.phoneNumberRegistred);
      setTotalNumber(data.totalPhoneNumber);
      setRejectedNumber(data.phoneNumberRejected);
    });

    return () => {
      socket.disconnect();
    };
  }, [registered, RegisteredNumber, totalNumber, rejectedNumber]);

  return (
    <div className="app__generate">
      <div className="generate">
        <div className="generate__form">
          {/* <div className="form__group">
            <label htmlFor=""> Choose your best </label>
            <button onClick={() => setShowNew(false)}>
              {" "}
              Gnerate New Numbers{" "}
            </button>
            <button onClick={() => setShowNew(true)}>
              {" "}
              Upload Exits number
            </button>
          </div> */}


     

          {!shownew && (
            <div className="">
              <div className="form__group">
                <label htmlFor="">Country</label>
                <Select options={Countries.Allcountries()} />
              </div>

              <div className="generate__buttons">
                <div className="form__group">
                  <button onClick={generateNumbers} disabled={loading}>
                    {" "}
                    {loading ? "Extracting..." : "Extracting 1000 Numbers"}
                  </button>
                </div>
                <div className="form__group">
                  <button
                    className="start"
                    onClick={saveNumber}
                    disabled={loading}
                  >
                    Start
                  </button>
                </div>
                <div className="form__group">
                  <button className="stop">Download (csv)</button>
                </div>
              </div>

              <div className="customer__reply">
                <div className="reply__group">
                  <span className="total__text"> Total Numbers : </span>
                  <span className="total__number">{totalNumber.length}</span>
                </div>

                <div className="reply__group">
                  <span className="total__text"> registered number:</span>
                  <span className="total__number">
                    {RegisteredNumber.length}
                  </span>
                </div>

                <div className="reply__group">
                  <span className="total__text"> Number of rejects:</span>
                  <span className="total__number">{rejectedNumber.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="generate__table">
        {loading && <h1> Loading ... </h1>}
        {!loading && (
          <>
            <table>
              <thead>
                <tr>
                  <td className="title">S.no</td>
                  <td className="title">Phone</td>

                  <td className="title"> Message</td>
                  <td className="done">Status</td>
                </tr>
              </thead>

              <tbody>
                {numbers?.map((item, index) => {
                  return RegisteredNumber.includes(item) ? (
                    <>
                      {" "}
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td className="phonenumber">{item}</td>
                        <td>Message</td>
                        <td className="success">
                          {/* <div className="spinner"></div> */}
                          OK
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td className="phonenumber">{item}</td>
                        <td>Message</td>
                        <td className="error">
                          {/* <div className="spinner"></div> */}
                          Wrong
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Generate;
