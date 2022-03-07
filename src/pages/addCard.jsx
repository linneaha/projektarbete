import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addCards } from "../redux/walletSlice";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Card from "../components/MyCards";

const AddCard = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { cardHolderName } = useSelector((state) => state.wallet);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [bank, setBank] = useState("");

  let newDate = new Date();
  let currentMonth = newDate.getMonth() + 1;
  let currentYear = newDate.getYear() - 100;
  const val1 = Number(expiryMonth) + Number(expiryYear) * 10;
  const val2 = currentYear * 10 + currentMonth;
  const result = val1 - val2;
  const valid = result < 0;
  console.log(valid);

  const addCard = () => {
    if (cardNumber.toString().length === 19 && !valid) {
      let newCard = {
        cardNumber: cardNumber,
        name: cardHolderName,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cvc: cvc,
        bank: bank,
      };
      dispatch(addCards(newCard));
      history.push("/");
    }
  };

  const validateNumber = (e) => {
    let regexNumber =
      e.target.value
        .replace(/\D+/g, "")
        .replace(/\D/g, "")
        .match(/.{1,4}/g) || [];
    setCardNumber(regexNumber.join(" ").substring(0, 19));

    if (regexNumber.toString().length !== 21) {
      document.querySelector("#cardNumberInput").style.border = "2px solid red";
    } else {
      document.querySelector("#cardNumberInput").style.border =
        "2px solid green";
    }
  };

  const flipCard = () => {
    const card = document.querySelector(".card");
    if (card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }
  };

  return (
    <div className="App">
      <h1>Adding new card</h1>
      <p id="active">new card</p>
      <Card
        cardNumber={cardNumber}
        name={cardHolderName}
        expiryMonth={expiryMonth}
        expiryYear={expiryYear}
        cvc={cvc}
        bank={bank}
      />

      <form>
        <div id="inputWrapper">
          <label htmlFor="cardNumberInput">Card Number</label>
          <input
            type="text"
            name="number"
            id="cardNumberInput"
            value={cardNumber}
            onChange={validateNumber}
            onFocus={flipCard}
          />

          <label htmlFor="cardHolderInput">Card holder</label>
          <input
            type="text"
            name="name"
            id="cardHolderInput"
            value={cardHolderName}
            readOnly
          />

          <div className="validThru">
            <label htmlFor="month">month</label>
            <select
              className={`exp ${valid}`}
              id="month"
              defaultValue={"MM"}
              onChange={(e) => {
                setExpiryMonth(e.target.value);
                if (valid) {
                  document.querySelector("#month").style.border =
                    "2px solid red";
                } else {
                  document.querySelector("#month").style.border =
                    "2px solid green";
                }
              }}
              onFocus={flipCard}
            >
              <option value="MM" disabled hidden>
                MM
              </option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="validThru">
            <label htmlFor="year">year</label>
            <input
              autoComplete="off"
              className={`exp ${valid}`}
              id="year"
              maxLength="2"
              pattern="[0-9]*"
              inputMode="numerical"
              placeholder="YY"
              type="text"
              
              onChange={(e) => {
                setExpiryYear(e.target.value);
                if (valid) {
                  document.querySelector("#year").style.border =
                    "2px solid red";
                } else {
                  document.querySelector("#year").style.border =
                    "2px solid green";
                }
              }}
              onFocus={flipCard}
            />
          </div>
          <label htmlFor="cvcInput">CVC</label>
          <input
            type="number"
            name="cvc"
            id="cvcInput"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.slice(0, 3))}
            onFocus={() => {
              const card = document.querySelector(".card");
              card.classList.toggle("is-flipped");
            }}
          />
          <label htmlFor="selectBank">Vendor</label>
          <select
            required
            onChange={(e) => {
              if (e.target.value === "swedbank") {
                document.querySelector(".card__logo").src =
                  "https://vandergragt.eu/images/swedbank.png";
              } else if (e.target.value === "icabank") {
                document.querySelector(".card__logo").src =
                  "https://vandergragt.eu/images/ICA.png";
                document.querySelector(".master-card").src =
                  "https://vandergragt.eu/images/maestro.png";
              } else if (e.target.value === "nordea") {
                document.querySelector(".card__logo").src =
                  "https://vandergragt.eu/images/nordea.png";
                document.querySelector(".master-card").src =
                  "https://vandergragt.eu/images/kispng-credit-card-viisa-logo.png";
              } else if (e.target.value === "handelsbanken") {
                document.querySelector(".card__logo").src =
                  "https://vandergragt.eu/images/handelsbbanken.png";
              }
              setBank(e.target.value);
            }}
            defaultValue={"Vendor"}
            id="selectBank"
            onFocus={flipCard}
          >
            <option value="Vendor" disabled hidden>
              Vendor
            </option>
            <option value="handelsbanken">Handelsbanken</option>
            <option value="swedbank">swedbank</option>
            <option value="icabank">ica banken</option>
            <option value="nordea">nordea</option>
          </select>
        </div>
        <button type="button" onClick={addCard}>
          Add card
        </button>
      </form>
    </div>
  );
};

export { AddCard };
