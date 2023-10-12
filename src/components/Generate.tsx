import "./generate.css";
import React, { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode.react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  checkWhatsApp,
  download,
  generateNumbers,
  uploadcsv,
} from "../store/generate/generateActions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  selectphoneNumbers,
  selectGenerateLoading,
  checkLoading,
  fileLoading,
} from "../store/generate/generateselectors";
function Generate() {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  // Replace with your server URL
  const [loading, setLoading] = useState(false);
  const [shownew, setShowNew] = useState(false);
  const [registered, setregistered] = useState(0);
  const [RegisteredNumber, setregisteredNumber] = useState([
  ]);
  const [totalNumber, setTotalNumber] = useState([]);
  const [rejectedNumber, setRejectedNumber] = useState([]);
  const [qrcode, setqrcode] = useState("");
  const [connect, setConnect] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const generate = async () => {
    await dispatch(generateNumbers());
  };
  const numbers = useSelector(selectphoneNumbers);
  const generateLoading = useSelector(selectGenerateLoading);
  const loadingChek = useSelector(checkLoading);
  const uploadLoading = useSelector(fileLoading);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile || null);
      setMessage("");
    } else {
      setMessage("Invalid fiel type. Only CSV files are allowed.");
    }
  };
  // funciton foer upload
  const handleUpload = async () => {
    if (file) {
      await dispatch(uploadcsv(file));
    }
  };

  useEffect(() => {
    const socket = io("http://192.168.70.133:8080");
    // Emit events to the server
    socket.on("send", (data) => {
      console.log(data);
    });

    socket.on("scan-qrcode", (data) => {
      console.log(data);
      setqrcode(data);
    });

    socket.on("client-connect", () => {
      setConnect(true);
    });
    socket.on("data-updated", (data) => {
      console.log("emit data", data.phoneNumberRegistred);
      setregisteredNumber(data.phoneNumberRegistred);
      setTotalNumber(data.totalPhoneNumber);
      setRejectedNumber(data.phoneNumberRejected);
    });
    return () => {
      socket.disconnect();
    };
  }, [rejectedNumber,RegisteredNumber,registered,totalNumber, connect, numbers, file, message, qrcode]);


  const downloadcsv = async (data: any) => {
    dispatch(download(data));
  };

  const checkNumber = async (numbers: string) => {
    await dispatch(checkWhatsApp(numbers));
  };

  return (
    <div className="app__generate">
      <div className="generate">
        <div className="generate__form">
          {qrcode && (
            <div className="qr__abosulte">
              <QRCode value={qrcode} size={260} />
            </div>
          )}

          {!shownew && (
            <div className="">
              <div className="form__group">
                <label htmlFor=""> Upload file</label>
                <span className="error"> {message}</span>

                <input
                  type="file"
                  className="upload__file"
                  onChange={handleFileChange}
                />

                {/* here the upload function we need to add some styling for the css button  */}
                <button
                  className="upload__button"
                  onClick={handleUpload}
                  disabled={!file || uploadLoading}
                >
                  Upload
                  {uploadLoading && <div className="spinner"></div>}
                </button>
              </div>

              <div className="generate__buttons">
                <div className="form__group">
                  <button onClick={generate} disabled={generateLoading}>
                    {generateLoading
                      ? "Extracting..."
                      : "Extracting 1000 Numbers"}
                  </button>
                </div>
                <div className="form__group">
                  <button
                    className="start"
                    onClick={() => checkNumber(numbers)}
                    disabled={loadingChek}
                  >
                    Verify WhatsApp
                    {loadingChek && <div className="spinner"></div>}
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
