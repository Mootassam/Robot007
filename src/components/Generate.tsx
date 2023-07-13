import "./generate.css";
import Select from "react-select";
import Countries from "../utils/Countries";
import React, { useEffect, useState } from "react";
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

  const [connect, setConnect] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [loadingfile, setLoadingfile] = useState(false);
  const [result, setResult] = useState(null);

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


  console.log('====================================');
  console.log(RegisteredNumber);
  console.log('====================================');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    setLoadingfile(true);

    if (file) {
      const formData = new FormData();
      formData.append("csvFile", file);

      try {
        const response = await axios.post(
          "http://192.168.10.57:8080/api/phone/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setNumbers(response.data.upload);
      } catch (error) {
        console.error("Error uploading CSV file:", error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    // Emit events to the server

    socket.on("data-updated", (data) => {
      setregisteredNumber(data.phoneNumberRegistred);
      setTotalNumber(data.totalPhoneNumber);
      setRejectedNumber(data.phoneNumberRejected);
    });

    socket.on("scan-qrcode", (data) => {
      setqrcode(data);
    });

    socket.on("client-connect", () => {
      setConnect(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [
    registered,
    RegisteredNumber,
    totalNumber,
    rejectedNumber,
    connect,
    numbers,
  ]);

  const downloadcsv = async (data: any) => {
    try {
      const response = await axios.post(
        "http://192.168.10.57:8080/api/phone/download",
        {
          phoneNumbers: data,
        },
        {
          responseType: "blob", // Set the response type to 'blob' to receive the file as a blob object
        }
      );
      const blob = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "downloaded_numbers.csv");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV file:", error);
    }
  };
  const telegram = async () => {
    try {
      await axios
        .post("http://192.168.10.57:8080/api/phone/telegram", {
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



  return (
    <div className="app__generate">
      <div className="generate">
        <div className="generate__form">
          {qrcode && connect === false && (
            <div className="qr__abosulte">
              <QRCode value={qrcode} size={260} />
            </div>
          )}

          {!shownew && (
            <div className="">
              <div className="form__group">
                <label htmlFor=""> Upload file</label>

                <input
                  type="file"
                  className="upload__file"
                  onChange={handleFileChange}
                />
                <button onClick={handleUpload} disabled={!file || loading}>
                  Upload
                </button>
              </div>

              {/* <div className="form__group">
                <label htmlFor="">Country</label>
                <Select options={Countries.Allcountries()} />
              </div> */}

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
                    WhatsApp 
                    {/* <div className="spinner"></div>  */}
                  </button>
                </div>

                <div className="form__group">
                  <button
                    className="telgram"
                    onClick={telegram}
                    disabled={loading}
                  >
                    Telegram

                    {/* <div className="spinner"></div>  */}
                  </button>
                </div>
              </div>

              <div className="customer__reply">
                <div className="reply__group">
                  <span className="total__text"> Total Numbers : </span>
                  <span className="total__number">{totalNumber.length}</span>
                  <button
                    className="download__csv"
                    onClick={() => downloadcsv(totalNumber)}
                  >
                    {" "}
                    download
                  </button>
                </div>

                <div className="reply__group">
                  <span className="total__text "> registered number:</span>
                  <span className="total__number __registered">
                    {RegisteredNumber.length}
                  </span>
                  <button
                    className="download__csv"
                    onClick={() => downloadcsv(RegisteredNumber)}
                  >
                    {" "}
                    download
                  </button>
                </div>

                <div className="reply__group">
                  <span className="total__text"> Number of rejects:</span>
                  <span className="total__number ">
                    {rejectedNumber.length}
                  </span>
                  <button
                    className="download__csv"
                    onClick={() => downloadcsv(rejectedNumber)}
                  >
                    {" "}
                    download
                  </button>
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

                  <td className="done">Status</td>
                </tr>
              </thead>

              <tbody>
                {numbers?.map((item, index) => {
                  if (RegisteredNumber.includes(item)) {
                    return (
                      <>
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td className="phonenumber">{item}</td>
                          <td className="success">
                            {/* <div className="spinner"></div> */}
                            OK
                          </td>
                        </tr>
                      </>
                    );
                  } else if (rejectedNumber.includes(item)) {
                    return (
                      <>
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td className="phonenumber">{item}</td>
                          <td className="error">
                            {/* <div className="spinner"></div> */}
                            no
                          </td>
                        </tr>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td className="phonenumber">{item}</td>
                          <td className="">
                            {/* <div className="spinner"></div> */}
                            __
                          </td>
                        </tr>
                      </>
                    );
                  }
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
