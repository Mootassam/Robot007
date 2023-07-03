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

  const generateNumbers = async () => {
    setLoading(true);
    const listPhoneNumbers = await axios.get(
      "http://localhost:8080/api/phone/generate"
    );
    setNumbers(listPhoneNumbers.data);
    setLoading(false);
  };

  const saveNumber = async () => {
    try {
      await axios.post("http://localhost:8080/api/phone/save", {
        users: numbers,
      });
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
          <div className="form__group">
            <label htmlFor=""> Choose your best </label>
            <button  onClick={() => setShowNew(false)}>
              {" "}
              Gnerate New Numbers{" "}
            </button>
            <button onClick={() => setShowNew(true)}> Upload Exits number</button>
          </div>

          {shownew && (
            <div className="form__group">
              <label htmlFor=""> Upload </label>

              <input type="file" className="upload" />
            </div>
          )}
        </div>

        {!shownew && <div className="generate__form">
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
          <div className="form__group">
            <label htmlFor="">Time start</label>
            <input type="time" />
          </div>
          <div className="form__group">
            <label htmlFor=""> Time end </label>
            <input type="time" />
          </div>

          <div className="form__group">
            <button onClick={generateNumbers} disabled={loading}>
              {" "}
              {loading ? "Generating..." : "Generate 1000 Numbers"}
            </button>
          </div>
          <div className="form__group">
            <button
              className="start"
              onClick={saveNumber}
              disabled={saveloading}
            >
              Start
            </button>
          </div>
          <div className="form__group">
            <button className="stop">Stop</button>
          </div>

          <div className="customer__reply">
            <div className="section__customer">
              <label htmlFor="" className="sub__title">
                Customer have WhatsApp
              </label>
              <div className="spinner__big">
                <span>20</span>
              </div>
            </div>
            <div className="section__customer">
              <label htmlFor="" className="sub__title">
                Customer Reply
              </label>
              <div className="spinner__big">
                <span>20</span>
              </div>
            </div>
            <div className="section__customer">
              <label htmlFor="" className="sub__title">
                Customer have WhatsApp
              </label>
              <div className="spinner__big">
                <span>20</span>
              </div>
            </div>
          </div>
        </div>  }
      
      </div>

      <div className="generate__table">
        {loading && <h1> Loading ... </h1>}
        {!loading && (
          <>
            <table>
              <thead>
                <tr>
                  <td className="title">Phone Number</td>
                  <td className="title"> WhatsApp</td>
                  <td className="title"> Sent Message</td>
                  <td className="done">done</td>
                </tr>
              </thead>

              <tbody>
                {numbers?.map((item, index) => (
                  <tr key={index}>
                    <td className="phonenumber">{item}</td>
                    <td> WhatsApp</td>
                    <td>Sent Message</td>
                    <td className="success">
                      <div className="spinner"></div>
                      done
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
