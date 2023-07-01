import NumberGenerator from "../utils/Number";
import "./generate.css";
import Select from "react-select";
import Countries from "../utils/Countries";
function Generate() {
  return (
    <div className="app__generate">
      <div className="generate">
        <div className="generate__form">
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
            <label htmlFor="">Country</label>
            <button>Generate 1000 </button>
          </div>
          <div className="form__group">
            <button className="start">Start</button>
          </div>
          <div className="form__group">
            <button className="stop">Stop</button>
          </div>

          <div className="customer__reply">
            <div className="section__customer">
              <label htmlFor="" className="sub__title">Customer have WhatsApp</label>
              <div className="spinner__big">
                <span>20</span>
              </div>
            </div>
            <div className="section__customer" >
              <label htmlFor="" className="sub__title">Customer Reply</label>
              <div className="spinner__big">
                <span>20</span>
              </div>
            </div>
            <div className="section__customer">
              <label htmlFor="" className="sub__title">Customer have WhatsApp</label>
              <div className="spinner__big">
                <span>20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="generate__table">
        <table>
          <tr>
            <td className="title">Phone Number</td>
            <td className="title"> WhatsApp</td>
            <td className="title"> Sent Message</td>
            <td className="done">done</td>
          </tr>

          {NumberGenerator.generatePhoneNumbers().map((item) => (
            <tr>
              <td className="phonenumber">{item}</td>
              <td> WhatsApp</td>
              <td>Sent Message</td>
              <td className="success">
                <div className="spinner"></div>
                done
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Generate;
