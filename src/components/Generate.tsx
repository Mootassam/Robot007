import NumberGenerator from "../utils/Number";
import "./generate.css";
import Select from "react-select";
import Countries from "../utils/Countries";
import { useEffect, useState } from "react";
import axios from "axios";

function Generate() {
  const [numbers, setNumbers] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [saveloading, setsaveLoading] = useState(false);
  const [shownew, setShowNew] = useState(false);


  const [total ,setTotal]  =useState(0)
  const generateNumbers = async () => {
    setLoading(true);
    const listPhoneNumbers = await axios.get(
      "http://192.168.10.57:8080/api/phone/generate"
    );
    setNumbers(listPhoneNumbers.data);
    setLoading(false);
  };

  const saveNumber = async () => {

    try {
      await axios.post("http://192.168.10.57:8080/api/phone/save", {
        users: numbers,
      });
      generateNumbers()
      setTotal(total + 1000)
   
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateNumbers();
  }, []);

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

          <div className="form__group">
            <label htmlFor=""> Upload .csv file</label>
            <input type="file" className="upload" />
          </div>

          {!shownew && (
            <div className="">
              <div className="form__group">
                <label htmlFor="">Phone Number</label>
                <select name="phonenumber" id="">
                  <option value="">+85233904796 </option>
                  <option value="">+85229094204 </option>
                  <option value="">+85266959270 </option>
                  <option value="">+85283232526 </option>
                </select>
              </div>
              <div className="form__group">
                <label htmlFor="">Message</label>
                <textarea placeholder="Message" />
              </div>
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
                  <span className="total__number">{total}</span>
                </div>

                <div className="reply__group">
                  <span className="total__text"> registered number:</span>
                  <span className="total__number">51</span>
                </div>

                <div className="reply__group">
                  <span  className="total__text"> Number of rejects:</span>
                  <span className="total__number"> 00 </span>
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
                {numbers?.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td className="phonenumber">{item}</td>
                    <td>Message</td>
                    <td className="success">
                      {/* <div className="spinner"></div> */}
                      Sent
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Generate;
