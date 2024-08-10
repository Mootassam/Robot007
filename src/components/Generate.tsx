import "./generate.css";
import React, { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode.react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  checkWhatsApp,
  download,
  generateNumbers,
  sendMessage,
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
import Select from "react-select";
import countries from "../utils/Countries";

function Generate() {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  // Replace with your server URL
  const [loading, setLoading] = useState(false);
  const [shownew, setShowNew] = useState(false);
  const [registered, setregistered] = useState(0);
  const [RegisteredNumber, setregisteredNumber] = useState([]);
  const [totalNumber, setTotalNumber] = useState([]);
  const [rejectedNumber, setRejectedNumber] = useState([]);
  const [qrcode, setqrcode] = useState("");
  const [connect, setConnect] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [country, setCountry] = useState("HK");
  const [minute, setMinute] = useState("1");
  const [done, setDone] = useState(false);
  const numbers = useSelector(selectphoneNumbers);
  const generateLoading = useSelector(selectGenerateLoading);
  const loadingChek = useSelector(checkLoading);
  const uploadLoading = useSelector(fileLoading);
  const [match, setMatch] = useState("10");

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
    const socket = io("http://192.168.1.43:8080");
    // Emit events to the server
    socket.on("send", (data) => {
      console.log(data);
    });

    socket.on("sent__number", (data: any) => {
      console.log("Message successfully sent to", data);
    });

    socket.on("scan-qrcode", (data) => {
      console.log(data);
      setqrcode(data);
    });

    socket.on("done", () => {
      setDone(true);
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
  }, [
    rejectedNumber,
    RegisteredNumber,
    registered,
    totalNumber,
    connect,
    numbers,
    file,
    message,
    qrcode,
    country,
    done,
  ]);

  const generate = async () => {
    await dispatch(generateNumbers({ country, match }));
  };
  const downloadcsv = async (data: any) => {
    dispatch(download(data));
  };
  const checkNumber = async (numbers: string) => {
    await dispatch(checkWhatsApp(numbers));
  };

  const typeMessage = (event) => {
    setMsg(event.target.value);
    console.log(event.target.value);
  };

  // im the console //
  const submit = async () => {
    await dispatch(
      sendMessage({
        time: minute,
        messages: msg,
        phoneNumbers: RegisteredNumber,
      })
    );
  };

  const options = countries;
  const close = () => {};
  return (
    <div className="app__generate">
      <div className="generate">
        <div className="generate__form">
          {qrcode && !connect && (
            <div className="qr__abosulte">
              <QRCode value={qrcode} size={260} />
              <label> Scan Qrcode</label>
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

              <div className="select__country">
                <label htmlFor="country">Country</label>

                <Select
                  value={country}
                  onChange={setCountry}
                  options={options}
                />
                {/* <select name="" id="" onChange={handleCountryChange}>
                  <option value="HK"> Hong kong</option>
                  <option value="IN"> India</option>
                </select> */}
              </div>

              <div className="generate__buttons">
                <div className="select__country">
                  <label htmlFor="country">How Much</label>

                  <input
                    type="number"
                    className=""
                    name="items"
                    onChange={(e) => setMatch(e.target.value)}
                    placeholder="Write the numbers"
                    maxLength={1000}
                  />
                </div>

                <div className="form__group">
                  <button onClick={() => generate()} disabled={generateLoading}>
                    {generateLoading
                      ? "Extracting..."
                      : `Extracting ${match} Numbers`}
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
                  <span className="total__text"> Total : </span>
                  <span className="total__number">{totalNumber.length}</span>
                  <div className="actions">
                    <button
                      className="download__csv"
                      onClick={() => downloadcsv(RegisteredNumber)}
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                    <button
                      className="download__csv"
                      onClick={() => downloadcsv(RegisteredNumber)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>

                <div className="reply__group">
                  <span className="total__text ">Registered :</span>
                  <span className="total__number __registered">
                    {RegisteredNumber.length}
                  </span>
                  <div className="actions">
                    <button
                      className="download__csv"
                      onClick={() => downloadcsv(RegisteredNumber)}
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                    <button
                      className="download__csv"
                      onClick={() => downloadcsv(RegisteredNumber)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>

                <div className="reply__group">
                  <span className="total__text"> Rejects:</span>
                  <span className="total__number ">
                    {rejectedNumber.length}
                  </span>
                  <div className="actions">
                    <button
                      className="download__csv"
                      onClick={() => downloadcsv(rejectedNumber)}
                    >
                      <i className="fa-solid fa-download"></i>
                    </button>
                    <button
                      className="download__csv"
                      onClick={() => downloadcsv(rejectedNumber)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="send__message">
                <div>
                  <span className="total__text ">
                    Message:{done && <label className="done__">Done</label>}
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder="please select schedule time between message"
                      className="minute"
                      maxLength={100}
                      onChange={(e) => setMinute(e.target.value)}
                    />
                  </span>
                  <textarea
                    className="message__textarea"
                    cols={50}
                    rows={40}
                    onChange={() => typeMessage(event)}
                  />
                </div>

                <button className="message__button" onClick={() => submit()}>
                  Send
                </button>
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
                  <td className="">Status</td>
                  <td className="">Message Sent (100/100)</td>
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
                          <td></td>
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
                          <td></td>
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
                          <td></td>
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
      {connect ? (
        <div className="generate__server __on">
          <label htmlFor="">on</label>
        </div>
      ) : (
        <div className="generate__server __off">
          <label htmlFor="">off</label>
        </div>
      )}
    </div>
  );
}

export default Generate;
